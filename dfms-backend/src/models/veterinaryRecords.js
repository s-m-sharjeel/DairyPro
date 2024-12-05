const { getConnection } = require('../db'); // Importing the database connection utility

// Function to Add a Veterinary Record (CREATE)
async function addVeterinaryRecord(cattleID, date, time, vetID, symptoms, diagnosis, treatment) {
  let connection;
  try {
    connection = await getConnection();
    await connection.execute(
      `BEGIN AddVeterinaryRecord(:cattleID, :date, :time, :vetID, :symptoms, :diagnosis, :treatment); END;`,
      { cattleID, date, time, vetID, symptoms, diagnosis, treatment },
      { autoCommit: true }
    );
  } catch (err) {
    console.error('Error adding veterinary record:', err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

// Function to Get All Veterinary Records (READ)
async function getAllVeterinaryRecords() {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute('SELECT * FROM VeterinaryRecords');
    return result.rows.map(row => ({
      vrid: row[0],
      cattleID: row[1],
      date: row[2],
      time: row[3],
      vetID: row[4],
      symptoms: row[5],
      diagnosis: row[6],
      treatment: row[7]
    }));
  } catch (err) {
    console.error('Error fetching veterinary records:', err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

// Function to Get a Veterinary Record by ID (READ)
async function getVeterinaryRecordById(vrid) {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute('SELECT * FROM VeterinaryRecords WHERE VRID = :vrid', [vrid]);
    if (result.rows.length === 0) {
      throw new Error('Veterinary record not found');
    }
    const row = result.rows[0];
    return {
      vrid: row[0],
      cattleID: row[1],
      date: row[2],
      time: row[3],
      vetID: row[4],
      symptoms: row[5],
      diagnosis: row[6],
      treatment: row[7]
    };
  } catch (err) {
    console.error('Error fetching veterinary record by ID:', err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

// Function to Update a Veterinary Record (UPDATE)
async function updateVeterinaryRecord(vrid, cattleID, date, time, vetID, symptoms, diagnosis, treatment) {
  let connection;
  try {
    connection = await getConnection();
    await connection.execute(
      `BEGIN UpdateVeterinaryRecord(:vrid, :cattleID, :date, :time, :vetID, :symptoms, :diagnosis, :treatment); END;`,
      { vrid, cattleID, date, time, vetID, symptoms, diagnosis, treatment },
      { autoCommit: true }
    );
  } catch (err) {
    console.error('Error updating veterinary record:', err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

// Function to Delete a Veterinary Record (DELETE)
async function deleteVeterinaryRecord(vrid) {
  let connection;
  try {
    connection = await getConnection();
    await connection.execute(
      `BEGIN DeleteVeterinaryRecord(:vrid); END;`,
      { vrid },
      { autoCommit: true }
    );
  } catch (err) {
    console.error('Error deleting veterinary record:', err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = {
  addVeterinaryRecord,
  getAllVeterinaryRecords,
  getVeterinaryRecordById,
  updateVeterinaryRecord,
  deleteVeterinaryRecord
};