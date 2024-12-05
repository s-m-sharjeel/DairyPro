// src/controllers/cattleController.js
const cattleModel = require('../models/cattle'); // Import the model

// POST request handler for adding cattle (CREATE)
// POST request handler for adding cattle (CREATE)
async function addCattle(req, res) {
  const { type, breed, age, weight, feed, feedConsumption } = req.body;
  console.log('Hello');
  try {
    // Assuming cattleModel.addCattle is a function that handles adding a new cattle
    await cattleModel.addCattle(type, breed, age, weight, feed, feedConsumption);  
    res.status(201).send('Cattle added successfully');
  } catch (err) {
    console.error('Error adding cattle:', err);
    res.status(500).send('Error adding cattle');
  }
}


// GET request handler for all cattle (READ)
async function getAllCattle(req, res) {
  try {
    const cattleList = await cattleModel.getAllCattle();
    res.json(cattleList);
  } catch (err) {
    console.error('Error fetching cattle:', err);
    res.status(500).send('Error fetching cattle');
  }
}

// GET request handler for a single cattle by ID (READ)
async function getCattleById(req, res) {
  const { id } = req.params;
  try {
    const cattle = await cattleModel.getCattleById(id);
    res.json(cattle);
  } catch (err) {
    console.error('Error fetching cattle:', err);
    res.status(404).send('Cattle not found');
  }
}

// PUT request handler for updating cattle (UPDATE)
async function updateCattle(req, res) {
  const { id } = req.params;
  const { type, breed, age, weight, feed, feedConsumption } = req.body;
  try {
    await cattleModel.updateCattle(id, type, breed, age, weight, feed, feedConsumption);
    res.send('Cattle updated successfully');
  } catch (err) {
    console.error('Error updating cattle:', err);
    res.status(500).send('Error updating cattle');
  }
}

// DELETE request handler for deleting cattle (DELETE)
async function deleteCattle(req, res) {
    const { id } = req.params; 
    console.log('id ', id);// Extract the cattle ID from the URL parameters
    try {
      await cattleModel.deleteCattle(id); // Call the delete function in the model
      res.send('Cattle deleted successfully');
    } catch (err) {
      console.error('Error deleting cattle:', err); // Log error if any
      res.status(500).send('Error deleting cattle'); // Send error response
    }
  }

// Export the functions to be used in the routes
module.exports = {
  addCattle,
  getAllCattle,
  getCattleById,
  updateCattle,
  deleteCattle
};
