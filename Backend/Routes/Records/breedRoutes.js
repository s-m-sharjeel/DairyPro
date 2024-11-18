const express = require("express");
const router = express.Router();
const breedController = require("../../Controllers/Records/breedController");

//http://localhost:3000/api/breedingRecords
router.get("/breedingRecords", breedController.getAllBreedingRecords);
router.post("/breedingRecords", breedController.addBreedingRecord);

module.exports = router;