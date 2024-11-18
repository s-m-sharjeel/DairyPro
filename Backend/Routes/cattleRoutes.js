const express = require("express");
const router = express.Router();
const cattleController = require("../Controllers/cattleController");

//http://localhost:3000/api/cattle
router.get("/cattle", cattleController.getAllCattle);
router.put("/cattle/", cattleController.updateCattle);
router.delete("/cattle/:id", cattleController.deleteCattle);

module.exports = router;