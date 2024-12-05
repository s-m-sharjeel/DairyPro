const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Middleware to parse JSON body
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Allow frontend at localhost:3000 to make requests
  methods: 'GET,POST,PUT,DELETE', // You can specify the allowed HTTP methods here
  allowedHeaders: 'Content-Type,Authorization', // Add headers you want to allow
}));

// Import route files
const cattleRoutes = require('./routes/cattle');
const breedingRoutes = require('./routes/breedingRecords');
const milkProductionRoutes = require('./routes/milkProduction');
const farmerRoutes = require('./routes/farmer');
const bullRoutes = require('./routes/bull');
const cowRoutes = require('./routes/cow');
const offspringRoutes = require('./routes/offspring');
const veterinaryRoutes = require('./routes/veterinaryRoutes');

// Use routes
app.use('/api/cattle', cattleRoutes);
app.use('/api/breedingrecords', breedingRoutes);
app.use('/api/milkproduction', milkProductionRoutes);
app.use('/api/farmer', farmerRoutes);
app.use('/api/bull', bullRoutes);
app.use('/api/cow', cowRoutes);
app.use('/api/offspring', offspringRoutes);
app.use('/api/health', veterinaryRoutes);
// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
