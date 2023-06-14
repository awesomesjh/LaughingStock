const Alpaca = require('@alpacahq/alpaca-trade-api')

const { API_KEY, API_SECRET } = require('./config')

const alpaca = new Alpaca({
  keyId: API_KEY,
  secretKey: API_SECRET,
  paper: true,
})

module.exports = alpaca