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
// PUT request handler for updating cattle (UPDATE)
async function updateCattle(req, res) {
  
  const { cattleID } = req.params; // Get cattleID from the URL parameters
  const updatedData = req.body; // Get data from request body
  console.log(cattleID);
  // Validate that cattleID is present in the URL parameters
  if (!cattleID) {
    return res.status(400).send({ message: 'CattleID is required' });
  }

  // Check if all necessary fields are provided in the body
  if (!updatedData.type || !updatedData.breed || !updatedData.age || !updatedData.weight || !updatedData.feed || !updatedData.feedConsumption) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  try {
    // Call the function to update cattle record
    await cattleModel.updateCattle(cattleID, updatedData);

    res.status(200).send({ message: 'Cattle updated successfully' });
  } catch (error) {
    console.error('Error updating cattle:', error);
    res.status(500).send({ message: 'Error updating cattle', error: error.message });
  }
}

// DELETE request handler for deleting cattle (DELETE)
async function deleteCattle(req, res) {
    const { cattleID } = req.params; 
    console.log('id ', cattleID);// Extract the cattle ID from the URL parameters
    try {
      await cattleModel.deleteCattle(cattleID); // Call the delete function in the model
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
