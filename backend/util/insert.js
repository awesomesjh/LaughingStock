// Helper script for inserting 1 year of entries into paststocks
// Not used in actual application

const { PastStock } = require('../models')

const insert = async () => {
  const stocks = []
  
  const startDate = new Date()
  startDate.setFullYear(startDate.getFullYear() - 1)
  startDate.setDate(startDate.getDate() + 1)

  const currentDate = new Date()

  const tenMonthsAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 10, currentDate.getDate())
  const nineMonthsAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 9, currentDate.getDate())
  const sixMonthsAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 6, currentDate.getDate())
  const threeMonthsAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 3, currentDate.getDate())
  const oneMonthAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate())

  for (let date = startDate; date < tenMonthsAgo; date.setDate(date.getDate() + 1)) {
    const stock = { symbol: 'dummy', quantity: 0, date: date.toISOString().slice(0, 10), userId: 1 }
    stocks.push(stock)
  }

  for (let date = tenMonthsAgo; date < nineMonthsAgo; date.setDate(date.getDate() + 1)) {
    const stock1 = { symbol: 'AAPL', quantity: 3, date: date.toISOString().slice(0, 10), userId: 1 }
    const stock2 = { symbol: 'TSLA', quantity: 2, date: date.toISOString().slice(0, 10), userId: 1 }
    stocks.push(stock1)
    stocks.push(stock2)
  }

  for (let date = nineMonthsAgo; date < sixMonthsAgo; date.setDate(date.getDate() + 1)) {
    const stock1 = { symbol: 'AAPL', quantity: 3, date: date.toISOString().slice(0, 10), userId: 1 }
    const stock2 = { symbol: 'TSLA', quantity: 10, date: date.toISOString().slice(0, 10), userId: 1 }
    stocks.push(stock1)
    stocks.push(stock2)
  }

  for (let date = sixMonthsAgo; date < threeMonthsAgo; date.setDate(date.getDate() + 1)) {
    const stock1 = { symbol: 'AAPL', quantity: 3, date: date.toISOString().slice(0, 10), userId: 1 }
    const stock2 = { symbol: 'AMZN', quantity: 8, date: date.toISOString().slice(0, 10), userId: 1 }
    stocks.push(stock1)
    stocks.push(stock2)
  }

  for (let date = threeMonthsAgo; date < oneMonthAgo; date.setDate(date.getDate() + 1)) {
    const stock = { symbol: 'dummy', quantity: 0, date: date.toISOString().slice(0, 10), userId: 1 }
    stocks.push(stock)
  }

  for (let date = oneMonthAgo; date < currentDate; date.setDate(date.getDate() + 1)) {
    const stock1 = { symbol: 'META', quantity: 5, date: date.toISOString().slice(0, 10), userId: 1 }
    const stock2 = { symbol: 'MSFT', quantity: 6, date: date.toISOString().slice(0, 10), userId: 1 }
    const stock3 = { symbol: 'NFLX', quantity: 10, date: date.toISOString().slice(0, 10), userId: 1 }
    stocks.push(stock1)
    stocks.push(stock2)
    stocks.push(stock3)
  }

  try {
    await PastStock.bulkCreate(stocks)
    console.log('success!')
  } catch (error) {
    console.log(error)
  }
}

module.exports = insert