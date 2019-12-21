const express = require('express')
const mongoose = require('mongoose')

const Flora = mongoose.model('Flora')
const router = express.Router()

router.get('/flora', async (req, res, next) => {
  const floraObj = await Flora.find()

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
  const obj = await Flora.findById(req.params.id)
  res.json(obj)
  next()
})

router.put('/flora/:id', async (req, res, next) => {
  const floraObj = await Flora.findById(req.params.id)

  floraObj.update(
    { name: res.body.name },
    { scientificName: res.body.scientificName },
    { description: res.body.description },
    { icon: res.body.icon },
    { instances: res.body.instances }
  )

  res.json(floraObj)
  next()
})

router.delete('/flora/:id', async (req, res, next) => {
  const floraObj = await Flora.findByIdAndDelete(req.params.id)
  res.json(floraObj.deletedCount)
  next()
})

module.exports = router
