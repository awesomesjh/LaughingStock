const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { Stock, User } = require('../models')

const { SECRET } = require('../util/config')

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch {
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}

router.get('/', tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)

    // If user has been removed from database while still logged in
    if (!user) {
      return res.status(401).json({ error: 'user missing' })
    }

    const stocks = await Stock.findAll({
      where: {
        userId: user.id
      }
    })
    stocks.push(user.sortBy)
    res.json(stocks)
  } catch(error) {
    return res.status(400).json({ error })
  }
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

/*
router.get('/:id', async (req, res) => {
  const stock = await Stock.findByPk(req.params.id)
  if (stock) {
    res.json(stock)
  } else {
    res.status(404).end()
  }
})
*/

router.delete('/:id', tokenExtractor, async (req, res) => {
  try {
    const stock = await Stock.findByPk(req.params.id)
    if (stock) {
      await stock.destroy()
    }
    res.status(204).end()
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.put('/:id', tokenExtractor, async (req, res) => {
  const stock = await Stock.findByPk(req.params.id)
  if (stock) {
    stock.quantity = req.body.quantity
    try {
      await stock.save()
      res.json(stock)
    } catch (error) {
      return res.status(400).json({ error })
    }
  } else {
    res.status(404).end()
  }
})

module.exports = router