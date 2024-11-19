const express = require("express");
const router = express.Router();
const milkController = require("../Controllers/milkController");

//http://localhost:3000/api/milkProduction
router.get("/milkProduction", milkController.getAllMilkProduction);
router.delete("/milkProduction/:id", milkController.deleteMilkProduction);

module.exports = router;