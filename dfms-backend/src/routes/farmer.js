const express = require('express');
const router = express.Router();
const farmerController = require('../controllers/farmerController');
// Login route - dapp.use(express.json());efine this before the dynamic ID route
router.post('/login', async (req, res) => {
    // Log the request body directly (for debugging)
    console.log('Request body:', req.body);

    // Bypass all validations and destructure the email and password
    const { email, password } = req.body;

    // Log the email and password before responding (for testing purposes)
    console.log('Email:', email, ' Password:', password);

    // Just for testing: send them back in the response
    res.status(200).json({ success: true, email, password });
});


router.get('/login', farmerController.getAllFarmers);

// POST - Create Farmer
router.post('/', farmerController.addFarmer);

// GET - Get all Farmers
router.get('/', farmerController.getAllFarmers);

// GET - Get Farmer by ID
//router.get('/:farmerID', farmerController.getFarmerById);

// PUT - Update Farmer by ID
router.put('/:farmerID', farmerController.updateFarmer);

// DELETE - Delete Farmer by ID
router.delete('/:farmerID', farmerController.deleteFarmer);

module.exports = router;
