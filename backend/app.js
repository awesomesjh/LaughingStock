const express = require('express')
const app = express()

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

module.exports = app