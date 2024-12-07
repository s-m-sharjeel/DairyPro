const express = require('express');
const feedController = require('../controllers/feedController'); // Import feed controller
const router = express.Router();

// Add Feed (POST)
router.post('/', feedController.addFeed);

// Get All Feeds (GET)
router.get('/', feedController.getAllFeeds);

// Get Feed by ID (GET)
router.get('/:feedID', feedController.getFeedById);

// Update Feed (PUT)
router.put('/:feedID', feedController.updateFeed);

// Delete Feed (DELETE)
router.delete('/:feedID', feedController.deleteFeed);

module.exports = router;
