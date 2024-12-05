const { getConnection } = require('../db'); // Importing the database connection utility


async function addOffspring({ cattleID, sex }) {
    let connection;
    try {
      connection = await getConnection();
      await connection.execute(
        `INSERT INTO Offspring (CattleID, Sex) VALUES (:cattleID, :sex)`,
        [cattleID, sex],
        { autoCommit: true }
      );
    } catch (err) {
      console.error('Error adding offspring:', err);
      throw err;
    } finally {
      if (connection) await connection.close();
    }
  }
  
  async function getOffspringById(cattleID) {
    let connection;
    try {
      connection = await getConnection();
      const result = await connection.execute(
        'SELECT * FROM Offspring WHERE CattleID = :cattleID',
        [cattleID]
      );
      if (result.rows.length === 0) throw new Error('Offspring not found');
      const row = result.rows[0];
      return {
        cattleID: row[0],
        sex: row[1],
      };
    } catch (err) {
      console.error('Error fetching offspring:', err);
      throw err;
    } finally {
      if (connection) await connection.close();
    }
  }
  
  async function deleteOffspring(cattleID) {
    let connection;
    try {
      connection = await getConnection();
      await connection.execute(
        `DELETE FROM Offspring WHERE CattleID = :cattleID`,
        [cattleID],
        { autoCommit: true }
      );
    } catch (err) {
      console.error('Error deleting offspring:', err);
      throw err;
    } finally {
      if (connection) await connection.close();
    }
  }
  
  module.exports = {
    addOffspring,
    getOffspringById,
    deleteOffspring
  };
  