const { getConnection } = require('../db');

async function addMilkProduction({ cowID, date, time, quantity, qualityTestResult }) {
    let connection;
    try {
      connection = await getConnection();
      await connection.execute(
        `INSERT INTO MilkProduction (CowID, Date, Time, Quantity, QualityTestResult) 
        VALUES (:cowID, :date, :time, :quantity, :qualityTestResult)`,
        [cowID, date, time, quantity, qualityTestResult],
        { autoCommit: true }
      );
    } catch (err) {
      console.error('Error adding milk production record:', err);
      throw err;
    } finally {
      if (connection) await connection.close();
    }
  }
  
  async function getMilkProduction() {
    let connection;
    try {
      connection = await getConnection();
      const result = await connection.execute(
        'SELECT CowID, "Date", MAX("Time") as Time, SUM(Quantity) AS TotalMilk, AVG(QualityTestResult) AS AvgQuality FROM MilkProduction GROUP BY CowID, "Date"'
      );
  
      return result.rows.map(row => {
        const formattedDate = new Date(row[1]).toISOString().split('T')[0]; // Extract date part only (YYYY-MM-DD)
        const formattedTime = new Date(row[2]).toISOString().split('T')[1].split('.')[0]; // Extract time part only (HH:MM:SS)
  
        return {
          cowId: row[0],
          date: formattedDate,
          time: formattedTime,
          totalMilk: row[3],
          avgQuality: row[4],
        };
      });
    } catch (err) {
      console.error('Error fetching milk production records:', err);
      throw err;
    } finally {
      if (connection) await connection.close();
    }
  }
  
  async function getMilkProductionById(mpId) {
    let connection;
    try {
      connection = await getConnection();
      const result = await connection.execute(
        'SELECT * FROM MilkProduction WHERE MPID = :mpId',
        [mpId]
      );
      if (result.rows.length === 0) throw new Error('Milk production record not found');
      const row = result.rows[0];
      return {
        mpId: row[0],
        cowId: row[1],
        date: row[2],
        time: row[3],
        quantity: row[4],
        qualityTestResult: row[5],
      };
    } catch (err) {
      console.error('Error fetching milk production record by ID:', err);
      throw err;
    } finally {
      if (connection) await connection.close();
    }
  }
  
  async function updateMilkProduction(mpId, { cowID, date, time, quantity, qualityTestResult }) {
    let connection;
    try {
      connection = await getConnection();
      await connection.execute(
        `UPDATE MilkProduction 
         SET CowID = :cowID, Date = :date, Time = :time, 
             Quantity = :quantity, QualityTestResult = :qualityTestResult
         WHERE MPID = :mpId`,
        [cowID, date, time, quantity, qualityTestResult, mpId],
        { autoCommit: true }
      );
    } catch (err) {
      console.error('Error updating milk production record:', err);
      throw err;
    } finally {
      if (connection) await connection.close();
    }
  }
  
  async function deleteMilkProduction(mpId) {
    let connection;
    try {
      connection = await getConnection();
      await connection.execute(
        `DELETE FROM MilkProduction WHERE MPID = :mpId`,
        [mpId],
        { autoCommit: true }
      );
    } catch (err) {
      console.error('Error deleting milk production record:', err);
      throw err;
    } finally {
      if (connection) await connection.close();
    }
  }
  
  module.exports = {
    addMilkProduction,
    getMilkProduction,
    getMilkProductionById,
    updateMilkProduction,
    deleteMilkProduction,
  };
  