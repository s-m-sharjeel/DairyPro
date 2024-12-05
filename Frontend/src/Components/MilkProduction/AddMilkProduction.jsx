import React, { useState } from 'react';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Grid, Typography } from '@mui/material';
import { useMutation } from 'react-query';
import axios from "../../services/api"; // Make sure this is correctly set up
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory

const AddCattle = () => {
  const [cattleData, setCattleData] = useState({
    type: '',
    breed: '',
    age: '',
    weight: '',
    feed: '',
    feedConsumption: '',
  });

  const navigate = useNavigate(); // Replace useHistory with useNavigate

  // Define the addCattle function here
  const addCattle = async (cattleData) => {
    try {
      const response = await axios.post("/cattle", cattleData); // Make sure the endpoint is correct
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to add cattle");
    }
  };

  const { mutate: addNewCattle, isLoading, isError, error } = useMutation(addCattle, {
    onSuccess: () => {
      // On success, redirect or show a success message
      navigate('/cattle'); // Use navigate to redirect to cattle list page
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCattleData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewCattle(cattleData);
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

        {isError && <Typography color="error">{error.message}</Typography>}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
          sx={{ marginTop: '20px' }}
        >
          {isLoading ? 'Adding...' : 'Add Cattle'}
        </Button>
      </form>
    </div>
  );
};

export default AddCattle;
