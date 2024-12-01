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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const FeedInventoryList = () => {
  const [feedData, setFeedData] = useState([]);
  const [searchType, setSearchType] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingFeed, setEditingFeed] = useState(null);
  const [newFeedData, setNewFeedData] = useState({ quantity: "", cost: "" });

  // Fetch feed inventory data
  const fetchFeedData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/feedInventory");
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

    const filteredData = feedData.filter((feed) =>
      feed.type.toLowerCase().includes(searchType.toLowerCase())
    );
    setFeedData(filteredData);
  };

  // Handle update
  const handleUpdate = async (feedId) => {
    try {
      await axios.put(`/api/feedInventory/${feedId}`, newFeedData);
      fetchFeedData();
      setEditingFeed(null);
    } catch (error) {
      console.error("Error updating feed inventory:", error);
    }
  };

  // Handle delete
  const handleDelete = async (feedId) => {
    try {
      await axios.delete(`/api/feedInventory/${feedId}`);
      fetchFeedData();
    } catch (error) {
      console.error("Error deleting feed record:", error);
    }
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
            ) : feedData.length > 0 ? (
              feedData.map((feed) => (
                <TableRow key={feed.FeedID}>
                  <TableCell align="center">{feed.FeedID}</TableCell>
                  <TableCell align="center">{feed.type}</TableCell>
                  <TableCell align="center">
                    {editingFeed === feed.FeedID ? (
                      <TextField
                        size="small"
                        value={newFeedData.quantity}
                        onChange={(e) =>
                          setNewFeedData((prev) => ({
                            ...prev,
                            quantity: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      feed.quantity
                    )}
                  </TableCell>
                  <TableCell align="center">{feed.supplier}</TableCell>
                  <TableCell align="center">
                    {editingFeed === feed.FeedID ? (
                      <TextField
                        size="small"
                        value={newFeedData.cost}
                        onChange={(e) =>
                          setNewFeedData((prev) => ({
                            ...prev,
                            cost: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      feed.cost
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {editingFeed === feed.FeedID ? (
                      <>
                        <Button
                          onClick={() => handleUpdate(feed.FeedID)}
                          color="primary"
                        >
                          Save
                        </Button>
                        <Button
                          onClick={() => setEditingFeed(null)}
                          color="secondary"
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <IconButton
                          onClick={() => {
                            setEditingFeed(feed.FeedID);
                            setNewFeedData({
                              quantity: feed.quantity,
                              cost: feed.cost,
                            });
                          }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(feed.FeedID)}
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      </>
                    )}
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
    </div>
  );
};

export default FeedInventoryList;
