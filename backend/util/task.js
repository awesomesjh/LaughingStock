const cron = require('node-cron')
const { Op } = require('sequelize')

const { Stock, PastStock, User } = require('../models')

// 0 0 * * 1-5
// */5 * * * * *

const task = cron.schedule('0 0 * * 1-5', async () => {
  const currentDate = new Date()
  const oneYearAgo = new Date(currentDate)
  
  currentDate.setDate(currentDate.getDate() - 1) // current date - 1 day
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1) // current date - 1 year

  // Get the current date components
  const year = currentDate.getUTCFullYear()
  const month = String(currentDate.getUTCMonth() + 1).padStart(2, '0')
  const day = String(currentDate.getUTCDate()).padStart(2, '0')

  // Format the date as yyyy-mm-dd
  const formattedDate = `${year}-${month}-${day}`

  const stocks = await Stock.findAll()
  const modifiedStocks = stocks.map((stock) => {
    const plainStock = stock.toJSON()
    delete plainStock.id
    plainStock.date = formattedDate
    return plainStock
  })

  const uniqueUsersSet = new Set()
  for (const stock of modifiedStocks) {
    uniqueUsersSet.add(stock.userId)
  }
  const uniqueUsersArray = [...uniqueUsersSet]

  const users = await User.findAll({
    where: {
      id: { [Op.notIn]: uniqueUsersArray }
    }
  })

  for (const user of users) {
    modifiedStocks.push({
      symbol: 'dummy',
      quantity: 0,
      date: formattedDate,
      userId: user.id
    })
  }

  await PastStock.bulkCreate(modifiedStocks)
  await PastStock.destroy({
    where: {
      date: { [Op.lte]: oneYearAgo }
    }
  })
}, {
  scheduled: false,
  timezone: 'America/New_York'
})

module.exports = task