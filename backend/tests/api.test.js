const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const { sequelize, connectToDatabase } = require('../util/db')
const { SECRET } = require('../util/config')
const bcrypt = require('bcrypt')

const { initialStocks, stocksInDb, usersInDb } = require('./test_helper')

const User = require('../models/user')
const Stock = require('../models/stock')

beforeAll(async () => {
  await connectToDatabase()
})

describe('when there are initially some stocks saved', () => {
  let auth = null
  let id = null

  beforeAll(async () => {
    await Stock.destroy({ where: {} })
    await User.destroy({ where: {} })
    await api
      .post('/api/users')
      .send({ username: 'test', password: 'password' })
    const response = await api
      .post('/api/login')
      .send({ username: 'test', password: 'password' })
    auth = `bearer ${response.body.token}`
    id =  response.body.id
  })
  
  beforeEach(async () => {
    await Stock.destroy({ where: {} })
    const modifiedInitialStocks = initialStocks.map(stock => {
      return { ...stock, userId: id }
    })
    await Stock.bulkCreate(modifiedInitialStocks)
  })

  test('stocks are returned as json', async () => {
    await api
      .get('/api/stocks')
      .set('Authorization', auth)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all stocks are returned', async () => {
    const response = await api
      .get('/api/stocks')
      .set('Authorization', auth)

    response.body.pop()
    expect(response.body).toHaveLength(initialStocks.length)
  })

  test('a specific stock is within the returned stocks', async () => {
    const response = await api
      .get('/api/stocks')
      .set('Authorization', auth)

    const symbols = response.body.map(r => r.symbol)
    expect(symbols).toContain('AAPL')
  })

  describe('addition of a new stock', () => {
    test('succeeds with valid data', async () => {
      const newStock = {
        symbol: 'META',
        quantity: 4
      }
  
      await api
        .post('/api/stocks')
        .set('Authorization', auth)
        .send(newStock)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const stocksAtEnd = await stocksInDb()
      expect(stocksAtEnd).toHaveLength(initialStocks.length + 1)
  
      const symbols = stocksAtEnd.map(stock => stock.symbol)
      expect(symbols).toContain('META')
    })
  
    test('fails with status code 400 if data invalid', async () => {
      const newStock = {
        quantity: 5
      }
  
      await api
        .post('/api/stocks')
        .set('Authorization', auth)
        .send(newStock)
        .expect(400)
  
      const stocksAtEnd = await stocksInDb()
  
      expect(stocksAtEnd).toHaveLength(initialStocks.length)
    })
  
    test('fails with status code 401 if token not provided', async () => {
      const newStock = {
        symbol: 'META',
        quantity: 4
      }
  
      await api
        .post('/api/stocks')
        .send(newStock)
        .expect(401)
  
      const stocksAtEnd = await stocksInDb()
      expect(stocksAtEnd).toHaveLength(initialStocks.length)
    })
  })
  
  describe('deletion of a stock', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const stocksAtStart = await stocksInDb()
      const stockToDelete = stocksAtStart[0]
  
      await api
        .delete(`/api/stocks/${stockToDelete.id}`)
        .set('Authorization', auth)
        .expect(204)
  
      const stocksAtEnd = await stocksInDb()
      expect(stocksAtEnd).toHaveLength(initialStocks.length - 1)
  
      const symbols = stocksAtEnd.map(stock => stock.symbol)
      expect(symbols).not.toContain(stockToDelete.symbol)
    })

    test('fails with status code 400 if id is invalid', async () => {
      await api
        .delete('/api/stocks/invalidid')
        .set('Authorization', auth)
        .expect(400)
  
      const stocksAtEnd = await stocksInDb()
      expect(stocksAtEnd).toHaveLength(initialStocks.length)
    })
  })

  describe('update of a stock', () => {
    test('succeeds with status code 200 if data and id is valid', async () => {
      const stocksAtStart = await stocksInDb()
      const stockToUpdate = stocksAtStart[0]
      const updatedStock = { ...stockToUpdate, quantity: 4 }
  
      await api
        .put(`/api/stocks/${updatedStock.id}`)
        .set('Authorization', auth)
        .send(updatedStock)
        .expect(200)
  
      const stocksAtEnd = await stocksInDb()
      expect(stocksAtEnd).toHaveLength(initialStocks.length)
  
      const quantities = stocksAtEnd.map(stock => stock.quantity)
      expect(quantities).toContain(updatedStock.quantity)
    })

    test('fails with status code 400 if data is invalid', async () => {
      const stocksAtStart = await stocksInDb()
      const stockToUpdate = stocksAtStart[0]
      const updatedStock = { ...stockToUpdate, quantity: 'invalid' }
  
      await api
        .put(`/api/stocks/${updatedStock.id}`)
        .set('Authorization', auth)
        .send(updatedStock)
        .expect(400)
  
      const stocksAtEnd = await stocksInDb()
      expect(stocksAtEnd).toHaveLength(initialStocks.length)

      const quantities = stocksAtEnd.map(stock => stock.quantity)
      expect(quantities).not.toContain(updatedStock.quantity)
    })

    test('fails with status code 404 if id not found', async () => {
      await api
        .put(`/api/stocks/0`)
        .set('Authorization', auth)
        .expect(404)
  
      const stocksAtEnd = await stocksInDb()
      expect(stocksAtEnd).toHaveLength(initialStocks.length)
    })
  })
})

describe('when there is initially one user at db', () => {
  beforeAll(async () => {
    await Stock.destroy({ where: {} })
  })
  
  beforeEach(async () => {
    await User.destroy({ where: {} })

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(SECRET, saltRounds)
    
    await User.create({ username: 'test', passwordHash })
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'numbers',
      password: '12345'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'test',
      password: '12345'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error.errors[0].message).toContain('username must be unique')

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(async () => {
  await sequelize.close()
})