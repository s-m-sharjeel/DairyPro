const express = require("express");
const { signup, signin } = require("../Controllers/authController");
const authMiddleware = require("../Middlewares/authMiddleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;
