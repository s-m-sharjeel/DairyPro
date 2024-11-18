const express=require("express");
const cors=require("cors");

const authMiddleware = require("./Middlewares/authMiddleware");
const authRoutes = require("./Routes/authRoutes");
const cattleRoutes = require("./Routes/cattleRoutes");
const feedRoutes = require("./Routes/feedRoutes");
const milkRoutes = require("./Routes/milkRoutes");

const bullRoutes = require("./Routes/Cattle/bullRoutes");
const cowRoutes = require("./Routes/Cattle/cowRoutes");
const offspringRoutes = require("./Routes/Cattle/offspringRoutes");
const breedRoutes = require("./Routes/Records/breedRoutes");
const vetRoutes = require("./Routes/Records/vetRoutes");

const db = require("./config/db");

require("dotenv").config();

const app = express();

// CORS configuration
// app.use(cors({
//   origin: process.env.origin, //  frontend domain
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
//   allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
//   credentials: true // Allow credentials like cookies
// }));

app.use(cors());
app.options('*', cors()); 

app.use(express.json());
  

// Routes
app.use("/api", cattleRoutes);
app.use("/api", feedRoutes);
app.use("/api", milkRoutes);

app.use("/api", bullRoutes);
app.use("/api", cowRoutes);
app.use("/api", offspringRoutes);
app.use("/api", breedRoutes);
app.use("/api", vetRoutes);

// Catch-all route to verify that the app is running
app.use("/", (req, res) => {
  res.json({ message: "App is running!" });
});

// Start Server and DB
const PORT = process.env.PORT || 5000;
db.initialize().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});