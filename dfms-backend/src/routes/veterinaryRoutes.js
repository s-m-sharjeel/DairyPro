const express = require('express');
const router = express.Router();
const veterinaryController = require('../controllers/veterinaryController');

// CRUD operations for VeterinaryRecords Table
router.post('/', veterinaryController.addVeterinaryRecord);
router.get('/', veterinaryController.getAllVeterinaryRecords);
router.get('/:vrid', veterinaryController.getVeterinaryRecordById);
router.put('/:vrid', veterinaryController.updateVeterinaryRecord);
router.delete('/:vrid', veterinaryController.deleteVeterinaryRecord);

module.exports = router;