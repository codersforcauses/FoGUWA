const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Users = mongoose.model('User')

const { getUserInfo, getToken } = require('../authentication')

router.get('/login', async req => {
  const userInfo = await getUserInfo(getToken(req))
  const { email } = userInfo.data
  const user = await Users.findOne({ email })
  console.log(user)
})

module.exports = router
