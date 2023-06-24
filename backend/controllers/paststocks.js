const alpaca = require('../util/alpaca')
const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { PastStock, User } = require('../models')

const { SECRET } = require('../util/config')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch {
      return res.status(401).json({ error: 'token invalid' })
    }
  }  else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

router.get('/', tokenExtractor, async (req, res) => {
  try {
    const currentDate =  new Date()
    const oneDayAgo = new Date(currentDate.getTime() - (24 * 60 * 60 * 1000))

    const user = await User.findByPk(req.decodedToken.id)
    const pastStocks = await PastStock.findAll({
      where: {
        userId: user.id
      }
    })

    if (!pastStocks.length) {
      return res.json('not enough data')
    }

    const symbols = pastStocks.map(s => s.symbol)
    const uniqueSymbolsSet = new Set(symbols)
    if (uniqueSymbolsSet.has('dummy')) {
      uniqueSymbolsSet.delete('dummy')
    }
    if (!uniqueSymbolsSet.size) {
      uniqueSymbolsSet.add('AAPL')
    }
    const uniqueSymbols = [...uniqueSymbolsSet]

    const dates = pastStocks.map(s => s.date)
    let earliestDate = dates[0]
    for (let i = 1; i < dates.length; i++) {
      if (dates[i] < earliestDate) {
        earliestDate = dates[i] // Update the earliest date if a smaller date is found
      }
    }
    const date = new Date(earliestDate)
    
    const options = {
      start: date.toISOString(),
      end: oneDayAgo.toISOString(),
      timeframe: '1Day',
      adjustment: 'all'
    }

    const barsMap = await alpaca.getMultiBarsV2(uniqueSymbols, options)
    const barsObject = Object.fromEntries(barsMap.entries())

    const timestamps = {}

    for (const bar of Object.values(barsObject)[0]) {
      timestamps[bar.Timestamp.slice(0, 10)] = {}
    }

    for (const pastStock of pastStocks) {
      if (pastStock.date in timestamps && pastStock.symbol !== 'dummy') {
        timestamps[pastStock.date][pastStock.symbol] = { quantity: pastStock.quantity }
      }
    }

    for (const symbol in barsObject) {
      const bars = barsObject[symbol]
      for (const bar of bars) {
        const timestamp = bar.Timestamp.slice(0, 10)
        const closePrice = bar.ClosePrice
        if (symbol in timestamps[timestamp]) {
          timestamps[timestamp][symbol].price = closePrice
          timestamps[timestamp][symbol].total = closePrice * timestamps[timestamp][symbol].quantity
        }
      }
    }
    
    if (Object.keys(timestamps).length < 4) {
      return res.json('not enough data')
    }

    res.json(timestamps)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

module.exports = router