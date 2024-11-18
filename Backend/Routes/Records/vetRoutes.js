const express = require("express");
const router = express.Router();
const vetController = require("../../Controllers/Records/vetController");

//http://localhost:3000/api/vetRecords
router.get("/vetRecords", vetController.getAllVetRecords);
router.post("/vetRecords", vetController.addVetRecord);

module.exports = router;