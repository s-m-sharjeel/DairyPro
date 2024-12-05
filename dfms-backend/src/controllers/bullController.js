const bullModel = require('../models/bull');

async function addBull(req, res) {
  try {
    await bullModel.addBull(req.body);
    res.status(201).send('Bull added successfully');
  } catch (err) {
    res.status(500).send('Error adding bull');
  }
}

async function getBullById(req, res) {
  const { cattleID } = req.params;
  try {
    const bull = await bullModel.getBullById(cattleID);
    res.json(bull);
  } catch (err) {
    res.status(404).send('Bull not found');
  }
}

async function deleteBull(req, res) {
  const { cattleID } = req.params;
  try {
    await bullModel.deleteBull(cattleID);
    res.send('Bull deleted successfully');
  } catch (err) {
    res.status(500).send('Error deleting bull');
  }
}

module.exports = {
  addBull,
  getBullById,
  deleteBull
};
