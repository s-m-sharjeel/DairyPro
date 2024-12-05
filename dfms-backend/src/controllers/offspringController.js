const offspringModel = require('../models/offspring');

async function addOffspring(req, res) {
  try {
    await offspringModel.addOffspring(req.body);
    res.status(201).send('Offspring added successfully');
  } catch (err) {
    res.status(500).send('Error adding offspring');
  }
}

async function getOffspringById(req, res) {
  const { cattleID } = req.params;
  try {
    const offspring = await offspringModel.getOffspringById(cattleID);
    res.json(offspring);
  } catch (err) {
    res.status(404).send('Offspring not found');
  }
}

async function deleteOffspring(req, res) {
  const { cattleID } = req.params;
  try {
    await offspringModel.deleteOffspring(cattleID);
    res.send('Offspring deleted successfully');
  } catch (err) {
    res.status(500).send('Error deleting offspring');
  }
}

module.exports = {
  addOffspring,
  getOffspringById,
  deleteOffspring
};
