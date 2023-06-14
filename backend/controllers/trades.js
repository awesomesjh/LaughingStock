const alpaca = require('../util/alpaca')
const router = require('express').Router()

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