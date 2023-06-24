const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('stocks', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      symbol: {
        type: DataTypes.STRING,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    })
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false
      },
      sort_by: {
        type: DataTypes.STRING,
        defaultValue: 'symbol ascending',
        allowNull: false,
      },
    })
    await queryInterface.createTable('teleusers', {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
      }
    })
    await queryInterface.createTable('paststocks', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      symbol: {
        type: DataTypes.STRING,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      }
    })
    await queryInterface.addColumn('stocks', 'user_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    })
    await queryInterface.addColumn('teleusers', 'user_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    })
    await queryInterface.addColumn('paststocks', 'user_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' },
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('stocks')
    await queryInterface.dropTable('users')
    await queryInterface.dropTable('teleusers')
    await queryInterface.dropTable('paststocks')
  },
}