const Sequelize = require('sequelize')
const { DATABASE_URL, TEST_DATABASE_URL, NODE_ENV } = require('./config')
const { Umzug, SequelizeStorage } = require('umzug')

let database_url = DATABASE_URL
const config = {}

if (NODE_ENV === 'test') {
  database_url = TEST_DATABASE_URL
  config.logging = false
}

const sequelize = new Sequelize(database_url, config)

const runMigrations = async () => {
  const migrator = new Umzug({
    migrations: {
      glob: 'migrations/*.js',
    },
    storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
    context: sequelize.getQueryInterface(),
    logger: console,
  })
  
  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  })
}

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    console.log('connected to the database')
  } catch (err) {
    console.log('failed to connect to the database')
    return process.exit(1)
  }

  return null
}

module.exports = { connectToDatabase, sequelize }