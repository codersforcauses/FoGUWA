const express = require('express')
const mongoose = require('mongoose')

const Flora = mongoose.model('Flora')

const router = express.Router()

router.get('/flora', async (req, res, next) => {
  const query = Flora.find()
  const obj = await query

  res.json(obj)
  next()
})

router.post('/flora', (req, res, next) => {
  res.json({ data: 'nothing' })
  next()
})

module.exports = router
