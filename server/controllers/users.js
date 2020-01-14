const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = {
  addUser: userObject => {
    return new Promise((resolve, reject) => {
      const user = new User()
      user.name.first = userObject.name.first
      user.name.last = userObject.name.last
      user.email = userObject.email
      user.password = userObject.password
      user.save((err, user) => {
        err ? reject(err) : resolve(user)
      })
    })
  },

  updateUser: (id, update) => {
    delete update._id
    delete update.email
    return new Promise((resolve, reject) => {
      User.findByIdAndUpdate(id, update, { new: true }, (err, user) => {
        err ? reject(err) : resolve(user)
      })
    })
  }
}
