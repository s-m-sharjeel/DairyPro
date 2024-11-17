const express = require("express");
const router = express.Router();
const offspringController = require("../../Controllers/Cattle/offspringController");

//http://localhost:3000/api/offsprings
router.post("/offsprings", offspringController.addOffspring);
router.put("/offsprings/", offspringController.growOffspring);

module.exports = router;