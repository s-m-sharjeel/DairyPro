const express = require('express');
const router = express.Router();
const cowController = require('../controllers/cowController');

// POST - Create Cow
router.post('/', cowController.addCow);

// GET - Get Cow by CattleID
router.get('/:cattleID', cowController.getCowById);
router.get('/', cowController.getAllCows);
// DELETE - Delete Cow by CattleID
router.delete('/:cattleID', cowController.deleteCow);

module.exports = router;
