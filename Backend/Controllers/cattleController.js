/**
 * Controller for cattle-related operations
 */
const {
    listAllCattle,
    updateCattleByID,
    deleteCattleByID,
  } = require("../models/cattleModel");
  const db = require("../config/db");
  
  /**
   * Get all cattle
   * @param req - Request object
   * @param res - Response object
   */
  async function getAllCattle(req, res) {
    try {
      // get all cattle
      const cattle = await listAllCattle();
  
      // send response with cattle in json
      res.json({ data: cattle });
    } catch (err) {
      res.status(500).json({ message: "Error fetching cattle", error: err });
    }
  }
  
  /**
   * Update some Cattle
   * @param req - Request object
   * @param res - Response object
   */
  async function updateCattle(req, res) {
    try {
      const updatedData = req.body;
      console.log(updatedData);
  
      const result = await updateCattleByID(updatedData);
  
      if (result.rowsAffected > 0) {
        res.json({ message: "Cattle updated successfully" });
      } else {
        res.status(404).json({ message: "Cattle not found" });
      }
    } catch (err) {
      res.status(500).json({ message: "Error updating Cattle", error: err });
    }
  }
  
  /**
   * Delete some Cattle
   * @param req - Request object
   * @param res - Response object
   */
  async function deleteCattle(req, res) {
    try {
      const CattleID = req.params.id; // Cattle ID from the URL parameter
      const result = await deleteCattleByID(CattleID);
  
      if (result.rowsAffected > 0) {
        res.json({ message: "Cattle deleted successfully" });
      } else {
        res.status(404).json({ message: "Cattle not found" });
      }
    } catch (err) {
      res.status(500).json({ message: "Error deleting Cattle", error: err });
    }
  }
  
  module.exports = {
    getAllCattle,
    updateCattle,
    deleteCattle,
  };
  