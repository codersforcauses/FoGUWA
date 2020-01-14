const mongoose = require('mongoose')
const Flora = mongoose.model('Flora')

module.exports = {
  getFlora: res => {
    return new Promise((resolve, reject) => {
      Flora.find((err, res) => {
        if (err) reject(err)
        else resolve(res)
      })
    })
  },

  addFlora: floraObject => {
    return new Promise((resolve, reject) => {
      const flora = new Flora()
      flora.name = floraObject.name
      flora.scientificName = floraObject.scientificName
      flora.description = floraObject.description
      flora.icon = floraObject.icon
      flora.instances = floraObject.instances
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
