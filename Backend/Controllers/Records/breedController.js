/**
 * Controller for breeding records-related operations
 */
const {
    listAllBreedingRecords,
  } = require("../../Models/Records/breedModel");
  const db = require("../../config/db");

  /**
   * Get all breeding records
   * @param req - Request object
   * @param res - Response object
   */
  async function getAllBreedingRecords(req, res) {
    try {
      // get all cattle
      const br = await listAllBreedingRecords();
  
      // send response with BR in json
      res.json({ data: br });
    } catch (err) {
      res.status(500).json({ message: "Error fetching breeding records", error: err });
    }
  }

  /**
   * Add a new Breeding Record
   * @param req - Request object
   * @param res - Response object
   */
  async function addBreedingRecord(req, res) {
    try {
      await newBreedingRecord(req.body);
      res.status(201).json({ message: "Breeding Record added successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error adding new Breeding Record", error: err });
    }
  }

  module.exports = {
    getAllBreedingRecords,
    addBreedingRecord
  };