/**
 * Controller for bull-related operations
 */
const {
    newBull,
  } = require("../../Models/Cattle/bullModel");
  const db = require("../../config/db");

  /**
   * Add a new Bull
   * @param req - Request object
   * @param res - Response object
   */
  async function addBull(req, res) {
    try {
      await newBull(req.body);
      res.status(201).json({ message: "Bull added successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error adding Bull", error: err });
    }
  }

  module.exports = {
    addBull
  };



