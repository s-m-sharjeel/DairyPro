// src/components/MilkProduction/MilkProductionList.jsx

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
} from "@mui/material";

const MilkProductionList = () => {
  const [milkProductionData, setMilkProductionData] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch milk production records
  const fetchMilkProductionData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/milk-production"); // Replace with actual endpoint
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

    const filteredData = milkProductionData.filter(
      (record) => record.date === searchDate
    );
    setMilkProductionData(filteredData);
  };

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
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Cow ID</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Time</TableCell>
              <TableCell align="center">Quantity (L)</TableCell>
              <TableCell align="center">Quality Test Result</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : milkProductionData.length > 0 ? (
              milkProductionData.map((record) => (
                <TableRow key={record.MPID}>
                  <TableCell align="center">{record.cowID}</TableCell>
                  <TableCell align="center">{record.date}</TableCell>
                  <TableCell align="center">{record.time}</TableCell>
                  <TableCell align="center">{record.quantity}</TableCell>
                  <TableCell align="center">{record.qualityTestResult}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MilkProductionList;
