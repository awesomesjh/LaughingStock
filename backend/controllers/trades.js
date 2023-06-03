const Alpaca = require('@alpacahq/alpaca-trade-api')
const router = require('express').Router()

const { API_KEY, API_SECRET } = require('../util/config')

const alpaca = new Alpaca({
  keyId: API_KEY,
  secretKey: API_SECRET,
  paper: true,
})

router.post('/', async (req, res) => {
  try {
    const symbols = req.body
    const trades = await alpaca.getLatestTrades(symbols)
    res.json(Object.fromEntries(trades.entries()))
  } catch (error) {
    return res.status(400).json({ error })
  }
})

module.exports = router