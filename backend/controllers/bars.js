const Alpaca = require('@alpacahq/alpaca-trade-api')
const router = require('express').Router()

const { API_KEY, API_SECRET } = require('../util/config')

const alpaca = new Alpaca({
  keyId: API_KEY,
  secretKey: API_SECRET,
  paper: true,
})

router.get('/:symbol/:start', async (req, res) => {
  try {
    const symbol = req.params.symbol
    const start = parseInt(req.params.start)
    const date = new Date() // date = current time
    date.setFullYear(date.getFullYear() - start) // date = current time - start years
    const options = {
      start: date,
      timeframe: '1Day',
      adjustment: 'all'
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