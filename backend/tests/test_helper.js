const Stock = require('../models/stock')
const User = require('../models/user')

const initialStocks = [
  {
    symbol: 'AAPL',
    quantity: 3
  },
  {
    symbol: 'TSLA',
    quantity: 2
  }
]

const stocksInDb = async () => {
  const stocks = await Stock.findAll({ where: {} })
  return stocks.map(stock => stock.toJSON())
}

const usersInDb = async () => {
  const users = await User.findAll({ where: {} })
  return users.map(user => user.toJSON())
}

module.exports = { initialStocks, stocksInDb, usersInDb }