const express = require('express')
const mongoose = require('mongoose')
const consola = require('consola')

const Flora = mongoose.model('Flora')
const router = express.Router()

router.get('/flora', async (req, res, next) => {
  const floraObj = await Flora.find()
  res.json(floraObj)
  next()
})

router.post('/flora', async (req, res, next) => {
  const { addFlora } = require('../seeder/index')
  const floraPromise = await addFlora(req.params)
  await res.json(floraPromise)
  next()
})

router.get('/flora/:id', async (req, res, next) => {
  const obj = await Flora.findById(req.params.id)
  res.json(obj)
  next()
})

router.put('/flora/:id', async (req, res, next) => {
  const filter = { id: req.params.id }
  const update = {
    name: req.body.name,
    scientificName: req.body.scientificName,
    description: req.body.description,
    icon: req.body.icon,
    instances: req.body.instances
  }
  const floraObj = await Flora.findOneAndUpdate(filter, update, (err, doc) => {
    if (err) {
      consola.error(`Updating flora failed: ${err}`)
    }
  })
  res.json(floraObj)
  next()
})

router.delete('/flora/:id', async (req, res, next) => {
  const floraObj = await Flora.findByIdAndDelete(req.params.id)
  const flora = await Promise.all(floraObj)
  res.json(flora)
  next()
})

module.exports = router
