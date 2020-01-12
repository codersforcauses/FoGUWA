const express = require('express')
const mongoose = require('mongoose')
const { checkJwt } = require('../authentication.js')
const { addUser, updateUser } = require('../controllers/users')

const Users = mongoose.model('User')
const router = express.Router()

// Remove password from returned json
const sanitiseUser = ({ name, email, _id }) => ({
  name,
  email,
  _id
})

router.get('/users', checkJwt, async (req, res, next) => {
  const users = await Users.find()
  res.json(users.map(user => sanitiseUser(user)))
})

router.get('/users/:id', checkJwt, async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const user = await Users.findById(req.params.id)
    if (user) return res.json(sanitiseUser(user))
  }
  res.status(400).json('User not found')
})

router.post('/users', checkJwt, async (req, res) => {
  const user = await addUser(req.body)
  res.json(sanitiseUser(user))
})

router.patch('/users/:id', checkJwt, async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const user = await updateUser(req.params.id, req.body)
    if (user) return res.json(user)
  }
  res.status(400).json('User not updated/found')
})

router.delete('/users/:id', checkJwt, async (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const user = await Users.findByIdAndDelete(req.params.id)
    if (user) return res.json(sanitiseUser(user))
  }
  res.status(400).json('User not found')
})

module.exports = router
