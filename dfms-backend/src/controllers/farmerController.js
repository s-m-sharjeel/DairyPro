const farmerModel = require('../models/farmer');

async function addFarmer(req, res) {
  try {
    await farmerModel.addFarmer(req.body);
    res.status(201).send('Farmer added successfully');
  } catch (err) {
    res.status(500).send('Error adding farmer');
  }
}

async function getAllFarmers(req, res) {
  try {
    const farmers = await farmerModel.getAllFarmers();
    res.json(farmers);
  } catch (err) {
    res.status(500).send('Error fetching farmers');
  }
}

async function getFarmerById(req, res) {
  const { farmerID } = req.params;
  try {
    const farmer = await farmerModel.getFarmerById(farmerID);
    res.json(farmer);
  } catch (err) {
    res.status(404).send('Farmers not found');
  }
}

async function updateFarmer(req, res) {
  const { farmerID } = req.params;
  try {
    await farmerModel.updateFarmer(farmerID, req.body);
    res.send('Farmer updated successfully');
  } catch (err) {
    res.status(500).send('Error updating farmer');
  }
}

async function checkFarmerLogin(req, res) {
  const { email, password } = req.body;
  try {
    const farmer = await farmerModel.checkFarmerLogin(email, password);
    if (farmer) {
      res.status(200).json({ success: true, farmer }); // Ensure response format is correct
    } else {
      res.status(401).send('Invalid login credentials');
    }
  } catch (err) {
    res.status(500).send('Error logging in farmer');
  }
}

async function deleteFarmer(req, res) {
  const { farmerID } = req.params;
  try {
    await farmerModel.deleteFarmer(farmerID);
    res.send('Farmer deleted successfully');
  } catch (err) {
    res.status(500).send('Error deleting farmer');
  }
}

module.exports = {
  addFarmer,
  getAllFarmers,
  //getFarmerById,
  checkFarmerLogin,
  updateFarmer,
  deleteFarmer
};
