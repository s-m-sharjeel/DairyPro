const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/totalMilk', dashboardController.getTotalMilkProduced);
router.get('/averageQuality', dashboardController.getAverageQualityOfMilk);
router.get('/topFeed', dashboardController.getMostConsumedFeed);

module.exports = router;
