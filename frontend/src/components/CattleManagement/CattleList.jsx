import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";  // For delete icon

const CattleList = () => {
  const [cattleData, setCattleData] = useState([]);
  const [searchType, setSearchType] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);  // Dialog to confirm delete
  const [selectedCattleID, setSelectedCattleID] = useState(null); // Store selected cattle ID to delete

  // Fetch cattle records from API
  const fetchCattleData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3001/api/cattle");
      console.log("Fetched data:", response.data);  // Check if the data is correct
      setCattleData(response.data);
    } catch (error) {
      console.error("Error fetching cattle data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete cattle
  const handleDeleteCattle = async () => {
    // Check if selectedCattleID is properly set
    if (!selectedCattleID) {
      console.error('Cattle ID is not set');
      return;
    }
  
    try {
      console.log(`Deleting cattle with ID: ${selectedCattleID}`);
      await axios.delete(`http://localhost:3001/api/cattle/${selectedCattleID}`);
      console.log("Cattle deleted successfully!");
      fetchCattleData();  // Refresh cattle list after deletion
      setOpenDialog(false); // Close confirmation dialog
    } catch (error) {
      console.error("Error deleting cattle:", error);
    }
  };
  

  useEffect(() => {
    fetchCattleData();
  }, []);

  // Filter cattle records by type or breed
  const handleSearch = () => {
    if (!searchType) {
      fetchCattleData();
      return;
    }

    const filteredData = cattleData.filter(
      (record) =>
        record.type.toLowerCase().includes(searchType.toLowerCase()) ||
        record.breed.toLowerCase().includes(searchType.toLowerCase())
    );
    setCattleData(filteredData);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Cattle Records
      </Typography>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <TextField
          label="Search by Type or Breed"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          variant="outlined"
          size="small"
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
        <Button variant="outlined" color="secondary" onClick={fetchCattleData}>
          Reset
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Cattle ID</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Breed</TableCell>
              <TableCell align="center">Age</TableCell>
              <TableCell align="center">Weight</TableCell>
              <TableCell align="center">Feed Consumption (kg)</TableCell>
              <TableCell align="center">Actions</TableCell> {/* For Delete Button */}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : cattleData.length > 0 ? (
              cattleData.map((record) => (
                <TableRow key={record.cattleID}>
                  <TableCell align="center">{record.cattleID}</TableCell>
                  <TableCell align="center">{record.type}</TableCell>
                  <TableCell align="center">{record.breed}</TableCell>
                  <TableCell align="center">{record.age}</TableCell>
                  <TableCell align="center">{record.weight}</TableCell>
                  <TableCell align="center">{record.feedConsumption || 'N/A'}</TableCell>
                  <TableCell align="center">
                    {/* Delete Button */}
                    <IconButton
                      color="secondary"
                      onClick={() => {
                        setSelectedCattleID(record.cattleID);
                        setOpenDialog(true); // Open dialog for confirmation
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Delete Cattle</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this cattle record?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteCattle}
            color="secondary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CattleList;
