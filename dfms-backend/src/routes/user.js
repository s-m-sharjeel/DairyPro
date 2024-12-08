const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/login', userController.checkUserLogin); // Farmer login
router.post('/register', userController.addUser); // Farmer registration
router.get('/', userController.getAllUsers); // Get all farmers
router.put('/:userID', userController.updateUser); // Update farmer by ID
router.delete('/:userID', userController.deleteUser); // Delete farmer by ID
router.put('/:userID/password', userController.updateUserPassword); // Update farmer password
router.put('/:userID/settings', userController.updateUserSettings);

module.exports = router;
