const express = require('express');
const router = express.Router();
const bullController = require('../controllers/bullController');

// POST - Create Bull
router.post('/', bullController.addBull);

// GET - Get Bull by CattleID
router.get('/:cattleID', bullController.getBullById);

// DELETE - Delete Bull by CattleID
router.delete('/:cattleID', bullController.deleteBull);

module.exports = router;
