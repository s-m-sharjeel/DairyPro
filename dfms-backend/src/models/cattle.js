const { getConnection } = require('../db'); // Importing the database connection utility

async function addCattle(type, breed, age, weight, feed, feedConsumption, lactationStatus) {
  let connection;
  try {
    connection = await getConnection();
    
    // Debugging the lactationStatus before calling the procedure
    console.log('LactationStatus:', lactationStatus);
    
    const result = await connection.execute(
      `BEGIN 
         AddCattle(:type, :breed, :age, :weight, :feed, :feedConsumption, :lactationStatus); 
       END;`, 
      {
        type: type,
        breed: breed,
        age: age,
        weight: weight,
        feed: parseInt(feed, 10),  // Ensure feed is passed as an integer
        feedConsumption: feedConsumption,
        lactationStatus: lactationStatus
      },
      {
        autoCommit: true
      }
    );
    
    console.log('Cattle added successfully');
  } catch (err) {
    console.error('Error adding cattle:', err);
    throw err;
  } finally {
    if (connection) {
      await connection.close(); // Close the connection when done
    }
  }
}






// Function to Get All Cattle (READ)
async function getAllCattle() {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute('SELECT * FROM CATTLE');
    return result.rows.map(row => ({
      cattleID: row[0],
      type: row[1],
      breed: row[2],
      age: row[3],
      weight: row[4],
      feed: row[5],
      feedConsumption: row[6]
    }));
  } catch (err) {
    console.error('Error fetching cattle:', err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

// Function to Get Cattle by ID (READ)
async function getCattleById(cattleID) {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute('SELECT * FROM CATTLE WHERE CattleID = :cattleID', [cattleID]);
    if (result.rows.length === 0) {
      throw new Error('Cattle not found');
    }
    const row = result.rows[0];
    return {
      cattleID: row[0],
      type: row[1],
      breed: row[2],
      age: row[3],
      weight: row[4],
      feed: row[5],
      feedConsumption: row[6]
    };
  } catch (err) {
    console.error('Error fetching cattle by ID:', err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

// Function to Update Cattle (UPDATE)
// async function updateCattle(cattleID, type, breed, age, weight, feed, feedConsumption) {
//   let connection;
//   try {
//     connection = await getConnection();
//     await connection.execute(
//       `UPDATE Cattle
//        SET Type = :type, Breed = :breed, Age = :age, Weight = :weight, FeedID = :feed, FeedConsumption = :feedConsumption
//        WHERE CattleID = :cattleID`,
//       { cattleID, type, breed, age, weight, feed, feedConsumption },
//       { autoCommit: true }
//     );
//   } catch (err) {
//     console.error('Error updating cattle:', err);
//     throw err;
//   } finally {
//     if (connection) {
//       await connection.close();
//     }
//   }
// }

async function updateCattle(cattleID, updatedData) {
  let connection;
  try {
    console.log(`Fetching cattle record for cattleID: ${cattleID}`);
    
    // Fetch all records (assuming you have a getAllCattle function to get records)
    const cattleRecords = await getAllCattle();

    // Find the existing record
    const existingRecord = cattleRecords.find(record => record.cattleID === Number(cattleID));
    if (!existingRecord) {
      throw new Error(`Cattle record with ID ${cattleID} not found.`);
    }

    console.log('Existing Record:', existingRecord);

    // Merge existing record with updated data
    const updatedRecord = {
      ...existingRecord,
      ...updatedData, // Overwrite only the updated fields
    };

    console.log('Updated Record:', updatedRecord);

    // Update the record in the database
    connection = await getConnection();
    await connection.execute(
      `BEGIN UpdateCattle(
        :cattleID,
        :type,
        :breed,
        :age,
        :weight,
        :feed,
        :feedConsumption
      ); END;`,
      {
        cattleID: Number(cattleID),
        type: updatedRecord.type,
        breed: updatedRecord.breed,
        age: updatedRecord.age,
        weight: updatedRecord.weight,
        feed: updatedRecord.feed,
        feedConsumption: updatedRecord.feedConsumption,
      },
      { autoCommit: true }
    );

    console.log('Cattle record updated successfully.');
  } catch (err) {
    console.error('Error in model:', err.message);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}



async function deleteCattle(cattleID) {
  let connection;
  try {
    connection = await getConnection();

    // Step 1: Call the DeleteCattle procedure
    await connection.execute(
      `BEGIN DeleteCattle(:cattleID); END;`, // Call the procedure using the anonymous PL/SQL block
      {
        cattleID: cattleID // Bind the cattleID to the procedure
      },
      { autoCommit: true }
    );
    console.log('Cattle deleted successfully');
  } catch (err) {
    console.error('Error deleting cattle:', err);
    throw err;
  } finally {
    if (connection) {
      await connection.close(); // Close the connection when done
    }
  }
}

// Function to Delete Cattle (DELETE)
// async function deleteCattle(cattleID) {
//   let connection;
//   try {
//     connection = await getConnection();

//     // Step 1: Delete references in BreedingRecords
//     await connection.execute(
//       'DELETE FROM BreedingRecords WHERE CowID = :cattleID OR BullID = :cattleID',
//       [cattleID, cattleID],
//       { autoCommit: true }
//     );

//     // Step 2: Delete references in MilkProduction (assuming CattleID is referenced as CowID)
//     await connection.execute(
//       'DELETE FROM MilkProduction WHERE CowID = :cattleID',
//       [cattleID],
//       { autoCommit: true }
//     );

//     // Step 3: Now delete the parent record in Cattle
//     await connection.execute(
//      ' DELETE FROM Cattle WHERE CattleID = :cattleID',
//       [cattleID],
//       { autoCommit: true }
//     );

//   } catch (err) {
//     console.error('Error deleting cattle:', err);
//     throw err;  // rethrow the error for handling in the controller
//   } finally {
//     if (connection) {
//       await connection.close();
//     }
//   }
// }

module.exports = {
  addCattle,
  getAllCattle,
  getCattleById,
  updateCattle,
  deleteCattle
};
