import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
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
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"; // For delete icon
import EditIcon from "@mui/icons-material/Edit";  // For edit icon

const FeedList = () => {
  const [feedData, setFeedData] = useState([]);
  const [searchType, setSearchType] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);  // For edit form
  const [selectedFeedID, setSelectedFeedID] = useState(null);
  const [editFeed, setEditFeed] = useState({
    type: "",
    quantity: "",
    supplier: "",
    cost: "",
  });

  // Fetch feed records from API
  const fetchFeedData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3001/api/feed"); // Replace with your API endpoint
      setFeedData(response.data);
    } catch (error) {
      console.error("Error fetching feed data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Edit button click
  const handleEditFeed = (feed) => {
    setEditFeed({
      type: feed.type,
      quantity: feed.quantity,
      supplier: feed.supplier,
      cost: feed.cost
    });
    setSelectedFeedID(feed.feedID);
    setOpenEditDialog(true);
  };

  const handleUpdateFeed = async () => {
    try {
      await axios.put(`http://localhost:3001/api/feed/${selectedFeedID}`, editFeed);
      fetchFeedData();  // Refresh the cattle data after the update
      setOpenEditDialog(false); // Close the edit dialog
    } catch (error) {
      console.error("Error updating feed:", error);
    }
  };

  // Filter cattle records by type or breed
  const handleSearch = () => {
    if (!searchType) {
      fetchFeedData();
      return;
    }

    const filteredData = feedData.filter(
      (record) =>
        record.type.toLowerCase().includes(searchType.toLowerCase()) ||
        record.breed.toLowerCase().includes(searchType.toLowerCase())
    );
    setFeedData(filteredData);
    
  };

  // Handle Delete button click
  const handleDeleteFeed = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/feed/${selectedFeedID}`);
      fetchFeedData(); // Refresh the feed data after deletion
      setOpenDialog(false); // Close the delete confirmation dialog
    } catch (error) {
      console.error("Error deleting feed:", error);
    }
  };

  useEffect(() => {
    fetchFeedData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Feed Records
      </Typography>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <TextField
          label="Search by Type or Supplier"
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
        <Button component={Link} to="/add-feed-inventory" variant="contained" color="primary">
          Add
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
              <TableCell align="center">Cost (per kg)</TableCell>
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
              feedData.map((record) => (
                <TableRow key={record.FeedID}>
                  <TableCell align="center">{record.feedID}</TableCell>
                  <TableCell align="center">{record.type}</TableCell>
                  <TableCell align="center">{record.quantity}</TableCell>
                  <TableCell align="center">{record.supplier}</TableCell>
                  <TableCell align="center">{record.cost}</TableCell>
                  <TableCell align="center">
                    {/* Edit Button */}
                    <IconButton
                      color="primary"
                      onClick={() => handleEditFeed(record)}
                    >
                      <EditIcon />
                    </IconButton>
                    {/* Delete Button */}
                    <IconButton
                      color="secondary"
                      onClick={() => {
                        setSelectedFeedID(record.feedID);
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
                <TableCell colSpan={6} align="center">
                  No records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Feed Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Feed</DialogTitle>
        <DialogContent>
          <TextField
            label="Type"
            fullWidth
            value={editFeed.type}
            onChange={(e) => setEditFeed({ ...editFeed, type: e.target.value })}
            margin="dense"
          />
          <TextField
            label="Quantity"
            fullWidth
            value={editFeed.breed}
            onChange={(e) => setEditFeed({ ...editFeed, quantity: e.target.value })}
            margin="dense"
          />
          <TextField
            label="Supplier"
            type="number"
            fullWidth
            value={editFeed.supplier}
            onChange={(e) => setEditFeed({ ...editFeed, age: e.target.value })}
            margin="dense"
          />
          <TextField
            label="Cost"
            type="number"
            fullWidth
            value={editFeed.cost}
            onChange={(e) => setEditFeed({ ...editFeed, weight: e.target.value })}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleUpdateFeed} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Delete Feed</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this feed record?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteFeed}
            color="secondary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FeedList;
