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
        coordinates: {
          type: [Number],
          required: true
        }
      },
      heading: {
        type: String,
        default: ''
      },
      description: {
        type: String,
        default: ''
      }
    }
  ],
  images: {
    type: [
      {
        alt: {
          type: String,
          required: true
        },
        src: {
          type: String,
          required: true
        }
      }
    ]
  }
})

mongoose.model('Flora', floraSchema, 'flora')
