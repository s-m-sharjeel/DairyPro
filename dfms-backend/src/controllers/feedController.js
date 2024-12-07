const feedModel = require('../models/feed'); // Import the feed model

// Add Feed (Create)
const addFeed = async (req, res) => {
    const { type, quantity, supplier, cost } = req.body;
  
    // Validate inputs
    if (!type || !quantity || !supplier || !cost) {
      return res.status(400).json({
        message: 'Please provide all required fields: type, quantity, supplier, and cost.',
      });
    }
  
    try {
      // Call model to add feed
      await feedModel.addFeed(type, quantity, supplier, cost);
  
      // Success response
      res.status(201).json({
        message: 'Feed added successfully!',
      });
    } catch (err) {
      console.error('Error adding feed:', err);
      res.status(500).json({
        message: 'Error adding feed. Please try again later.',
        error: err.message,
      });
    }
  };

// Get All Feeds (Read)
async function getAllFeeds(req, res) {
  try {
    const feeds = await feedModel.getAllFeeds();
    res.json(feeds);
  } catch (err) {
    console.error('Error fetching all feeds:', err);
    res.status(500).send('Error fetching feeds');
  }
}

// Get Feed by ID (Read)
async function getFeedById(req, res) {
  const { feedID } = req.params;
  try {
    const feed = await feedModel.getFeedById(feedID);
    res.json(feed);
  } catch (err) {
    console.error('Error fetching feed by ID:', err);
    res.status(500).send('Error fetching feed by ID');
  }
}

// Update Feed (Update)
async function updateFeed(req, res) {
  const { feedID } = req.params;
  const { type, quantity, supplier, cost } = req.body;
  try {
    await feedModel.updateFeed(feedID, type, quantity, supplier, cost);
    res.send('Feed updated successfully');
  } catch (err) {
    console.error('Error updating feed:', err);
    res.status(500).send('Error updating feed');
  }
}

// Delete Feed (Delete)
async function deleteFeed(req, res) {
  const { feedID } = req.params;
  try {
    await feedModel.deleteFeed(feedID);
    res.send('Feed deleted successfully');
  } catch (err) {
    console.error('Error deleting feed:', err);
    res.status(500).send('Error deleting feed');
  }
}

// Export functions
module.exports = {
  addFeed,
  getAllFeeds,
  getFeedById,
  updateFeed,
  deleteFeed
};
