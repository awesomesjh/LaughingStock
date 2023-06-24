const express = require('express')
const app = express()

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const task = require('./util/task')
const insert = require('./util/insert')

const stocksRouter = require('./controllers/stocks')
const tradesRouter = require('./controllers/trades')
const barsRouter = require('./controllers/bars')
const newsRouter = require('./controllers/news')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const teleRouter = require('./controllers/telegram')
const pastRouter = require('./controllers/paststocks')

app.use(express.json())

app.use('/api/stocks', stocksRouter)
app.use('/api/trades', tradesRouter)
app.use('/api/bars', barsRouter)
app.use('/api/news', newsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/telegram', teleRouter)
app.use('/api/paststocks', pastRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()

//task.start()

//insert()