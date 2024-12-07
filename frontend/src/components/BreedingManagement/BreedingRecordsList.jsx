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

const BRList = () => {
  const [BRData, setBRData] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);  // For edit form
  const [selectedBRID, setSelectedBRID] = useState(null);
  const [editBR, setEditBR] = useState({
    cowID: '',
    bullID: '',
    offspringID: '',
    date: ''
  });

  // Fetch BR records from API
  const fetchBRData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3001/api/breedingRecords");
      setBRData(response.data);
    } catch (error) {
      console.error("Error fetching BR data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Edit button click
  const handleEditBR = (BR) => {
    setEditBR({
      cowID: BR.cowID,
      bullID: BR.bullID,
      offspringID: BR.offspringID,
      date: BR.date
    });
    setSelectedBRID(BR.BRID);
    setOpenEditDialog(true);
  };

  // Handle the update action
  const handleUpdateBR = async () => {
    try {
      await axios.put(`http://localhost:3001/api/breedingRecords/${selectedBRID}`, editBR);
      fetchBRData();  // Refresh the BR data after the update
      setOpenEditDialog(false); // Close the edit dialog
    } catch (error) {
      console.error("Error updating BR:", error);
    }
  };

  const handleSearch = () => {
    if (!searchDate) {
      fetchBRData();
      return;
    }
    const filteredData = BRData.filter((record) => record.date === searchDate);
    setBRData(filteredData);
  };

  // Handle Delete BR
  const handleDeleteBR = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/breedingRecords/${selectedBRID}`);
      fetchBRData();  // Refresh the BR data after deletion
      setOpenDialog(false); // Close the delete confirmation dialog
    } catch (error) {
      console.error("Error deleting BR:", error);
    }
  };

  useEffect(() => {
    fetchBRData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Breeding Records
      </Typography>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      <TextField
          label="Search by Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          variant="outlined"
          size="small"
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
        <Button variant="outlined" color="secondary" onClick={fetchBRData}>
          Reset
        </Button>
        <Button component={Link} to="/add-breeding-record" variant="contained" color="primary">
          Add
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">BR ID</TableCell>
              <TableCell align="center">Cow ID</TableCell>
              <TableCell align="center">Bull ID</TableCell>
              <TableCell align="center">Offspring ID</TableCell>
              <TableCell align="center">Date</TableCell>
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
            ) : BRData.length > 0 ? (
              BRData.map((record) => (
                <TableRow key={record.BRID}>
                  <TableCell align="center">{record.BRID}</TableCell>
                  <TableCell align="center">{record.cowID}</TableCell>
                  <TableCell align="center">{record.bullID}</TableCell>
                  <TableCell align="center">{record.offspringID}</TableCell>
                  <TableCell align="center">{record.date}</TableCell>
                  <TableCell align="center">
                    {/* Edit Button */}
                    <IconButton
                      color="primary"
                      onClick={() => handleEditBR(record)}
                    >
                      <EditIcon />
                    </IconButton>
                    {/* Delete Button */}
                    <IconButton
                      color="secondary"
                      onClick={() => {
                        setSelectedBRID(record.BRID);
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

      {/* Edit BR Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Breeding Record</DialogTitle>
        <DialogContent>
          <TextField
            label="Cow ID"
            type="number"
            fullWidth
            value={editBR.cowID}
            onChange={(e) => setEditBR({ ...editBR, cowID: e.target.value })}
            margin="dense"
          />
          <TextField
            label="Bull ID"
            type="number"
            fullWidth
            value={editBR.bullID}
            onChange={(e) => setEditBR({ ...editBR, bullID: e.target.value })}
            margin="dense"
          />
          <TextField
            label="Offspring ID"
            type="number"
            fullWidth
            value={editBR.offspringID}
            onChange={(e) => setEditBR({ ...editBR, offspringID: e.target.value })}
            margin="dense"
          />
          <TextField
            label="Date"
            type="date"
            fullWidth
            value={editBR.date}
            onChange={(e) => setEditBR({ ...editBR, date: e.target.value })}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateBR} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Delete BR</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this BR record?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteBR}
            color="secondary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BRList;
