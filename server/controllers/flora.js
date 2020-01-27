const mongoose = require('mongoose')
const Flora = mongoose.model('Flora')

module.exports = {
  getFlora: () => {
    return new Promise((resolve, reject) => {
      Flora.find((err, res) => {
        err ? reject(err) : resolve(res)
      })
    })
  },

  addFlora: floraObject => {
    return new Promise((resolve, reject) => {
      const flora = new Flora()
      Object.keys(floraObject).forEach(field => {
        flora[field] = floraObject[field]
      });
      flora.save((err, flora) => {
        err ? reject(err) : resolve(flora)
      })
    })
  },

  updateFlora: (id, update) => {
    delete update._id
    return new Promise((resolve, reject) => {
      Flora.findByIdAndUpdate(id, update, { new: true }, (err, flora) => {
        err ? reject(err) : resolve(flora)
      })
    })
  }
}
