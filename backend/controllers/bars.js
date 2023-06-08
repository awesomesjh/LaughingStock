const Alpaca = require('@alpacahq/alpaca-trade-api')
const router = require('express').Router()

const { API_KEY, API_SECRET } = require('../util/config')

const alpaca = new Alpaca({
  keyId: API_KEY,
  secretKey: API_SECRET,
  paper: true,
})

router.get('/:symbol', async (req, res) => {
  try {
    const symbol = req.params.symbol
    const date = new Date() // date = current time
    date.setFullYear(date.getFullYear() - 1) // date = current time - 1 year
    const options = {
      start: date,
      timeframe: '1Day'
    }
    const bars = []
    const response = alpaca.getBarsV2(symbol, options)
    for await (const bar of response) {
      bars.push(bar)
    }
    res.json(bars)
  } catch (error) {
    console.log(error)
    return res.status(400).json({ error })
  }
})

module.exports = router