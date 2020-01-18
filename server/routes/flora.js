const express = require('express')
const mongoose = require('mongoose')
const { checkJwt } = require('../authentication.js')
const { getFlora, addFlora, updateFlora } = require('../controllers/flora')

const Flora = mongoose.model('Flora')
const router = express.Router()

router.get('/flora', async res => {
  const floraObj = await getFlora()
  res.json(floraObj)
})

router.get('/flora/:id', async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const flora = await Flora.findById(req.params.id)
    return flora ? res.json(flora) : res.status(400).json('Flora not found')
  }
  res.status(400).json('Invalid flora id')
})

router.post('/flora', checkJwt, async (req, res, next) => {
  try {
    const flora = await addFlora(req.body)
    return res.json(flora)
  } catch (err) {
    return res.json(err.message)
  }
})

router.patch('/flora/:id', checkJwt, async (req, res, next) => {
  const update = { ...req.body }
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const flora = await updateFlora(req.params.id, update)
    return flora
      ? res.json(flora)
      : res.status(400).json('Flora not updated/found')
  }
  res.status(400).json('Invalid flora id')
})

router.delete('/flora/:id', checkJwt, async (req, res, next) => {
  const flora = await Flora.findByIdAndDelete(req.params.id)
  if (flora) res.json(flora)
  else {
    res.status(400).json('Flora not found')
  }
})

module.exports = router
