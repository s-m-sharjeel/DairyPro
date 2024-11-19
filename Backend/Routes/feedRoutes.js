const express = require("express");
const router = express.Router();
const feedController = require("../Controllers/feedController");

//http://localhost:3000/api/feed
router.get("/feed", feedController.getAllFeed);
router.delete("/feed/:id", feedController.deleteFeed);

module.exports = router;