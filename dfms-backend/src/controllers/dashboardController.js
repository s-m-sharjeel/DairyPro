// src/controllers/dashboardController.js
const dashboardModel = require('../models/dashboard'); // Import the model

async function getTotalMilkProduced(req, res) {
  try {
    const totalMilk = await dashboardModel.getMilkProductionForToday();
    res.json(totalMilk);
  } catch (err) {
    console.error('Error fetching total milk:', err);
    res.status(500).send('Error fetching total milk');
  }
}

async function getAverageQualityOfMilk(req, res) {
  try {
    const avgMilk = await dashboardModel.getAverageQualityForToday();
    res.json(avgMilk);
  } catch (err) {
    console.error('Error fetching avg quality of milk:', err);
    res.status(500).send('Error fetching avg quality of milk');
  }
}

async function getMostConsumedFeed(req, res) {
  try {
    const topConsumed = await dashboardModel.getMostConsumedFeedForToday();
    res.json(topConsumed);
  } catch (err) {
    console.error('Error fetching top most consumed feed:', err);
    res.status(500).send('Error fetching top most consumed feed');
  }
}

// Export the functions to be used in the routes
module.exports = {
  getTotalMilkProduced,
  getAverageQualityOfMilk,
  getMostConsumedFeed
};
