const mongoose = require('mongoose');

const goldPriceSchema = new mongoose.Schema({
  itemId: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const GoldPrice = mongoose.model('GoldPrice', goldPriceSchema);

module.exports = GoldPrice;
