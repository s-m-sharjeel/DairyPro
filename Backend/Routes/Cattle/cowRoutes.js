const express = require("express");
const router = express.Router();
const cowController = require("../../Controllers/Cattle/cowController");

//http://localhost:3000/api/cows
router.post("/cows", cowController.addCow);
router.put("/cows/", cowController.updateLactationStatus);

module.exports = router;