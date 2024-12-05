const { getConnection } = require('../db'); // Importing the database connection utility


async function addBull({ cattleID }) {
    let connection;
    try {
      connection = await getConnection();
      await connection.execute(
        `INSERT INTO Bull (CattleID) VALUES (:cattleID)`,
        [cattleID],
        { autoCommit: true }
      );
    } catch (err) {
      console.error('Error adding bull:', err);
      throw err;
    } finally {
      if (connection) await connection.close();
    }
  }
  
  async function getBullById(cattleID) {
    let connection;
    try {
      connection = await getConnection();
      const result = await connection.execute(
        'SELECT * FROM Bull WHERE CattleID = :cattleID',
        [cattleID]
      );
      if (result.rows.length === 0) throw new Error('Bull not found');
      const row = result.rows[0];
      return {
        cattleID: row[0],
      };
    } catch (err) {
      console.error('Error fetching bull:', err);
      throw err;
    } finally {
      if (connection) await connection.close();
    }
  }
  
  async function deleteBull(cattleID) {
    let connection;
    try {
      connection = await getConnection();
      await connection.execute(
        `DELETE FROM Bull WHERE CattleID = :cattleID`,
        [cattleID],
        { autoCommit: true }
      );
    } catch (err) {
      console.error('Error deleting bull:', err);
      throw err;
    } finally {
      if (connection) await connection.close();
    }
  }
  
  module.exports = {
    addBull,
    getBullById,
    deleteBull
  };
  