const express = require('express');
const router = express.Router();
const milkController = require('../controllers/milkProductionController');

// POST - Create Milk Production Record
router.post('/', milkController.addMilkProduction);

// GET - Get all Milk Production Records
router.get('/', milkController.getAllMilkProduction);

// GET - Get Milk Production Record by ID
router.get('/:mpId', milkController.getMilkProductionById);

// PUT - Update Milk Production Record by ID
router.put('/:mpId', milkController.updateMilkProduction);

// DELETE - Delete Milk Production Record by ID
router.delete('/:mpId', milkController.deleteMilkProduction);

module.exports = router;
