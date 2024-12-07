import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Typography, Snackbar, Alert } from '@mui/material';
// import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { addBR } from "../../services/api"; // Importing the API function for adding cattle

const AddBR = () => {
  const [BRData, setBRData] = useState({
    cowID: '',
    bullID: '',
    offspringID: '',
    date: ''
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // Set system date and time for default values
  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0]; // Get YYYY-MM-DD
    setBRData((prevData) => ({
      ...prevData,
      date: formattedDate
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBRData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!BRData.cowID || !BRData.bullID || !BRData.offspringID || !BRData.date) {
      setError("All fields are required.");
      return;
    }

    try {
      await addBR(BRData); // Use the API function to post data

      // If the request is successful, show a success message
      setSuccess(true);

      // Redirect after success
      setTimeout(() => navigate('/breeding-records'), 1000);
    } catch (err) {
      console.error('Error adding Breeding Record:', err.message);
      setError("Failed to add BR.");
    }
  };

  return (
    <div className="add-breeding-container">
      <Typography variant="h4">Add Breeding Record</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>

          {/* Inputs that are always shown */}
          <Grid item xs={12}>
            <TextField
              label="Cow ID"
              name="cowID"
              type="number"
              value={BRData.cowID}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Bull ID"
              name="bullID"
              type="number"
              value={BRData.bullID}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Offspring ID"
              name="offspringID"
              type="number"
              value={BRData.offspringID}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          {/* <Grid item xs={12}>
            <TextField
              label="Date"
              name="date"
              type="date"
              value={BRData.date}
              onChange={handleChange}
              fullWidth
            />
          </Grid> */}

          {/* Date Input */}
          <Grid item xs={12}>
            <TextField
              label="Date"
              name="date"
              type="date"
              value={BRData.date}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          
          {/* Conditional Inputs based on Type
          {BRData.type === 'Cow' && (
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Lactation Status</InputLabel>
                <Select
                  name="lactationStatus"
                  value={BRData.lactationStatus}
                  onChange={handleChange}
                >
                  <MenuItem value="Lactating">Lactating</MenuItem>
                  <MenuItem value="Dry">Dry</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          )}
          {BRData.type === 'Offspring' && (
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Sex</InputLabel>
                <Select
                  name="sex"
                  value={BRData.sex}
                  onChange={handleChange}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          )} */}
        </Grid>
        <div style={{ marginTop: "20px" }}>
          <Button type="submit" variant="contained">Add Breeding Record</Button>
        </div>
      </form>

      <Snackbar open={error} autoHideDuration={6000} onClose={() => setError("")}>
        <Alert onClose={() => setError("")} severity="error">{error}</Alert>
      </Snackbar>
      <Snackbar open={success} autoHideDuration={6000} onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity="success">Breeding Record added successfully!</Alert>
      </Snackbar>
    </div>
  );
};

export default AddBR;
