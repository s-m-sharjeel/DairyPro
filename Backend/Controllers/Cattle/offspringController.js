/**
 * Controller for offspring-related operations
 */
const {
    newOffspring,
    growOffspringByID
  } = require("../../models/offspringModel");
  const db = require("../../config/db");

  /**
   * Add a new Offspring
   * @param req - Request object
   * @param res - Response object
   */
  async function addOffspring(req, res) {
    try {
      await newOffspring(req.body);
      res.status(201).json({ message: "Offspring added successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error adding Offspring", error: err });
    }
  }

  /**
   * Grow the Offspring into Cow/Bull
   * @param req - Request object
   * @param res - Response object
   */
  async function growOffspring(req, res) {
    try {
      await growOffspringByID(req.body);
      res.status(201).json({ message: "Successful" });
    } catch (err) {
      res.status(500).json({ message: "Failed", error: err });
    }
  }

  module.exports = {
    addOffspring,
    growOffspring
  };



  