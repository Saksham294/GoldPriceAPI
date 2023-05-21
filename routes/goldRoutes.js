const express = require('express');
const router = express.Router();
const GoldPrice = require('../models/goldPrice');

// Mock Gold Price API endpoint
router.get('/mock-price', async (req, res) => {
  // Generate a random gold price
  const goldPrice = Math.random() * 100;

  // Return the generated price
  res.json({ price: goldPrice });
});

// Update Gold Item Price API endpoint
router.put('/update-price/:itemId', async (req, res) => {
  const { itemId } = req.params;

  // Call the Mock Gold Price API to get the current gold price
  const response = await fetch('http://localhost:3000/mock-price');
  const data = await response.json();
  const currentGoldPrice = data.price;

  // Multiply grams of gold present in gold items with the gold price
  const updatedPrice = req.body.grams * currentGoldPrice;

  try {
    // Update the price of the gold item in the MongoDB database
    const updatedGoldPrice = await GoldPrice.findOneAndUpdate(
      { itemId },
      { price: updatedPrice },
      { new: true, upsert: true }
    );

    res.json(updatedGoldPrice);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update gold item price' });
    }
});

// Retrieve Gold Item Price API endpoint
router.get('/retrieve-prices', async (req, res) => {
    const { itemId, timeRange = 30 } = req.query;
  
    try {
      let query = {};
  
      if (itemId) {
        query.itemId = itemId;
      }
  
      // Calculate the start date based on the time range
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - timeRange);
  
      // Retrieve the current and best prices of gold items within the specified time range
      const goldPrices = await GoldPrice.find({
        ...query,
        timestamp: { $gte: startDate },
      }).sort({ price: -1 });
  
      res.json(goldPrices);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve gold item prices' });
    }
  });
  
  // Register the API routes
  app.use('/api/gold', router);

  
