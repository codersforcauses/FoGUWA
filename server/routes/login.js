const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Users = mongoose.model('User')

const { getUserInfo, getToken } = require('../authentication')

router.get('/userinfo', async (req, res) => {
  try {
    const userInfo = await getUserInfo(getToken(req))
    const { email } = userInfo.data
    const user = await Users.findOne({ email })
    return res.json(user)
  } catch (error) {
    const { message, name } = error
    return res.json({ name, message })
  }
})

module.exports = router
