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

const FeedInventoryList = () => {
  const [feedData, setFeedData] = useState([]);
  const [searchType, setSearchType] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch feed inventory data
  const fetchFeedData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/feed-inventory"); // Replace with actual endpoint
      setFeedData(response.data);
    } catch (error) {
      console.error("Error fetching feed inventory data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedData();
  }, []);

  // Filter records by feed type
  const handleSearch = () => {
    if (!searchType) {
      fetchFeedData();
      return;
    }

    const filteredData = feedData.filter(
      (feed) => feed.type.toLowerCase().includes(searchType.toLowerCase())
    );
    setFeedData(filteredData);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Feed Inventory
      </Typography>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <TextField
          label="Search by Feed Type"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          variant="outlined"
          size="small"
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
        <Button variant="outlined" color="secondary" onClick={fetchFeedData}>
          Reset
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Feed ID</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Quantity (kg)</TableCell>
              <TableCell align="center">Supplier</TableCell>
              <TableCell align="center">Cost ($)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : feedData.length > 0 ? (
              feedData.map((feed) => (
                <TableRow key={feed.FeedID}>
                  <TableCell align="center">{feed.FeedID}</TableCell>
                  <TableCell align="center">{feed.type}</TableCell>
                  <TableCell align="center">{feed.quantity}</TableCell>
                  <TableCell align="center">{feed.supplier}</TableCell>
                  <TableCell align="center">{feed.cost}</TableCell>
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

export default FeedInventoryList;
