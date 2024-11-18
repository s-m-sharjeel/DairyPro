const express = require("express");
const router = express.Router();
const bullController = require("../../Controllers/Cattle/bullController");

//http://localhost:3000/api/bulls
router.post("/bulls", bullController.addBull);

module.exports = router;