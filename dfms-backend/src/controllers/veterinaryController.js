const veterinaryRecordsModel = require('../models/veterinaryRecords'); // Import the model

// POST request handler for adding a veterinary record (CREATE)
// Modify your addVeterinaryRecord function to expect keys in camelCase
async function addVeterinaryRecord(req, res) {
  // Use camelCase consistently
  const { cattleID, date, time, symptoms, diagnosis, treatment, vetName } = req.body;

  // Debugging logs
  console.log('Request body:', req.body);
  console.log("Adding veterinary record with the following data:");
  console.log("CattleID:", cattleID);
  console.log("Date:", date);
  console.log("Time:", time);
  console.log("Symptoms:", symptoms);
  console.log("Diagnosis:", diagnosis);
  console.log("Treatment:", treatment);
  console.log("VetName:", vetName);

  try {
    // Call the model function with consistent naming
    await veterinaryRecordsModel.addVeterinaryRecord(cattleID, date, time, symptoms, diagnosis, treatment, vetName);
    res.status(201).send('Veterinary record added successfully');
  } catch (err) {
    console.error('Error adding veterinary record:', err);
    res.status(500).send('Error adding veterinary record');
  }
}



// GET request handler for all veterinary records (READ)
async function getAllVeterinaryRecords(req, res) {
  try {
    const records = await veterinaryRecordsModel.getAllVeterinaryRecords();
    res.json(records);
  } catch (err) {
    console.error('Error fetching veterinary records:', err);
    res.status(500).send('Error fetching veterinary records');
  }
}

// GET request handler for a single veterinary record by ID (READ)
async function getVeterinaryRecordById(req, res) {
  const { id } = req.params;
  try {
    const record = await veterinaryRecordsModel.getVeterinaryRecordById(id);
    res.json(record);
  } catch (err) {
    console.error('Error fetching veterinary record by ID:', err);
    res.status(404).send('Veterinary record not found');
  }
}

// PUT request handler for updating a veterinary record (UPDATE)
async function updateVeterinaryRecord(req, res) {
  const { id } = req.params;
  const { cattleID, date, time, symptoms, diagnosis, treatment, vetName } = req.body;
  try {
    await veterinaryRecordsModel.updateVeterinaryRecord(id, cattleID, date, time, symptoms, diagnosis, treatment, vetName);
    res.send('Veterinary record updated successfully');
  } catch (err) {
    console.error('Error updating veterinary record:', err);
    res.status(500).send('Error updating veterinary record');
  }
}

// DELETE request handler for deleting a veterinary record (DELETE)
async function deleteVeterinaryRecord(req, res) {
  const { vrid } = req.params;
  console.log('vrid:', vrid);  // Debugging log to check if vrid is being captured correctly
  
  try {
    // Call the model function to delete the veterinary record
    await veterinaryRecordsModel.deleteVeterinaryRecord(vrid);
    res.status(200).send(`Veterinary record with ID ${vrid} deleted successfully`);
  } catch (err) {
    console.error('Error deleting veterinary record:', err);
    res.status(500).send('Error deleting veterinary record');
  }
}


// Export the functions to be used in the routes
module.exports = {
  addVeterinaryRecord,
  getAllVeterinaryRecords,
  getVeterinaryRecordById,
  updateVeterinaryRecord,
  deleteVeterinaryRecord
};