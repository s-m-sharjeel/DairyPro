import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  CircularProgress,
} from "@mui/material";

const AddFeedInventory = () => {
  const [feedType, setFeedType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [supplier, setSupplier] = useState("");
  const [cost, setCost] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!feedType || !quantity || !supplier || !cost) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError("");
    
    const newFeedInventory = {
      type: feedType,
      quantity: parseFloat(quantity),
      supplier: supplier,
      cost: parseFloat(cost),
    };

    try {
      await axios.post("http://localhost:3001/api/feed", newFeedInventory); // Replace with actual endpoint
      setSuccess(true);
      setFeedType("");
      setQuantity("");
      setSupplier("");
      setCost("");
      // Redirect after success
      setTimeout(() => navigate('/feed-inventory'), 1000);
    } catch (err) {
      setError("Error adding feed inventory.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Add Feed Inventory
      </Typography>

      {success && (
        <Typography color="primary" variant="body1" gutterBottom>
          Feed inventory added successfully!
        </Typography>
      )}

      {error && (
        <Typography color="error" variant="body1" gutterBottom>
          {error}
        </Typography>
      )}

      <Paper style={{ padding: "20px", marginTop: "20px" }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Feed Type"
                variant="outlined"
                fullWidth
                value={feedType}
                onChange={(e) => setFeedType(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Quantity"
                variant="outlined"
                fullWidth
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Supplier"
                variant="outlined"
                fullWidth
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Cost"
                variant="outlined"
                fullWidth
                type="number"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                required
              />
            </Grid>
          </Grid>

          <div style={{ marginTop: "20px" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Add Feed"}
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default AddFeedInventory;
