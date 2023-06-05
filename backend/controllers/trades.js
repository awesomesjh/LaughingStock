const Alpaca = require('@alpacahq/alpaca-trade-api')
const router = require('express').Router()

const { API_KEY, API_SECRET } = require('../util/config')

const alpaca = new Alpaca({
  keyId: API_KEY,
  secretKey: API_SECRET,
  paper: true,
})

router.get('/getLatestTrade/:symbol', async (req, res) => {
  try {
    const symbol = req.params.symbol
    const trade = await alpaca.getLatestTrade(symbol)
    res.json(trade)
  } catch (error) {
    return res.status(400).json({ error })
  }
})

router.get('/getLatestTrades/:symbols', async (req, res) => {
  try {
    const symbols = req.params.symbols.split(',')
    const trades = await alpaca.getLatestTrades(symbols)
    res.json(Object.fromEntries(trades.entries()))
  } catch (error) {
    return res.status(400).json({ error })
  }
})

module.exports = router