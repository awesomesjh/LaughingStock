const bcrypt = require('bcrypt')
const router = require('express').Router()

const { Stock, User } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Stock
    }
  })
  res.json(users)
})

router.post('/', async (req, res) => {
  try {
    const { username, password } = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    
    const user = { username, passwordHash }

    const savedUser = await User.create(user)
    
    res.status(201).json(savedUser)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).end()
  }
})

module.exports = router