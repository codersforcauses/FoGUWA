const express = require('express')
const mongoose = require('mongoose')
const { checkJwt } = require('../authentication.js')
const { addUser } = require('../seeder/index')
const { updateModel } = require('./routeUtilities')

const Users = mongoose.model('User')
const router = express.Router()

// Remove password from returned json
const sanitiseUser = ({ name, email, _id }) => ({
  name,
  email,
  _id
})

router.get('/users', checkJwt, async (req, res) => {
  try {
    const users = await Users.find()
    res.json(
      // Remove password from returned json
      users.map(user => sanitiseUser(user)))
  } catch (error) {
    res.status(500).json(error)
  }
})

router.get('/users/:id', checkJwt, async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    try {
      const user = await Users.findById(req.params.id)
      return user ? res.json(sanitiseUser(user)) : res.status(404).json('User not found')
    } catch (error) {
      return res.status(500).json(error)
    }
  }
  return res.status(400).json('Invalid objectId')
})

router.post('/users', checkJwt, async (req, res) => {
  try { 
    const user = await addUser(req.body)
    res.json(sanitiseUser(user))
  } catch (error) {
    res.status(500).json(error)
  }
})

router.patch('/users/:id', checkJwt, async (req, res) => {
  const update = { ...req.body }
  delete update._id
  delete update.email
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    try {
      const user = await updateModel(Users, req.params.id, update)
      return user ? res.json(sanitiseUser(user)) : res.status(404).json('User not found')
    } catch (error) {
      return res.status(500).json(error)
    }
  }
  return res.status(400).json('Invalid objectId')
})

router.delete('/users/:id', checkJwt, async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    try {
      const user = await Users.findByIdAndDelete(req.params.id)
      return user ? res.json(sanitiseUser(user)) : res.status(404).json('User not found')
    } catch (error) {
      return res.status(500).json(error)
    }
  }
  return res.status(400).json('Invalid objectId')
})

module.exports = router
