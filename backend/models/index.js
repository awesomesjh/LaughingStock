const Stock = require('./stock')
const User = require('./user')
const TeleUser = require('./teleuser')
const PastStock = require('./paststock')

User.hasMany(Stock)
Stock.belongsTo(User)

User.hasMany(TeleUser)
TeleUser.belongsTo(User)

User.hasMany(PastStock)
PastStock.belongsTo(User)

//User.sync({ alter: true })
//Stock.sync({ alter: true })

module.exports = {
  Stock, User, TeleUser, PastStock
}