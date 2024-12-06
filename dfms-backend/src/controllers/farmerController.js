const farmerModel = require('../models/farmer');

async function addFarmer(req, res) {
  const { name, contactInfo, role, password } = req.body;

  try {
    await farmerModel.addFarmer({ name, contactInfo, role, password });
    res.status(201).send('Farmer added successfully');
  } catch (err) {
    res.status(500).send(err.message || 'Error adding farmer');
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

async function updateFarmer(req, res) {
  const { farmerID } = req.params;

  try {
    await farmerModel.updateFarmer(farmerID, req.body);
    res.send('Farmer updated successfully');
  } catch (err) {
    res.status(500).send(err.message || 'Error updating farmer');
  }
}

async function deleteFarmer(req, res) {
  const { farmerID } = req.params;

  try {
    await farmerModel.deleteFarmer(farmerID);
    res.send('Farmer deleted successfully');
  } catch (err) {
    res.status(500).send(err.message || 'Error deleting farmer');
  }
}

async function checkFarmerLogin(req, res) {
  const { contactInfo, password } = req.body;

  try {
    const farmer = await farmerModel.checkFarmerLogin(contactInfo, password);
    if (!farmer) return res.status(401).send('Invalid login credentials');

    res.status(200).json({ success: true, farmer });
  } catch (err) {
    res.status(500).send(err.message || 'Error logging in farmer');
  }
}

async function updateFarmerPassword(req, res) {
  const { farmerID } = req.params;
  const { currentPassword, newPassword } = req.body;

  try {
    await farmerModel.updateFarmerPassword(farmerID, currentPassword, newPassword);
    res.send('Password updated successfully');
  } catch (err) {
    res.status(500).send(err.message || 'Error updating password');
  }
}

async function updateFarmerSettings(req, res) {
  const { farmerID } = req.params;
  const settings = req.body; // Expect settings as an object

  try {
    await farmerModel.updateFarmerSettings(farmerID, settings);
    res.send('Farmer settings updated successfully');
  } catch (err) {
    res.status(500).send(err.message || 'Error updating farmer settings');
  }
}



module.exports = {
  addFarmer,
  getAllFarmers,
  updateFarmer,
  updateFarmerSettings,
  deleteFarmer,
  checkFarmerLogin,
  updateFarmerPassword,
};
