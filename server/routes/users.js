const express = require('express')
const mongoose = require('mongoose')
const consola = require('consola')
const { addUser } = require('../seeder/index')

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
    users.map(user => {
      const cleanUser = sanitiseUser(user)
      return cleanUser
    })
  )
})

router.get('/users/:id', async (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const user = await Users.findById(req.params.id)
    if (user) return res.json(sanitiseUser(user))
  }
  res.json({ message: 'User not found' })
  consola.error(`User not found`)
})

router.post('/users', async (req, res, next) => {
  const user = await addUser(req.body)
  res.json(sanitiseUser(user))
})

router.put('users/:id', async (req, res, next) => {
  const filter = { id: req.params.id }
  const { name, email, password } = req.body
  const update = {
    name,
    email,
    password
  }

  const user = await Users.findOneAndUpdate(filter, update, (err, doc) => {
    if (err) {
      consola.error(`Error updating user information: ${err}`)
    }
  })
  res.json(sanitiseUser(user))
})

router.delete('/users/:id', async (req, res, next) => {
  const user = await Users.findByIdAndDelete(req.params.id)
  if (user) res.json(sanitiseUser(user))
  else {
    res.json({ message: 'User not found' })
    consola.error(`User not found`)
  }
})

module.exports = router