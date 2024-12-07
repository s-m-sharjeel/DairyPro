const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/totalMilk', dashboardController.getTotalMilkProduced);
router.get('/avgQuality', dashboardController.getAverageQualityOfMilk);

module.exports = router;
