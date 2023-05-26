const router = require('express').Router()

const { Stock, User } = require('../models')

const { SECRET } = require('../util/config')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      console.log(3)
      console.log(SECRET)
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
      console.log(4)
    } catch {
      return res.status(401).json({ error: 'token invalid' })
    }
  }  else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

router.get('/', async (req, res) => {
  const stocks = await Stock.findAll()
  res.json(stocks)
})

router.post('/', tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const stock = await Stock.create({...req.body, userId: user.id})
    res.json(stock)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.get('/:id', async (req, res) => {
  const stock = await Stock.findByPk(req.params.id)
  if (stock) {
    res.json(stock)
  } else {
    res.status(404).end()
  }
})

router.delete('/:id', async (req, res) => {
  const stock = await Stock.findByPk(req.params.id)
  if (stock) {
    await stock.destroy()
  }
  res.status(204).end()
})

router.put('/:id', async (req, res) => {
  const stock = await Stock.findByPk(req.params.id)
  if (stock) {
    stock.quantity = req.body.quantity
    await stock.save()
    res.json(stock)
  } else {
    res.status(404).end()
  }
})

module.exports = router