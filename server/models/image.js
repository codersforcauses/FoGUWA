const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
  alt: {
    type: String,
    required: true
  },
  data: {
    type: String,
    required: true
  }
})

mongoose.model('Image', imageSchema, 'images')