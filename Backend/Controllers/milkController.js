/**
 * Controller for Milk Production-related operations
 */
const {
    listAllMilkProduction,
    deleteMilkProductionByID
  } = require("../Models/milkModel");
  
  /**
   * Get all Milk Production
   * @param req - Request object
   * @param res - Response object
   */
  async function getAllMilkProduction(req, res) {
    try {
      // get all mp
      const mp = await listAllMilkProduction();
  
      // send response with mp in json
      res.json({ data: mp });
    } catch (err) {
      res.status(500).json({ message: "Error fetching Milk Production", error: err });
    }
  }
  
  /**
   * Delete some Milk Production
   * @param req - Request object
   * @param res - Response object
   */
  async function deleteMilkProduction(req, res) {
    try {
      const MP_ID = req.params.id; // MP_ID from the URL parameter
      const result = await deleteMilkProductionByID(MP_ID);
  
      if (result.rowsAffected > 0) {
        res.json({ message: "MP deleted successfully" });
      } else {
        res.status(404).json({ message: "MP not found" });
      }
    } catch (err) {
      res.status(500).json({ message: "Error deleting MP", error: err });
    }
  }
  
  module.exports = {
    getAllMilkProduction,
    deleteMilkProduction,
  };
  