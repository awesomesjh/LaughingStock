const express = require('express')
const app = express()
const path = require('path')

const { tokenExtractor } = require('./util/middleware')

const stocksRouter = require('./controllers/stocks')
const tradesRouter = require('./controllers/trades')
const barsRouter = require('./controllers/bars')
const newsRouter = require('./controllers/news')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const teleRouter = require('./controllers/telegram')
const pastRouter = require('./controllers/paststocks')

app.use(express.json())

app.use('/api/stocks', tokenExtractor, stocksRouter)
app.use('/api/trades', tradesRouter)
app.use('/api/bars', barsRouter)
app.use('/api/news', newsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/telegram', teleRouter)
app.use('/api/paststocks', tokenExtractor, pastRouter)

app.use(express.static('build'))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './build/index.html'))
})

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

module.exports = app