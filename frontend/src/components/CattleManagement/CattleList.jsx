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
import { Link } from 'react-router-dom';
import DeleteIcon from "@mui/icons-material/Delete";  // For delete icon
import EditIcon from "@mui/icons-material/Edit";  // For edit icon

const CattleList = () => {
  const [cattleData, setCattleData] = useState([]);
  const [searchType, setSearchType] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);  // For edit form
  const [selectedCattleID, setSelectedCattleID] = useState(null);
  const [editCattle, setEditCattle] = useState({
    type: '',
    breed: '',
    age: '',
    weight: '',
    feed: '',
    feedConsumption: ''
  });

  // Fetch cattle records from API
  const fetchCattleData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3001/api/cattle");
      setCattleData(response.data);
    } catch (error) {
      console.error("Error fetching cattle data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Edit button click
  const handleEditCattle = (cattle) => {
    setEditCattle({
      breed: cattle.breed,
      age: cattle.age,
      weight: cattle.weight,
      feed: cattle.feed,
      feedConsumption: cattle.feedConsumption
    });
    setSelectedCattleID(cattle.cattleID);
    setOpenEditDialog(true);
  };

  // Handle the update action
  const handleUpdateCattle = async () => {
    try {
      await axios.put(`http://localhost:3001/api/cattle/${selectedCattleID}`, editCattle);
      fetchCattleData();  // Refresh the cattle data after the update
      setOpenEditDialog(false); // Close the edit dialog
    } catch (error) {
      console.error("Error updating cattle:", error);
    }
  };

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

  // Handle Delete Cattle
  const handleDeleteCattle = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/cattle/${selectedCattleID}`);
      fetchCattleData();  // Refresh the cattle data after deletion
      setOpenDialog(false); // Close the delete confirmation dialog
    } catch (error) {
      console.error("Error deleting cattle:", error);
    }
  };

  useEffect(() => {
    fetchCattleData();
  }, []);

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
        <Button component={Link} to="/add-cattle" variant="contained" color="primary">
          Add
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
              <TableCell align="center">Feed</TableCell>
              <TableCell align="center">Feed Consumption (kg)</TableCell>
              <TableCell align="center">Actions</TableCell> {/* For Edit and Delete buttons */}
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
                  <TableCell align="center">{record.feed}</TableCell>
                  <TableCell align="center">{record.feedConsumption || 'N/A'}</TableCell>
                  <TableCell align="center">
                    {/* Edit Button */}
                    <IconButton
                      color="primary"
                      onClick={() => handleEditCattle(record)}
                    >
                      <EditIcon />
                    </IconButton>
                    {/* Delete Button */}
                    <IconButton
                      color="secondary"
                      onClick={() => {
                        setSelectedCattleID(record.cattleID);
                        setOpenDialog(true);
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

      {/* Edit Cattle Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Cattle</DialogTitle>
        <DialogContent>
          <TextField
            label="Breed"
            fullWidth
            value={editCattle.breed}
            onChange={(e) => setEditCattle({ ...editCattle, breed: e.target.value })}
            margin="dense"
          />
          <TextField
            label="Age"
            type="number"
            fullWidth
            value={editCattle.age}
            onChange={(e) => setEditCattle({ ...editCattle, age: e.target.value })}
            margin="dense"
          />
          <TextField
            label="Weight"
            type="number"
            fullWidth
            value={editCattle.weight}
            onChange={(e) => setEditCattle({ ...editCattle, weight: e.target.value })}
            margin="dense"
          />
          <TextField
            label="Feed"
            fullWidth
            value={editCattle.feed}
            onChange={(e) => setEditCattle({ ...editCattle, feed: e.target.value })}
            margin="dense"
          />
          <TextField
            label="Feed Consumption"
            type="number"
            fullWidth
            value={editCattle.feedConsumption}
            onChange={(e) => setEditCattle({ ...editCattle, feedConsumption: e.target.value })}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateCattle} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

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
