const express = require('express')
const mongoose = require('mongoose')
const { addUser } = require('../seeder/index')
const { updateModel } = require('./routeUtilities')

const Users = mongoose.model('User')
const router = express.Router()

const sanitiseUser = userObj => {
  return {
    name: userObj.name,
    email: userObj.email,
    _id: userObj._id
  }
}

router.get('/users', async (req, res, next) => {
  const users = await Users.find()
  res.json(
    // Remove password from returned json
    users.map(user => sanitiseUser(user))
  )
})

router.get('/users/:id', async (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const user = await Users.findById(req.params.id)
    if (user) return res.json(sanitiseUser(user))
  }
  res.json({ message: 'User not found' })
})

router.post('/users', async (req, res, next) => {
  const user = await addUser(req.body)
  res.json(sanitiseUser(user))
})

router.patch('/users/:id', async (req, res, next) => {
  const update = { ...req.body }
  delete update._id
  delete update.email
  const user = await updateModel(Users, req.params.id, update)
  if (user) return res.json(user)
  else {
    res.json({ message: 'user not updated' })
  }
})

router.delete('/users/:id', async (req, res, next) => {
  const user = await Users.findByIdAndDelete(req.params.id)
  if (user) res.json(sanitiseUser(user))
  else {
    res.json({ message: 'User not found' })
  }
})

module.exports = router
