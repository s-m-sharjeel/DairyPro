import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Typography, Snackbar, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { addMilkProduction, getAllCows } from "../../services/api"; // Importing the API functions for adding milk production and fetching cows

const AddMilkProduction = () => {
  const [milkProductionData, setMilkProductionData] = useState({
    cowId: '',  // This will hold the cowID to be sent to the backend
    date: '',
    time: '',
    quantity: '',
    qualityTestResult: '',
  });

  const [cows, setCows] = useState([]); // For storing the list of cows
  const [cattleIdToCowId, setCattleIdToCowId] = useState({}); // For storing cattleID to cowID mapping
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Fetch all cows when the component mounts
  useEffect(() => {
    async function fetchCows() {
      try {
        const cows = await getAllCows(); // Get cow IDs from the backend
        setCows(cows); // Set cows in state

        // Create a mapping from cattleID to cowID
        const cattleIdMapping = {};
        cows.forEach(cow => {
          cattleIdMapping[cow.cattleID] = cow.cowID;  // Map cattleID to cowID
        });
        setCattleIdToCowId(cattleIdMapping);
      } catch (err) {
        console.error("Error fetching cows:", err);
        setError("Failed to fetch cows.");
      }
    }
    fetchCows();
  }, []);

  // Set system date and time for default values
  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0]; // Get YYYY-MM-DD
    const formattedTime = currentDate.toTimeString().split(' ')[0].slice(0, 5); // Get HH:mm

    setMilkProductionData((prevData) => ({
      ...prevData,
      date: formattedDate,
      time: formattedTime,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMilkProductionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate inputs
    if (!milkProductionData.cowId || !milkProductionData.date || !milkProductionData.time || !milkProductionData.quantity || !milkProductionData.qualityTestResult) {
      setError("All fields are required.");
      return;
    }
  
    // Validate quantity: it should be greater than 0
    const quantity = parseFloat(milkProductionData.quantity);
    if (quantity <= 0) {
      setError("Quantity must be greater than 0.");
      return;
    }
  
    // Validate quality test result: it should be between 0 and 10
    const qualityTestResult = parseFloat(milkProductionData.qualityTestResult);
    if (qualityTestResult < 0 || qualityTestResult > 10) {
      setError("Quality test result must be between 0 and 10.");
      return;
    }
  
    // Get the cowID based on the selected cattleID
    const cowId = cattleIdToCowId[milkProductionData.cowId];
  
    if (!cowId) {
      setError("Invalid cattle ID.");
      return;
    }
  
    // Format the data to match the backend JSON format
    const formattedData = {
      cowID: cowId,  // Use the cowID obtained from the mapping
      date: milkProductionData.date,
      time: `${milkProductionData.date}T${milkProductionData.time}:00`, // Combine date and time to match the format
      quantity: quantity,
      qualityTestResult: qualityTestResult,
    };
  
    try {
      const response = await addMilkProduction(formattedData); // Use the API function to post data
  
      // If the request is successful, show a success message
      setSuccess(true);
  
      // Redirect after success
      setTimeout(() => navigate('/milk-production-list'), 2000);
    } catch (err) {
      console.error('Error adding milk production:', err.message);
      setError("Failed to add milk production.");
    }
  };

  return (
    <div className="add-milk-production-container">
      <Typography variant="h4">Add Milk Production</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Cow Dropdown */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="cow-id-label">Cattle ID</InputLabel>
              <Select
                labelId="cow-id-label"
                name="cowId"
                value={milkProductionData.cowId}
                onChange={handleChange}
                fullWidth
              >
                {cows.map((cow, index) => (
                  <MenuItem key={index} value={cow.cattleID}> {/* Use cow.cattleID here */}
                    {cow.cattleID} {/* Display cattleID */}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Date Input */}
          <Grid item xs={12}>
            <TextField
              label="Date"
              name="date"
              type="date"
              value={milkProductionData.date}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* Time Input */}
          <Grid item xs={12}>
            <TextField
              label="Time"
              name="time"
              type="time"
              value={milkProductionData.time}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          {/* Quantity Input */}
          <Grid item xs={12}>
            <TextField
              label="Quantity (L)"
              name="quantity"
              type="number"
              value={milkProductionData.quantity}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Quality Test Result Input */}
          <Grid item xs={12}>
            <TextField
              label="Quality Test Result"
              name="qualityTestResult"
              type="number"
              value={milkProductionData.qualityTestResult}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>

        <div style={{ marginTop: "20px" }}>
          <Button type="submit" variant="contained">Add Milk Production</Button>
        </div>
      </form>

      <Snackbar open={error} autoHideDuration={6000} onClose={() => setError("")}>
        <Alert onClose={() => setError("")} severity="error">{error}</Alert>
      </Snackbar>
      <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity="success">Milk production added successfully!</Alert>
      </Snackbar>
    </div>
  );
};

export default AddMilkProduction;
