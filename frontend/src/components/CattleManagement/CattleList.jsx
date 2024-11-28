// src/components/CattleManagement/CattleList.jsx

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

const CattleList = () => {
  const [cattleData, setCattleData] = useState([]);
  const [searchType, setSearchType] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch cattle records from API
  const fetchCattleData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/cattle"); // Replace with actual endpoint
      setCattleData(response.data);
    } catch (error) {
      console.error("Error fetching cattle data:", error);
    } finally {
      setLoading(false);
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
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : cattleData.length > 0 ? (
              cattleData.map((record) => (
                <TableRow key={record.CattleID}>
                  <TableCell align="center">{record.CattleID}</TableCell>
                  <TableCell align="center">{record.type}</TableCell>
                  <TableCell align="center">{record.breed}</TableCell>
                  <TableCell align="center">{record.age}</TableCell>
                  <TableCell align="center">{record.weight}</TableCell>
                  <TableCell align="center">{record.feedConsumption}</TableCell>
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
    </div>
  );
};

export default CattleList;
