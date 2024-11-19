/**
 * Controller for Feed-related operations
 */
const {
    listAllFeed,
    deleteFeedByID
  } = require("../Models/feedModel");
  
  /**
   * Get all Feed
   * @param req - Request object
   * @param res - Response object
   */
  async function getAllFeed(req, res) {
    try {
      // get all feed
      const mp = await listAllFeed();
  
      // send response with feed in json
      res.json({ data: feed });
    } catch (err) {
      res.status(500).json({ message: "Error fetching Feed", error: err });
    }
  }
  
  /**
   * Delete some Feed
   * @param req - Request object
   * @param res - Response object
   */
  async function deleteFeed(req, res) {
    try {
      const feed_ID = req.params.id; // feed_ID from the URL parameter
      const result = await deleteFeedByID(feed_ID);
  
      if (result.rowsAffected > 0) {
        res.json({ message: "Feed deleted successfully" });
      } else {
        res.status(404).json({ message: "Feed not found" });
      }
    } catch (err) {
      res.status(500).json({ message: "Error deleting Feed", error: err });
    }
  }
  
  module.exports = {
    getAllFeed,
    deleteFeed,
  };
  