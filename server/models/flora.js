const mongoose = require('mongoose')

const floraSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  scientificName: {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true,
    enum: ['leaf', 'flower_1', 'flower_2', 'tree']
  },
  instances: [
    {
      location: {
        type: {
          type: String,
          enum: ['Point'],
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      }
    }
  ],
  images: {
    type: [String]
  }
})

mongoose.model('Flora', floraSchema)
