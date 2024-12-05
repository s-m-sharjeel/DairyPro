const milkModel = require('../models/milkProduction');

async function addMilkProduction(req, res) {
  try {
    await milkModel.addMilkProduction(req.body);
    res.status(201).send('Milk production record added successfully');
  } catch (err) {
    res.status(500).send('Error adding milk production record');
  }
}

async function getAllMilkProduction(req, res) {
  try {
    const records = await milkModel.getMilkProduction();
    res.json(records);
  } catch (err) {
    res.status(500).send('Yo Error fetching milk production records', err);
  }
}

async function getMilkProductionById(req, res) {
  const { mpId } = req.params;
  try {
    const record = await milkModel.getMilkProductionById(mpId);
    res.json(record);
  } catch (err) {
    res.status(404).send('Milk production record not found');
  }
}

async function updateMilkProduction(req, res) {
  const { mpId } = req.params;
  try {
    await milkModel.updateMilkProduction(mpId, req.body);
    res.send('Milk production record updated successfully');
  } catch (err) {
    res.status(500).send('Error updating milk production record');
  }
}

async function deleteMilkProduction(req, res) {
  const { mpId } = req.params;
  try {
    await milkModel.deleteMilkProduction(mpId);
    res.send('Milk production record deleted successfully');
  } catch (err) {
    res.status(500).send('Error deleting milk production record');
  }
}

module.exports = {
  addMilkProduction,
  getAllMilkProduction,
  getMilkProductionById,
  updateMilkProduction,
  deleteMilkProduction,
};
