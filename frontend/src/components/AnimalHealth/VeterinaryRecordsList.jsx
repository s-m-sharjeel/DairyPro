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
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "../../services/api";

const VeterinaryRecordsList = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
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
      const response = await axios.get("localhost:3001/api/health");
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
    try {
      if (editRecord) {
        // Update existing record
        await axios.put(`localhost:3001/apo/health/${editRecord.vrid}`, formData);
        setRecords((prev) =>
          prev.map((record) =>
            record.vrid === editRecord.vrid ? { ...record, ...formData } : record
          )
        );
      } else {
        // Add new record
        const response = await axios.post("localhost:3001/apo/health/", formData);
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
      await axios.delete(`localhost:3001/apo/health/${vrid}`);
      setRecords((prevRecords) =>
        prevRecords.filter((record) => record.vrid !== vrid)
      );
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  const filteredRecords = records.filter(
    (record) =>
      record.cattleID.toString().includes(searchQuery) ||
      record.vetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.date.includes(searchQuery)
  );

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
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Veterinary Records
      </Typography>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        sx={{ marginBottom: 3 }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ marginBottom: 3 }}
        onClick={() => handleOpenDialog()}
      >
        Add New Record
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cattle ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Vet Name</TableCell>
              <TableCell>Symptoms</TableCell>
              <TableCell>Diagnosis</TableCell>
              <TableCell>Treatment</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRecords.map((record) => (
              <TableRow key={record.vrid}>
                <TableCell>{record.cattleID}</TableCell>
                <TableCell>{record.date}</TableCell>
                <TableCell>{record.time}</TableCell>
                <TableCell>{record.vetName}</TableCell>
                <TableCell>{record.symptoms}</TableCell>
                <TableCell>{record.diagnosis}</TableCell>
                <TableCell>{record.treatment}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenDialog(record)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteRecord(record.vrid)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Add/Edit */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>{editRecord ? "Edit Record" : "Add Record"}</DialogTitle>
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
          <TextField
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
          />
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
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VeterinaryRecordsList;
