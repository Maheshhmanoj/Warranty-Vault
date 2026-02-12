const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  category: { type: String, required: true },
  purchaseDate: { type: Date, required: true },
  warrantyMonths: { type: Number, required: true },
  serialNumber: { type: String, default: '' },
  receiptImage: { type: String, default: '' },
  expiryDate: { type: Date },
  status: { type: String, default: 'Active' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Item', ItemSchema);