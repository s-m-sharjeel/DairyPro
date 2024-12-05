const express = require('express');
const router = express.Router();
const breedingController = require('../controllers/breedingController');

// CRUD operations for BreedingRecords
router.post('/', breedingController.addBreedingRecord);
router.get('/', breedingController.getBreedingRecords);
router.get('/:brID', breedingController.getBreedingRecordById);
router.put('/:brID', breedingController.updateBreedingRecord);
router.delete('/:brID', breedingController.deleteBreedingRecord);

module.exports = router;
