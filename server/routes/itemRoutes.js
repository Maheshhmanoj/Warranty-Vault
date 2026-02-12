const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

router.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/add', async (req, res) => {
  try {
    const { productName, category, purchaseDate, warrantyMonths, serialNumber, receiptImage } = req.body;
    
    const months = Number(warrantyMonths);
    if (isNaN(months)) throw new Error("Warranty Months must be a number");

    const purchase = new Date(purchaseDate);
    const expiry = new Date(purchase);
    expiry.setMonth(expiry.getMonth() + months);

    const today = new Date();
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    let status = 'Active';
    if (diffDays < 0) status = 'Expired';
    else if (diffDays <= 30) status = 'Expiring Soon';

    const newItem = new Item({
      productName,
      category,
      purchaseDate,
      warrantyMonths: months,
      serialNumber,
      receiptImage,
      expiryDate: expiry, 
      status: status     
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);

  } catch (err) {
    console.error("Backend Error:", err.message);
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: "Update Failed: " + err.message });
  }
});

module.exports = router;