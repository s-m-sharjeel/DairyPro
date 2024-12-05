const breedingModel = require('../models/breedingRecords');

async function addBreedingRecord(req, res) {
  try {
    await breedingModel.addBreedingRecord(req.body);
    res.status(201).send('Breeding record added successfully');
  } catch (err) {
    console.error('Error adding breeding record:', err);
    res.status(500).send('Error adding breeding record');
  }
}

async function getBreedingRecords(req, res) {
  try {
    const records = await breedingModel.getBreedingRecords();
    res.json(records);
  } catch (err) {
    console.error('Error fetching breeding records:', err);
    res.status(500).send('Error fetching breeding records');
  }
}

async function getBreedingRecordById(req, res) {
  const { brID } = req.params;
  try {
    const record = await breedingModel.getBreedingRecordById(brID);
    res.json(record);
  } catch (err) {
    console.error('Error fetching breeding record by ID:', err);
    res.status(404).send('Breeding record not found');
  }
}

async function updateBreedingRecord(req, res) {
  const { brID } = req.params;
  try {
    await breedingModel.updateBreedingRecord(brID, req.body);
    res.send('Breeding record updated successfully');
  } catch (err) {
    console.error('Error updating breeding record:', err);
    res.status(500).send('Error updating breeding record');
  }
}

async function deleteBreedingRecord(req, res) {
  const { brID } = req.params;
  try {
    await breedingModel.deleteBreedingRecord(brID);
    res.send('Breeding record deleted successfully');
  } catch (err) {
    console.error('Error deleting breeding record:', err);
    res.status(500).send('Error deleting breeding record');
  }
}

module.exports = {
  addBreedingRecord,
  getBreedingRecords,
  getBreedingRecordById,
  updateBreedingRecord,
  deleteBreedingRecord
};
