const express = require("express");
const router = express.Router();
const cattleController = require("../Controllers/cattleController");

//http://localhost:3000/api/cattle
router.get("/cattle", cattleController.getAllcattle);
router.put("/cattle/", cattleController.updatecattle);
router.delete("/cattle/:id", cattleController.deletecattle);

module.exports = router;