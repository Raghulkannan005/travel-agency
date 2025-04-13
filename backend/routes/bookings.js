const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Package = require('../models/Package');

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('selectedPackage')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single booking
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('selectedPackage');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new booking
router.post('/', async (req, res) => {
  const { name, email, selectedPackage, date, guests } = req.body;
  
  try {
    // Find the package to calculate total price
    const packageDetails = await Package.findById(selectedPackage);
    if (!packageDetails) {
      return res.status(404).json({ message: 'Selected package not found' });
    }
    
    // Calculate total price
    const totalPrice = packageDetails.price * guests;
    
    const newBooking = new Booking({
      name,
      email,
      selectedPackage,
      date,
      guests,
      totalPrice
    });
    
    const savedBooking = await newBooking.save();
    
    // Populate the package details before returning
    const populatedBooking = await Booking.findById(savedBooking._id).populate('selectedPackage');
    
    res.status(201).json(populatedBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update booking
router.put('/:id', async (req, res) => {
  try {
    // If updating selected package or guests, recalculate total price
    let updateData = { ...req.body };
    
    if (req.body.selectedPackage || req.body.guests) {
      const bookingToUpdate = await Booking.findById(req.params.id);
      if (!bookingToUpdate) {
        return res.status(404).json({ message: 'Booking not found' });
      }
      
      const packageId = req.body.selectedPackage || bookingToUpdate.selectedPackage;
      const guests = req.body.guests || bookingToUpdate.guests;
      
      const packageDetails = await Package.findById(packageId);
      if (!packageDetails) {
        return res.status(404).json({ message: 'Selected package not found' });
      }
      
      updateData.totalPrice = packageDetails.price * guests;
    }
    
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id, 
      updateData,
      { new: true, runValidators: true }
    ).populate('selectedPackage');
    
    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    res.json(updatedBooking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete booking
router.delete('/:id', async (req, res) => {
  try {
    const deletedBooking = await Booking.findByIdAndDelete(req.params.id);
    
    if (!deletedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;