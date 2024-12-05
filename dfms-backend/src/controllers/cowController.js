const cowModel = require('../models/cow');

async function addCow(req, res) {
  try {
    await cowModel.addCow(req.body);
    res.status(201).send('Cow added successfully');
  } catch (err) {
    res.status(500).send('Error adding cow');
  }
}

async function getAllCows(req, res) {
  try {
    const cattleList = await cowModel.getAllCows();
    res.json(cattleList);
  } catch (err) {
    console.error('Error fetching cattle:', err);
    res.status(500).send('Error fetching cattle');
  }
}

async function getCowById(req, res) {
  const { cattleID } = req.params;
  try {
    const cow = await cowModel.getCowById(cattleID);
    res.json(cow);
  } catch (err) {
    res.status(404).send('Cow not found');
  }
}

async function deleteCow(req, res) {
  const { cattleID } = req.params;
  try {
    await cowModel.deleteCow(cattleID);
    res.send('Cow deleted successfully');
  } catch (err) {
    res.status(500).send('Error deleting cow');
  }
}

module.exports = {
  addCow,
  getCowById,
  deleteCow,
  getAllCows
};
