const express = require('express');
const router = express.Router();
const cattleController = require('../controllers/cattleController');

// CRUD operations for Cattle
router.post('/', cattleController.addCattle);
router.get('/', cattleController.getAllCattle);
router.get('/:cattleID', cattleController.getCattleById);
router.put('/:cattleID', cattleController.updateCattle);
router.delete('/:cattleID', cattleController.deleteCattle);

module.exports = router;
