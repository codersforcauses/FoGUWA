const mongoose = require('mongoose')
const Flora = mongoose.model('Flora')

module.exports = {
  addFlora: floraObject => {
    return new Promise((resolve, reject) => {
      const flora = new Flora()
      flora.name = floraObject.name
      flora.scientificName = floraObject.scientificName
      flora.description = floraObject.description
      flora.icon = floraObject.icon
      flora.instances = floraObject.instances
      flora.save(err => {
        if (err) {
          reject(err)
        }
      })
      resolve(flora)
    })
  },

  updateFlora: (id, update) => {
    return new Promise((resolve, reject) => {
      Flora.findByIdAndUpdate(id, update, { new: true }, (err, res) => {
        if (err) reject(err)
        else resolve(res)
      })
    })
  }
}