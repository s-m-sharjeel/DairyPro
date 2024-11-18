/**
 * Controller for cow-related operations
 */
const {
    newCow,
    updateLactationStatusByID
  } = require("../../Models/Cattle/cattleModel");
  const db = require("../../config/db");
  
  /**
   * Add a new Cow
   * @param req - Request object
   * @param res - Response object
   */
  async function addCow(req, res) {
    try {
      await newCow(req.body);
      res.status(201).json({ message: "Cow added successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error adding Cow", error: err });
    }
  }

  /**
   * Update Lactation Status of Cow
   * @param req - Request object
   * @param res - Response object
   */
  async function updateLactationStatus(req, res) {
    try {
      await updateLactationStatusByID(req.body);
      res.status(201).json({ message: "Cow Lactation Status updated successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error updating Cow Lactation Status", error: err });
    }
  }

  module.exports = {
    addCow,
    updateLactationStatus
  };