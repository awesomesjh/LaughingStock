const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../util/db')

class TeleUser extends Model {}

TeleUser.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'teleuser'
})

module.exports = TeleUser