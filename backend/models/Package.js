const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  destination: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  duration: {
    type: Number,
    required: true,
    min: 1
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    default: 'https://source.unsplash.com/random/300x200/?travel'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Package', packageSchema);