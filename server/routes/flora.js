const express = require('express')
const mongoose = require('mongoose')

const Flora = mongoose.model('Flora')
const router = express.Router()

router.get('/flora', async (req, res, next) => {
  const floraObj = await Flora.find().exec()

  res.json(floraObj)
  next()
})

router.post('/flora', async (req, res, next) => {
  const { addFlora } = require('../seeder/index')
  const floraPromise = await addFlora(req.body)
  const flora = await Promise.all(floraPromise)
  res.json(flora)
  next()
})

router.get('/flora/:id', async (req, res, next) => {
  const obj = await Flora.findById(req.params.id).exec()
  res.json(obj)
  next()
})

module.exports = router
