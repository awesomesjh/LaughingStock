const bcrypt = require('bcrypt')
const router = require('express').Router()

const { Stock, User, TeleUser } = require('../models')

router.post('/login', async (request, response) => {
  const body = request.body

  const user = await User.findOne({
    where: {
      username: body.username
    }
  })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const teleuser = await TeleUser.findByPk(body.id)
  if (teleuser) {
    teleuser.id = body.id
    await teleuser.save()
  } else {
    await TeleUser.create({ id: body.id, userId: user.id })
  }

  response
    .status(200)
    .send({ username: user.username, id: user.id })
})

router.get('/stocks/:id', async (req, res) => {
  try {
    const teleuser = await TeleUser.findByPk(req.params.id)
    if (!teleuser) {
      return res.status(401).json({
        error: 'user not logged in'
      })
    }
    const stocks = await Stock.findAll({
      where: {
        userId: teleuser.userId
      }
    })
    res.json(stocks)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

router.delete('/logout/:id', async (req, res) => {
  try {
    const teleuser = await TeleUser.findByPk(req.params.id)
    if (teleuser) {
      await teleuser.destroy()
    }
    res.status(204).end()
  } catch(error) {
    return res.status(400).json({ error })
  }
})

module.exports = router