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
      setError("All fields are required");
      return;
    }

    try {
      // API call to add cattle record
      const response = await axios.post("/cattle", {
        type: cattleData.type,
        breed: cattleData.breed,
        age: parseInt(cattleData.age),
        weight: parseFloat(cattleData.weight),
        feed: cattleData.feed,
        feedConsumption: parseFloat(cattleData.feedConsumption),
      });

      if (response.status === 201) {
        setSuccess(true);
        // Reset form fields
        setCattleData({
          type: '',
          breed: '',
          age: '',
          weight: '',
          feed: '',
          feedConsumption: '',
        });
        setError("");
        // Redirect to cattle list page
        navigate('/cattle');
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Add New Cattle
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Type (Cow/Bull/Offspring)"
              name="type"
              value={cattleData.type}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Breed"
              name="breed"
              value={cattleData.breed}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Age"
              name="age"
              type="number"
              value={cattleData.age}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Weight"
              name="weight"
              type="number"
              value={cattleData.weight}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Feed</InputLabel>
              <Select
                label="Feed"
                name="feed"
                value={cattleData.feed}
                onChange={handleChange}
                required
              >
                {/* Populate feed options dynamically (could come from the backend API) */}
                <MenuItem value="Feed1">Feed1</MenuItem>
                <MenuItem value="Feed2">Feed2</MenuItem>
                <MenuItem value="Feed3">Feed3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Feed Consumption"
              name="feedConsumption"
              type="number"
              value={cattleData.feedConsumption}
              onChange={handleChange}
              required
            />
          </Grid>
        </Grid>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: '20px' }}
        >
          Add Cattle
        </Button>
      </form>

      {/* Success and error messages */}
      {success && (
        <Snackbar open autoHideDuration={3000} onClose={() => setSuccess(false)}>
          <Alert severity="success" sx={{ width: "100%" }}>
            Cattle added successfully!
          </Alert>
        </Snackbar>
      )}

      {error && (
        <Snackbar open autoHideDuration={3000} onClose={() => setError("")}>
          <Alert severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default AddCattle;
