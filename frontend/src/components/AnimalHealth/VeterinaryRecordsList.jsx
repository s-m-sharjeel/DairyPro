import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from "@mui/material";
import axios from "../../services/api";

const VeterinaryRecordsList = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get("/veterinary-records"); // Replace with your actual endpoint
        setRecords(response.data);
      } catch (error) {
        console.error("Error fetching veterinary records:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

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
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRecords.map((record) => (
              <TableRow key={record.VRID}>
                <TableCell>{record.cattleID}</TableCell>
                <TableCell>{record.date}</TableCell>
                <TableCell>{record.time}</TableCell>
                <TableCell>{record.vetName}</TableCell>
                <TableCell>{record.symptoms}</TableCell>
                <TableCell>{record.diagnosis}</TableCell>
                <TableCell>{record.treatment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default VeterinaryRecordsList;
