const mongoose = require('mongoose')
const Image = mongoose.model('Image')

module.exports = {
  getImage: () => {
    return new Promise((resolve, reject) => {
      Image.find((err, res) => {
        err ? reject(err) : resolve(res)
      })
    })
  },

  addImage: imageObject => {
    return new Promise((resolve, reject) => {
      const image = new Image(imageObject)
      image.save((err, image) => {
        err ? reject(err) : resolve(image)
      })
    })
  },

  updateImage: (id, update) => {
    delete update._id
    return new Promise((resolve, reject) => {
      Image.findByIdAndUpdate(id, update, { new: true }, (err, image) => {
        err ? reject(err) : resolve(image)
      })
    })
  }
}
