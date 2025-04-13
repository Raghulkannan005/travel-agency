const express = require('express');
const router = express.Router();
const Package = require('../models/Package');

// Get all packages
router.get('/', async (req, res) => {
  try {
    const packages = await Package.find().sort({ createdAt: -1 });
    res.json(packages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single package
router.get('/:id', async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    if (!package) {
      return res.status(404).json({ message: 'Package not found' });
    }
    res.json(package);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new package
router.post('/', async (req, res) => {
  const { title, destination, price, duration, description, imageUrl } = req.body;
  
  try {
    const newPackage = new Package({
      title,
      destination,
      price,
      duration,
      description,
      imageUrl
    });
    
    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update package
router.put('/:id', async (req, res) => {
  try {
    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    
    res.json(updatedPackage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete package
router.delete('/:id', async (req, res) => {
  try {
    const deletedPackage = await Package.findByIdAndDelete(req.params.id);
    
    if (!deletedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    
    res.json({ message: 'Package deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;