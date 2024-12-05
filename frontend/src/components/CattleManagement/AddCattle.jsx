import React, { useState } from 'react';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Grid, Typography, Snackbar, Alert } from '@mui/material';
import axios from "../../services/api"; // Assuming axios is set up for API calls
import { useNavigate } from 'react-router-dom';

const AddCattle = () => {
  const [cattleData, setCattleData] = useState({
    type: '',
    breed: '',
    age: '',
    weight: '',
    feed: '',
    feedConsumption: '',
  });
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCattleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!cattleData.type || !cattleData.breed || !cattleData.age || !cattleData.weight || !cattleData.feed || !cattleData.feedConsumption) {
      setError("All fields are required.");
      return;
    }

    try {
      await axios.post("/api/cattle", cattleData);  // Assuming this endpoint exists
      setSuccess(true);
      setTimeout(() => navigate('/cattle-list'), 2000); // Redirect after success
    } catch (err) {
      console.error('Error adding cattle:', err.message);
      console.error(err.stack);
      throw err;
   }
   
  };

  return (
    <div className="add-cattle-container">
      <Typography variant="h4">Add Cattle</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Type"
              name="type"
              value={cattleData.type}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Breed"
              name="breed"
              value={cattleData.breed}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Age"
              name="age"
              type="number"
              value={cattleData.age}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Weight"
              name="weight"
              type="number"
              value={cattleData.weight}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Feed"
              name="feed"
              value={cattleData.feed}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Feed Consumption"
              name="feedConsumption"
              value={cattleData.feedConsumption}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>
        <div style={{ marginTop: "20px" }}>
          <Button type="submit" variant="contained">Add Cattle</Button>
        </div>
      </form>

      <Snackbar open={error} autoHideDuration={6000} onClose={() => setError("")}>
        <Alert onClose={() => setError("")} severity="error">{error}</Alert>
      </Snackbar>
      <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity="success">Cattle added successfully!</Alert>
      </Snackbar>
    </div>
  );
};

export default AddCattle;
