const express = require('express')
const mongoose = require('mongoose')
const { addFlora } = require('../seeder/index')
const { updateModel } = require('./routeUtilities')

const Flora = mongoose.model('Flora')
const router = express.Router()

router.get('/flora', async (req, res, next) => {
  const floraObj = await Flora.find()
  res.json(floraObj)
})

router.get('/flora/:id', async (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const flora = await Flora.findById(req.params.id)
    if (flora) return res.json(flora)
  }
  res.json({ message: 'Flora not found' })
})

router.post('/flora', async (req, res, next) => {
  const flora = await addFlora(req.body)
  res.json(flora)
})

router.patch('/flora/:id', async (req, res, next) => {
  const update = { ...req.body }
  delete update._id
  const flora = await updateModel(Flora, req.params.id, update)
  if (flora) return res.json(flora)
  else {
    res.json({ message: 'Flora not updated' })
  }
})

router.delete('/flora/:id', async (req, res, next) => {
  const flora = await Flora.findByIdAndDelete(req.params.id)
  if (flora) res.json(flora)
  else {
    res.json({ message: 'Flora not found' })
  }
})

module.exports = router
