const { getConnection } = require('../db');  // Assuming you have a db connection helper

// Add Breeding Record
async function addBreedingRecord({ cowID, bullID, offspringID, date }) {
    let connection;
    try {
      connection = await getConnection();
      const result = await connection.execute(
        `INSERT INTO BreedingRecords (BRID, CowID, BullID, OffspringID, "Date") 
        VALUES (BreedingRecords_Seq.NEXTVAL, :cowID, :bullID, :offspringID, :date)`,
        [cowID, bullID, offspringID, date],
        { autoCommit: true }
      );
      return result;
    } catch (err) {
      console.error('Error adding breeding record:', err);
      throw err;
    } finally {
      if (connection) await connection.close();
    }
  }
  
  
  

// Get All Breeding Records
async function getBreedingRecords() {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute('SELECT * FROM BreedingRecords');
    return result.rows.map(row => ({
      brId: row[0],
      cowId: row[1],
      bullId: row[2],
      offspringId: row[3],
      date: row[4]
    }));
  } catch (err) {
    console.error('Error fetching breeding records:', err);
    throw err;
  } finally {
    if (connection) await connection.close();
  }
}

// Get Breeding Record by ID
async function getBreedingRecordById(brId) {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute(
      'SELECT * FROM BreedingRecords WHERE BRID = :brId',
      [brId]
    );
    if (result.rows.length === 0) throw new Error('Breeding record not found');
    const row = result.rows[0];
    return {
      brId: row[0],
      cowId: row[1],
      bullId: row[2],
      offspringId: row[3],
      date: row[4]
    };
  } catch (err) {
    console.error('Error fetching breeding record by ID:', err);
    throw err;
  } finally {
    if (connection) await connection.close();
  }
}

// Update Breeding Record
async function updateBreedingRecord(brId, { cowID, bullID, offspringID, date }) {
  let connection;
  try {
    connection = await getConnection();
    await connection.execute(
      `UPDATE BreedingRecords 
       SET CowID = :cowID, BullID = :bullID, OffspringID = :offspringID, Date = :date
       WHERE BRID = :brId`,
      [cowID, bullID, offspringID, date, brId],
      { autoCommit: true }
    );
  } catch (err) {
    console.error('Error updating breeding record:', err);
    throw err;
  } finally {
    if (connection) await connection.close();
  }
}

// Delete Breeding Record
async function deleteBreedingRecord(brId) {
  let connection;
  try {
    connection = await getConnection();
    await connection.execute(
      `DELETE FROM BreedingRecords WHERE BRID = :brId`,
      [brId],
      { autoCommit: true }
    );
  } catch (err) {
    console.error('Error deleting breeding record:', err);
    throw err;
  } finally {
    if (connection) await connection.close();
  }
}

module.exports = {
  addBreedingRecord,
  getBreedingRecords,
  getBreedingRecordById,
  updateBreedingRecord,
  deleteBreedingRecord
};
