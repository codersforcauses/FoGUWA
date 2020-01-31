const mongoose = require('mongoose')
const User = mongoose.model('User')
const consola = require('consola')

module.exports = {
  findUserByEmail: async email => {
    const user = await User.find({ email }).limit(1)
    if (user) return user
    consola.log('User not found')
  }
}
