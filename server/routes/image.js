const express = require('express')
const mongoose = require('mongoose')
const { checkJwt, restrictAccess } = require('../authentication.js')
const { addImage } = require('../controllers/image')
const { updateModel } = require('./routeUtilities')

const Image = mongoose.model('Image')
const router = express.Router()

router.get('/image', async (req, res) => {
  try {
    const imageObj = await Image.find()
    res.json(imageObj)
  } catch (error) {
    res.status(500).json(error)
  }
})

router.get('/image/:id', async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    try {
      const image = await Image.findById(req.params.id)
      return image ? res.json(image) : res.status(404).json('Image not found')
    } catch (error) {
      return res.status(500).json(error)
    }
  }
  return res.status(400).json('Invalid objectId')
})

router.post('/image', async (req, res) => {
  try {
    const image = await addImage(req.body)
    res.json(image)
  } catch (error) {
    if(error.name === 'ValidationError') {
      return res.status(400).json(error)
    }
    res.status(500).json(error)
  }
})

router.patch('/image/:id', checkJwt, restrictAccess, async (req, res) => {
  const update = { ...req.body }
  delete update._id
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    try {
      const image = await updateModel(Image, req.params.id, update)
      return image ? res.json(image) : res.status(404).json('Image not found')
    } catch (error) {
      return res.status(500).json({ error })
    }
  }
  return res.status(400).json('Invalid objectId')
})

router.delete('/image/:id', checkJwt, restrictAccess, async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    try {
      const image = await Image.findByIdAndDelete(req.params.id)
      return image ? res.json(image) : res.status(404).json('Image not found')
    } catch (error) {
      return res.status(500).json(error)
    }
  }
  return res.status(400).json('Invalid objectId')
})

module.exports = router
