import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "../../services/api";

// haven't yet implemented backend for this
const AddMilkProduction = () => {
  const [cowId, setCowId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [quantity, setQuantity] = useState("");
  const [qualityTestResult, setQualityTestResult] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!cowId || !date || !time || !quantity || !qualityTestResult) {
      setError("All fields are required");
      return;
    }

    try {
      // API call to add milk production record
      const response = await axios.post("/milkProduction", {
        cowId,
        date,
        time,
        quantity: parseFloat(quantity),
        qualityTestResult: parseFloat(qualityTestResult),
      });

      if (response.status === 201) {
        setSuccess(true);
        setCowId("");
        setDate("");
        setTime("");
        setQuantity("");
        setQualityTestResult("");
        setError("");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        Add Milk Production
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="cowId-label">Cow ID</InputLabel>
              <Select
                labelId="cowId-label"
                value={cowId}
                onChange={(e) => setCowId(e.target.value)}
                label="Cow ID"
              >
                {/* Replace with dynamic list of cows */}
                <MenuItem value={1}>Cow 1</MenuItem>
                <MenuItem value={2}>Cow 2</MenuItem>
                <MenuItem value={3}>Cow 3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Date"
              type="date"
              fullWidth
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Time"
              type="time"
              fullWidth
              value={time}
              onChange={(e) => setTime(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Quantity (L)"
              type="number"
              fullWidth
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              inputProps={{ min: 0, step: 0.1 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Quality Test Result"
              type="number"
              fullWidth
              value={qualityTestResult}
              onChange={(e) => setQualityTestResult(e.target.value)}
              inputProps={{ min: 0, max: 100, step: 0.1 }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Record
            </Button>
          </Grid>
        </Grid>
      </form>
      {success && (
        <Snackbar open autoHideDuration={3000} onClose={() => setSuccess(false)}>
          <Alert severity="success" sx={{ width: "100%" }}>
            Milk production record added successfully!
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
    </Box>
  );
};

export default AddMilkProduction;
