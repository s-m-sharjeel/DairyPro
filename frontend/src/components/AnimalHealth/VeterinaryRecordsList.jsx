import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Link } from 'react-router-dom';
import DeleteIcon from "@mui/icons-material/Delete";  // For delete icon
import EditIcon from "@mui/icons-material/Edit";  // For edit icon
import axios from "../../services/api";

const VeterinaryRecordsList = () => {
  const [records, setRecords] = useState([]);
  const [searchType, setSearchType] = useState("");
  const [loading, setLoading] = useState(true);
  const [editRecord, setEditRecord] = useState(null); // For editing a record

  const [formData, setFormData] = useState({
    cattleID: "",
    date: "",
    time: "",
    symptoms: "",
    diagnosis: "",
    treatment: "",
    vetName: "",
  });

  const [open, setOpen] = useState(false); // Dialog visibility

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3001/api/health");
      console.log('wow', response);
      setRecords(response.data);
    } catch (error) {
      console.error("Error fetching veterinary records:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (record) => {
    if (record) {
      setEditRecord(record);
      setFormData(record);
    }
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setEditRecord(null);
    setFormData({
      cattleID: "",
      date: "",
      time: "",
      symptoms: "",
      diagnosis: "",
      treatment: "",
      vetName: "",
    });
    setOpen(false);
  };

  const handleSubmit = async () => {
    console.log(formData); // Check the formData here to ensure symptoms is populated
    try {
      if (editRecord) {
        // Update existing record
        await axios.put(`http://localhost:3001/api/health/${editRecord.vrid}`, formData);
        setRecords((prev) =>
          prev.map((record) =>
            record.vrid === editRecord.vrid ? { ...record, ...formData } : record
          )
        );
      } else {
        // Add new record
        const response = await axios.post("http://localhost:3001/api/health/", formData);
        setRecords((prev) => [...prev, response.data]);
      }
      handleCloseDialog();
    } catch (error) {
      console.error("Error saving record:", error);
    }
  };
  

  const deleteRecord = async (vrid) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await axios.delete(`http://localhost:3001/api/health/${vrid}`);
      setRecords((prevRecords) =>
        prevRecords.filter((record) => record.vrid !== vrid)
      );
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  // Function to format date and time
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // e.g., 12/05/2024
  };

  const formatTime = (timeString) => {
    const time = new Date(timeString);
    return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); // e.g., 7:00 PM
  };

  const filteredData = records.filter(
    (record) =>
      record.diagnosis.toLowerCase().includes(searchType.toLowerCase()) ||
      record.symptoms.toLowerCase().includes(searchType.toLowerCase())
  );

  const handleSearch = () => {
    if (!searchType) {
      fetchRecords();
      return;
    }
    setRecords(filteredData);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
      
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Veterinary Records
      </Typography>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <TextField
          label="Search by Disease or Symptoms"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          variant="outlined"
          size="small"
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
        <Button variant="outlined" color="secondary" onClick={fetchRecords}>
          Reset
        </Button>
        <Button component={Link} to="/add-veterinary-record" variant="contained" color="primary">
          Add
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Cattle ID</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Time</TableCell>
              <TableCell align="center">Vet Name</TableCell>
              <TableCell align="center">Symptoms</TableCell>
              <TableCell align="center">Diagnosis</TableCell>
              <TableCell align="center">Treatment</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((record) => (
              <TableRow key={record.vrid}>
                <TableCell align="center">{record.cattleID}</TableCell>
                <TableCell align="center">{formatDate(record.date)}</TableCell>
                <TableCell align="center">{formatTime(record.time)}</TableCell>
                <TableCell align="center">{record.vetName}</TableCell>
                <TableCell align="center">{record.symptoms}</TableCell>
                <TableCell align="center">{record.diagnosis}</TableCell>
                <TableCell align="center">{record.treatment}</TableCell>
                <TableCell align="center">
                  {/* Edit Button */}
                  <IconButton
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenDialog(record)}
                    >
                      <EditIcon />
                    </IconButton>
                    {/* Delete Button */}
                    <IconButton
                      variant="contained"
                      color="secondary"
                      onClick={() => deleteRecord(record.vrid)}
                    >
                      <DeleteIcon />
                    </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Add/Edit */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Edit Veterinary Record</DialogTitle>
        <DialogContent>
          <TextField
            label="Cattle ID"
            value={formData.cattleID}
            onChange={(e) =>
              setFormData({ ...formData, cattleID: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          {/* <TextField
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) =>
              setFormData({ ...formData, date: e.target.value })
            }
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Time"
            type="time"
            value={formData.time}
            onChange={(e) =>
              setFormData({ ...formData, time: e.target.value })
            }
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          /> */}
          <TextField
            label="Vet Name"
            value={formData.vetName}
            onChange={(e) =>
              setFormData({ ...formData, vetName: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Symptoms"
            value={formData.symptoms}
            onChange={(e) =>
              setFormData({ ...formData, symptoms: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Diagnosis"
            value={formData.diagnosis}
            onChange={(e) =>
              setFormData({ ...formData, diagnosis: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Treatment"
            value={formData.treatment}
            onChange={(e) =>
              setFormData({ ...formData, treatment: e.target.value })
            }
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default VeterinaryRecordsList;
