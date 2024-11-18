/**
 * Controller for veterinary records-related operations
 */
const {
    listAllVetRecords,
  } = require("../../Models/Records/vetModel");
  const db = require("../../config/db");

  /**
   * Get all cattle
   * @param req - Request object
   * @param res - Response object
   */
  async function getAllVetRecords(req, res) {
    try {
      // get all cattle
      const vr = await listAllVetRecords();
  
      // send response with vet record in json
      res.json({ data: vr });
    } catch (err) {
      res.status(500).json({ message: "Error fetching veterinary records", error: err });
    }
  }

  /**
   * Add a new Veterinary Record
   * @param req - Request object
   * @param res - Response object
   */
  async function addVetRecord(req, res) {
    try {
      await newVetRecord(req.body);
      res.status(201).json({ message: "Veterinary Record added successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error adding new Veterinary Record", error: err });
    }
  }

  module.exports = {
    getAllVetRecords,
    addVetRecord
  };