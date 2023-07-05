const router = require('express').Router()

const { Stock, User } = require('../models')

router.delete('/reset', async (req, res) => {
  await Stock.destroy({ where: {} })
  await User.destroy({ where: {} })

  res.status(204).end()
})

module.exports = router