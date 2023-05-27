const Stock = require('./stock')
const User = require('./user')

User.hasMany(Stock)
Stock.belongsTo(User)

//User.sync({ alter: true })
//Stock.sync({ alter: true })

module.exports = {
  Stock, User
}