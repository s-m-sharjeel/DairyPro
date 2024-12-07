const { getConnection } = require('../db');  // Assuming you have a db connection helper

// Add Breeding Record
async function addBreedingRecord({ cowID, bullID, offspringID, date }) {
    let connection;
    console.log("date: ", date);
    try {
      connection = await getConnection();
      const formattedDate = new Date(date).toISOString().split('T')[0]; // Format as YYYY-MM-DD
      const result = await connection.execute(
        `BEGIN AddBreedingRecord(:cowID, :bullID, :offspringID, TO_DATE(:date, 'YYYY-MM-DD')); END;`,
        [cowID, bullID, offspringID, formattedDate],
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
    const result = await connection.execute('SELECT * FROM BreedingRecords ORDER BY BRID');

    return result.rows.map(row => {
      const formattedDate = new Date(row[4]).toISOString().split('T')[0]; // Format date as YYYY-MM-DD

      return {
        BRID: row[0],
        cowID: row[1],
        bullID: row[2],
        offspringID: row[3],
        date: formattedDate
      };
    });

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
      BRID: row[0],
      cowID: row[1],
      bullID: row[2],
      offspringID: row[3],
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
      `BEGIN UpdateBreedingRecord(:brId, :cowID, :bullID, :offspringID, :date); END;`,
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
      `BEGIN DeleteBreedingRecord(:brId); END;`,
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
