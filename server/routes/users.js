const express = require('express')
const mongoose = require('mongoose')
const { setUser } = require('../authentication.js')
const { addUser } = require('../seeder/index')
const { updateModel } = require('./routeUtilities')

const Users = mongoose.model('User')
const router = express.Router()

const sanitiseUser = ({ name, email, _id }) => ({
  name,
  email,
  _id
})

router.get('/users', setUser, (req, res, next) => {
  // const users = await Users.find()
  res.json(
    // Remove password from returned json
    // users.map(user => sanitiseUser(user))
    { hell0: 'hell', users: req }
  )
})

router.get('/users/:id', setUser, async (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const user = await Users.findById(req.params.id)
    if (user) return res.json(sanitiseUser(user))
  }
  res.status(400).send('User not found')
})

router.post('/users', setUser, async (req, res, next) => {
  const user = await addUser(req.body)
  res.json(sanitiseUser(user))
})

router.patch('/users/:id', setUser, async (req, res, next) => {
  const update = { ...req.body }
  delete update._id
  delete update.email
  const user = await updateModel(Users, req.params.id, update)
  if (user) return res.json(user)
  else {
    res.status(400).send('User not updated/found')
  }
})

router.delete('/users/:id', setUser, async (req, res, next) => {
  const user = await Users.findByIdAndDelete(req.params.id)
  if (user) res.json(sanitiseUser(user))
  else {
    res.status(400).send('User not found')
  }
})

module.exports = router
