const app = require('./app')
const bot = require('./telebot')

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const task = require('./util/task')
const insert = require('./util/insert')

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()

//task.start()

//insert()