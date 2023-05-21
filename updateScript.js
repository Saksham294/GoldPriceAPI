const fetch = require('node-fetch');
const GoldPrice = require('./models/goldPrice');

// Function to update the prices of gold items automatically
async function updateGoldItemPrices() {
  try {
    // Call the Mock Gold Price API to get the current gold price
    const response = await fetch('http://localhost:3000/mock-price');
    const data = await response.json();
    const currentGoldPrice = data.price;

    // Update the price of each gold item in the MongoDB database with the new price
    await GoldPrice.updateMany({}, { price: currentGoldPrice });

    console.log('Gold item prices updated successfully');
  } catch (error) {
    console.error('Failed to update gold item prices:', error);
  }
}

// Run the daily update script
updateGoldItemPrices();
