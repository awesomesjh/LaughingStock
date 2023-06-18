require('dotenv').config()

module.exports = {
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: process.env.PORT || 3001,
  SECRET: process.env.SECRET,
  API_KEY: process.env.API_KEY,
  API_SECRET: process.env.API_SECRET,
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN
}