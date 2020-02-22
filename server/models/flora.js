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
    enum: ['leaf', 'tulip', 'lotus', 'tree', 'other']
  },
  instances: [
    {
      location: {
        type: {
          type: String,
          enum: ['Point'],
          required: true
        },
        heading: {
          type: String
        },
        description: {
          type: String
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

mongoose.model('Flora', floraSchema, 'flora')
