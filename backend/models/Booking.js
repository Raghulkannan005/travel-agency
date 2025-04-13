const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  selectedPackage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  guests: {
    type: Number,
    required: true,
    default: 1,
    min: 1
  },
  totalPrice: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Booking', bookingSchema);