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

const BreedingRecordsList = () => {
  const [breedingRecords, setBreedingRecords] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch breeding records
  const fetchBreedingRecords = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/breeding-records"); // Replace with actual endpoint
      setBreedingRecords(response.data);
    } catch (error) {
      console.error("Error fetching breeding records:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBreedingRecords();
  }, []);

  // Filter records by search date
  const handleSearch = () => {
    if (!searchDate) {
      fetchBreedingRecords();
      return;
    }

    const filteredData = breedingRecords.filter(
      (record) => record.date === searchDate
    );
    setBreedingRecords(filteredData);
  };

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
        <Button variant="outlined" color="secondary" onClick={fetchBreedingRecords}>
          Reset
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Cow ID</TableCell>
              <TableCell align="center">Bull ID</TableCell>
              <TableCell align="center">Offspring ID</TableCell>
              <TableCell align="center">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : breedingRecords.length > 0 ? (
              breedingRecords.map((record) => (
                <TableRow key={record.BRID}>
                  <TableCell align="center">{record.cowID}</TableCell>
                  <TableCell align="center">{record.bullID}</TableCell>
                  <TableCell align="center">{record.offspringID}</TableCell>
                  <TableCell align="center">{record.date}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
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

export default BreedingRecordsList;
