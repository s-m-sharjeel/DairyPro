const { getConnection } = require('../db'); // Importing the database connection utility
const oracledb = require("oracledb");

async function addVeterinaryRecord(cattleID, date, time, symptoms, diagnosis, treatment, vetName) {
  let connection;
  try {
    console.log("Adding veterinary record with the following data:");
    console.log("CattleID:", cattleID);
    console.log("Date:", date);
    console.log("Time:", time);
    console.log("Symptoms:", symptoms);
    console.log("Diagnosis:", diagnosis);
    console.log("Treatment:", treatment);
    console.log("VetName:", vetName);

    // Ensure date and time formats are correct
    const formattedDate = new Date(date).toISOString().split('T')[0]; // Format as YYYY-MM-DD
    const formattedTime = time; // Assuming it's already in HH:MM:SS format

    console.log("Formatted Date:", formattedDate);
    console.log("Formatted Time:", formattedTime);

    connection = await getConnection();

    // Use TO_DATE for Date and TO_TIMESTAMP for Time
    await connection.execute(
      `BEGIN 
         AddVeterinaryRecord(
           :cattleID, 
           TO_DATE(:date, 'YYYY-MM-DD'), 
           TO_TIMESTAMP(:time, 'HH24:MI:SS'), 
           :symptoms, 
           :diagnosis, 
           :treatment, 
           :vetName
         ); 
       END;`,
      { cattleID, date: formattedDate, time: formattedTime, symptoms, diagnosis, treatment, vetName },
      { autoCommit: true }
    );

    console.log("Veterinary record added successfully.");
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
      symptoms: row[4],
      diagnosis: row[5],
      treatment: row[6],
      vetName: row[7]
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
async function updateVeterinaryRecord(vrid, cattleID, date, time, symptoms, diagnosis, treatment, vetName) {
  let connection;
  try {
    console.log("Updating veterinary record with the following data:");
    console.log("CattleID:", cattleID);
    console.log("Date:", date);
    console.log("Time:", time);
    console.log("Symptoms:", symptoms);
    console.log("Diagnosis:", diagnosis);
    console.log("Treatment:", treatment);
    console.log("VetName:", vetName);

    // Ensure date is in 'YYYY-MM-DD' format
    const formattedDate = new Date(date).toISOString().split('T')[0]; // 'YYYY-MM-DD'

    // Ensure time is in 'HH:MI:SS' format (without 'T' and 'Z')
    const formattedTime = new Date(time).toISOString().split('T')[1].slice(0, 8); // 'HH:MI:SS'

    // Combine formatted date and time into 'YYYY-MM-DD HH:MI:SS' format
    const formattedTimestamp = `${formattedDate} ${formattedTime}`;

    // Log for debugging
    console.log("Formatted Timestamp:", formattedTimestamp);

    // Establish a connection
    connection = await getConnection();

    // Execute the update procedure
    const result = await connection.execute(
      `BEGIN 
         UpdateVeterinaryRecord(
           :vrid, 
           :cattleID, 
           TO_DATE(:date, 'YYYY-MM-DD'), 
           TO_TIMESTAMP(:time, 'YYYY-MM-DD HH24:MI:SS'), 
           :symptoms, 
           :diagnosis, 
           :treatment, 
           :vetName
         ); 
       END;`,
      { 
        vrid, 
        cattleID, 
        date: formattedDate,  // 'YYYY-MM-DD'
        time: formattedTimestamp,  // 'YYYY-MM-DD HH:MI:SS'
        symptoms, 
        diagnosis, 
        treatment, 
        vetName 
      },
      { autoCommit: true }
    );

    // The autoCommit should automatically handle committing the transaction, so no need to call commit explicitly.
    console.log("Record updated successfully:", result);

    //res.send('Veterinary record updated successfully');
    
  } catch (err) {
    console.error('Error updating veterinary record:', err);
    res.status(500).send('Error updating veterinary record');
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
    console.log('vrid: ', vrid);
    connection = await getConnection();
    await connection.execute(
      `BEGIN DeleteVeterinaryRecord(:vrid); END;`,
      {
        vrid: vrid // Bind the cattleID to the procedure
      },
      { autoCommit: true }
    );  // Remove autoCommit: true here
    await connection.commit();  // Explicitly commit the transaction
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