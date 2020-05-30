const express = require('express')
const mongoose = require('mongoose')
const { checkJwt, restrictAccess } = require('../authentication.js')
const { addFlora } = require('../seeder/index')
const { updateModel } = require('./routeUtilities')

const Flora = mongoose.model('Flora')
const router = express.Router()

router.get('/flora', async (req, res) => {
  try {
    const floraObj = await Flora.find()
    res.json(floraObj)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.get('/flora/:id', async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    try {
      const flora = await Flora.findById(req.params.id)
      return flora ? res.json(flora) : res.status(404).json('Flora not found')
    } catch (error) {
      return res.status(500).json(error)
    }
  }
  return res.status(400).json('Invalid objectId')
})

router.post('/flora', async (req, res) => {
  try {
    const flora = await addFlora(req.body)
    res.json(flora)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.patch('/flora/:id', checkJwt, restrictAccess, async (req, res) => {
  const update = { ...req.body }
  delete update._id
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    try {
      const flora = await updateModel(Flora, req.params.id, update)
      return flora ? res.json(flora) : res.status(404).json('Flora not found')
    } catch (error) {
      return res.status(500).json({ error })
    }
  }
  return res.status(400).json('Invalid objectId')
})

router.delete('/flora/:id', checkJwt, restrictAccess, async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    try {
      const flora = await Flora.findByIdAndDelete(req.params.id)
      return flora ? res.json(flora) : res.status(404).json('Flora not found')
    } catch (error) {
      return res.status(500).json(error)
    }
  }
  return res.status(400).json('Invalid objectId')
})

module.exports = router
