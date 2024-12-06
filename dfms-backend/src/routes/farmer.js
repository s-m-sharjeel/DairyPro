const express = require('express');
const router = express.Router();
const farmerController = require('../controllers/farmerController');

router.post('/login', farmerController.checkFarmerLogin); // Farmer login
router.post('/register', farmerController.addFarmer); // Farmer registration
router.get('/', farmerController.getAllFarmers); // Get all farmers
router.put('/:farmerID', farmerController.updateFarmer); // Update farmer by ID
router.delete('/:farmerID', farmerController.deleteFarmer); // Delete farmer by ID
router.put('/:farmerID/password', farmerController.updateFarmerPassword); // Update farmer password
router.put('/:farmerID/settings', farmerController.updateFarmerSettings);

module.exports = router;
