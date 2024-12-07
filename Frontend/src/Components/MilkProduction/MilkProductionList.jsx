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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton
} from "@mui/material";

import { Link } from 'react-router-dom';
import DeleteIcon from "@mui/icons-material/Delete";  // For delete icon
import EditIcon from "@mui/icons-material/Edit";  // For edit icon

const MilkProductionList = () => {
  const [milkProductionData, setMilkProductionData] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [editRecord, setEditRecord] = useState(null); // Record being edited
  const [openDialog, setOpenDialog] = useState(false); // Dialog state

  // Fetch milk production records
  const fetchMilkProductionData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3001/api/milkproduction");
      setMilkProductionData(response.data);
    } catch (error) {
      console.error("Error fetching milk production data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMilkProductionData();
  }, []);

  // Filter records by search date
  const handleSearch = () => {
    if (!searchDate) {
      fetchMilkProductionData();
      return;
    }
    const filteredData = milkProductionData.filter((record) => record.date === searchDate);
    setMilkProductionData(filteredData);
  };

  // Open the dialog for editing
  const handleEdit = (record) => {
    setEditRecord({ ...record });
    setOpenDialog(true);
  };

  // Close the dialog
  const handleDialogClose = () => {
    setEditRecord(null);
    setOpenDialog(false);
  };

  // Handle input change in the dialog
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditRecord({ ...editRecord, [name]: value });
  };

  // Update the record
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3001/api/milkproduction/${editRecord.mpId}`, editRecord);
      fetchMilkProductionData();
      handleDialogClose();
    } catch (error) {
      console.error("Error updating record:", error);
    }
  };

  // Delete the record
  const handleDelete = async (mpId) => {
    console.log('Deleting record with mpId:', mpId); // Debug log
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await axios.delete(`http://localhost:3001/api/milkproduction/${mpId}`);
      setMilkProductionData((prevData) =>
        prevData.filter((record) => record.mpId !== mpId)
      );
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  // Get quality color
  // const getQualityColor = (quality) => {
  //   if (quality >= 0 && quality <= 3.33) return "#FF6666";
  //   if (quality >= 3.33 && quality <= 6.66) return "#FFFACD";
  //   if (quality >= 6.66 && quality <= 10) return "#B2FF66";
  //   return "transparent";
  // };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Milk Production Records
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
        <Button variant="outlined" color="secondary" onClick={fetchMilkProductionData}>
          Reset
        </Button>
        <Button component={Link} to="/add-milk-production" variant="contained" color="primary">
          Add
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell align="center">MP ID</TableCell> */}
              <TableCell align="center">Cow ID</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Time</TableCell>
              <TableCell align="center">Quantity (L)</TableCell>
              <TableCell align="center">Quality Test Result</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : milkProductionData.length > 0 ? (
              milkProductionData.map((record) => (
                <TableRow key={record.mpId}>
                  {/* <TableCell align="center">{record.mpId}</TableCell> */}
                  <TableCell align="center">{record.cowId}</TableCell>
                  <TableCell align="center">{record.date}</TableCell>
                  <TableCell align="center">{record.time}</TableCell>
                  <TableCell align="center">{record.quantity}</TableCell>
                  <TableCell
                    align="center"
                    // style={{
                    //   color: getQualityColor(record.qualityTestResult)
                    // }}
                  >
                    {record.qualityTestResult}
                  </TableCell>
                  <TableCell align="center">
                    {/* Edit Button */}
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(record)}
                    >
                      <EditIcon />
                    </IconButton>
                    {/* Delete Button */}
                    <IconButton
                      color="secondary"
                      onClick={() => {
                        handleDelete(record.mpId)
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      {editRecord && (
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>Edit Milk Production Record</DialogTitle>
          <DialogContent>
            <TextField
              label="Cow ID"
              name="cowId"
              value={editRecord.cowId}
              onChange={handleInputChange}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Date"
              name="date"
              value={editRecord.date}
              onChange={handleInputChange}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Time"
              name="time"
              value={editRecord.time}
              onChange={handleInputChange}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Quantity"
              name="quantity"
              value={editRecord.quantity}
              onChange={handleInputChange}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Quality Test Result"
              name="qualityTestResult"
              value={editRecord.qualityTestResult}
              onChange={handleInputChange}
              fullWidth
              margin="dense"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleUpdate} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default MilkProductionList;
