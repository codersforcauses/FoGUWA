const express = require('express')
const mongoose = require('mongoose')
const consola = require('consola')

const Users = mongoose.model('User')
const router = express.Router()

router.get('/users', async (req, res, next) => {
  const usersObj = await Users.find()
  res.json(usersObj)
  next()
})

router.get('/users/:id', async (req, res, next) => {
  const usersObj = await Users.findById(req.params.id)
  res.json(usersObj)
  next()
})

router.post('/users', async (req, res, next) => {
  const { addUser } = require('../seeder/index')
  const userPromise = await addUser(req.body)
  res.json(userPromise)
  next()
})

router.put('users/:id', async (req, res, next) => {
  const filter = { id: req.params.id }
  const update = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }

  const userObj = await Users.findOneAndUpdate(filter, update, (err, doc) => {
    if (err) {
      consola.error('Something went wrong upating user information.')
    }
  })
  res.json(userObj)
  next()
})

router.delete('/users/:id', async (req, res, next) => {
  const userObj = await Users.findByIdAndDelete(req.params.id)
  res.json(userObj)
  next()
})

module.exports = router
