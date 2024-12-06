const { getConnection } = require('../db');
const oracledb = require("oracledb");
// Add new milk production record

async function addMilkProduction({ cowID, date, time, quantity, qualityTestResult }) {
  let connection;
  try {
      console.log('cowID', cowID);
      console.log('date', date);
      console.log('time', time);
      console.log('quantity', quantity);
      console.log('quality', qualityTestResult);

      // Ensure date and time formats are correct
      const formattedDate = new Date(date).toISOString().split('T')[0]; // Format as YYYY-MM-DD
      const formattedTime = time; // Assuming it's already in HH:MM:SS format

      console.log("Formatted Date:", formattedDate);
      console.log("Formatted Time:", formattedTime);

      connection = await getConnection();

      // Use TO_DATE for Date and TO_TIMESTAMP for Time to ensure proper conversion
      await connection.execute(
          `BEGIN 
             AddMilkProduction(
               :cowID, 
               TO_DATE(:date, 'YYYY-MM-DD'), 
               TO_TIMESTAMP(:time, 'YYYY-MM-DD"T"HH24:MI:SS'), 
               :quantity, 
               :qualityTestResult
             ); 
           END;`,
          { cowID, date: formattedDate, time: formattedTime, quantity, qualityTestResult },
          { autoCommit: true }
      );

      console.log("Milk production record added successfully.");
  } catch (err) {
      console.error('Error adding milk production record:', err);
      throw err;
  } finally {
      if (connection) await connection.close();
  }
}


// Fetch all milk production records
async function getMilkProduction() {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute(
      'SELECT * FROM MilkProduction ORDER BY "Date" DESC, "Time" DESC'
    );

    return result.rows.map(row => {
      const formattedDate = new Date(row[2]).toISOString().split('T')[0]; // Format date as YYYY-MM-DD
      const formattedTime = new Date(row[3]).toISOString().split('T')[1].split('.')[0]; // Format time as HH:MM:SS

      return {
        mpId: row[0],
        cowId: row[1], // Cow ID from the second column
        date: formattedDate,
        time: formattedTime,
        quantity: row[4], // Quantity of milk
        qualityTestResult: row[5], // Quality test result
      };
    });
  } catch (err) {
    console.error('Error fetching milk production records:', err);
    throw err;
  } finally {
    if (connection) await connection.close();
  }
}

// Get specific milk production record by MPID
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

// Update existing milk production record
async function updateMilkProduction(mpId, updatedRecord) {
  let connection;
  try {
    console.log(`Fetching milk production record for mpId: ${mpId}`);
    
    // Fetch all records
    const records = await getMilkProduction();
    
    // Find the existing record
    const existingRecord = records.find(record => record.mpId === Number(mpId));
    if (!existingRecord) {
      throw new Error(`Milk production record with ID ${mpId} not found.`);
    }

    console.log('Existing Record:', existingRecord);

    // Merge existing record with updated data
    const updatedData = {
      ...existingRecord,
      ...updatedRecord, // Overwrite only the updated fields
    };

    console.log('Updated Record:', updatedData);

    // Format date and time for Oracle
    const formattedDate = new Date(updatedData.date).toISOString().split('T')[0]; // YYYY-MM-DD
    const formattedTime = updatedData.time; // Keep as HH:MM:SS

    console.log("Formatted Date:", formattedDate);
    console.log("Formatted Time:", formattedTime);

    // Update the record in the database
    connection = await getConnection();
    await connection.execute(
      `BEGIN UpdateMilkProduction(
        :mpId,
        :cowId,
        TO_DATE(:productionDate, 'YYYY-MM-DD'),
        TO_DATE(:productionTime, 'HH24:MI:SS'),
        :quantity,
        :qualityTestResult
      ); END;`,
      {
        mpId: Number(mpId),
        cowId: updatedData.cowId,
        productionDate: formattedDate, // YYYY-MM-DD
        productionTime: formattedTime, // HH:MM:SS
        quantity: updatedData.quantity,
        qualityTestResult: updatedData.qualityTestResult,
      },
      { autoCommit: true }
    );

    console.log('Milk production record updated successfully.');
  } catch (err) {
    console.error('Error in model:', err.message);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}



// Delete milk production record
async function deleteMilkProduction(mpId) {
  let connection;
  console.log('mpid: ', mpId);  // Debugging line to check the passed value
  try {
    console.log('Deleting milk production record with MPID:', mpId);
    connection = await getConnection();

    // Make sure mpId is passed as a number (for safety)
    mpId = Number(mpId);

    await connection.execute(
      `BEGIN DeleteMilkProduction(:mpId); END;`,
      { mpId }, // This should pass the actual value of mpId as a parameter
      { autoCommit: true }
    );
    console.log("Milk production record deleted successfully.");
  } catch (err) {
    console.error('Error deleting milk production record:', err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = {
    addMilkProduction,
    getMilkProduction,
    getMilkProductionById,
    updateMilkProduction,
    deleteMilkProduction,
};
