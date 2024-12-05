const express = require('express');
const router = express.Router();
const offspringController = require('../controllers/offspringController');

// POST - Create Offspring
router.post('/', offspringController.addOffspring);

// GET - Get Offspring by CattleID
router.get('/:cattleID', offspringController.getOffspringById);

// DELETE - Delete Offspring by CattleID
router.delete('/:cattleID', offspringController.deleteOffspring);

module.exports = router;
