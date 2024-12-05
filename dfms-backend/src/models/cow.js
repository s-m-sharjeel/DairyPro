const { getConnection } = require('../db'); // Importing the database connection utility


async function addCow({ cattleID, breed, age, weight, lactationStatus }) {
    let connection;
    try {
      connection = await getConnection();
      await connection.execute(
        `INSERT INTO Cow (CattleID, Breed, Age, Weight, LactationStatus) 
        VALUES (:cattleID, :breed, :age, :weight, :lactationStatus)`,
        [cattleID, breed, age, weight, lactationStatus],
        { autoCommit: true }
      );
    } catch (err) {
      console.error('Error adding cow:', err);
      throw err;
    } finally {
      if (connection) await connection.close();
    }
  }
  
  async function getAllCows() {
    let connection;
    try {
      connection = await getConnection();
      const result = await connection.execute('SELECT * FROM CATTLE WHERE TYPE = \'COW\'');
      return result.rows.map(row => ({
        cattleID: row[0],
        type: row[1],
      }));
    } catch (err) {
      console.error('Error fetching cow:', err);
      throw err;
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }
  


  async function getCowById(cattleID) {
    let connection;
    try {
      connection = await getConnection();
      const result = await connection.execute(
        'SELECT * FROM Cow WHERE CattleID = :cattleID',
        [cattleID]
      );
      if (result.rows.length === 0) throw new Error('Cow not found');
      const row = result.rows[0];
      return {
        cattleID: row[0],
        breed: row[1],
        age: row[2],
        weight: row[3],
        lactationStatus: row[4],
      };
    } catch (err) {
      console.error('Error fetching cow:', err);
      throw err;
    } finally {
      if (connection) await connection.close();
    }
  }
  
  async function deleteCow(cattleID) {
    let connection;
    try {
      connection = await getConnection();
      await connection.execute(
        `DELETE FROM Cow WHERE CattleID = :cattleID`,
        [cattleID],
        { autoCommit: true }
      );
    } catch (err) {
      console.error('Error deleting cow:', err);
      throw err;
    } finally {
      if (connection) await connection.close();
    }
  }
  
  module.exports = {
    addCow,
    getCowById,
    getAllCows,
    deleteCow
  };
  