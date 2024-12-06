const { getConnection } = require('../db'); // Importing the database connection utility
const oracledb = require("oracledb");


// Function to Add Cattle (CREATE)
// async function addCattle(type, breed, age, weight, feed, feedConsumption) {
//   let connection;
//   try {
//     connection = await oracledb.getConnection({
//       user: 'c##proj',
//       password: '123',
//       connectString: 'localhost:1521/oracl', // Change this to your DB's connect string
//     });
//     console.log('Connection obtained');
    
//     const result = await connection.execute(
//       `INSERT INTO cattle (cattleID, type, breed, age, weight, feedID, feedConsumption) 
//        VALUES (cattle_seq.NEXTVAL, :type, :breed, :age, :weight, :feed, :feedConsumption) 
//        RETURNING cattleID INTO :cattleID`,
//       {
//         type,
//         breed,
//         age,
//         weight,
//         feed,
//         feedConsumption,
//         cattleID: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER }
//       },
//       { autoCommit: true }
//     );

//     console.log('Cattle added with ID:', result.outBinds.cattleID[0]);

//   } catch (err) {
//     console.error('Error adding cattle:', err);
//     throw err;
//   } finally {
//     if (connection) {
//       await connection.close(); // Close the connection when done
//     }
//   }
// }

async function addCattle(type, breed, age, weight, feed, feedConsumption, lactationStatus) {
  let connection;
  try {
    connection = await oracledb.getConnection({
      user: 'c##proj',
      password: '123',
      connectString: 'localhost:1521/oracl', // Update with your DB's connect string
    });
    console.log('Connection obtained');
    
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

async function updateCattle(req, res) {
  const { cattleID } = req.params; // Get cattleID from the URL parameters
  const { type, breed, age, weight, feed, feedConsumption } = req.body; // Get data from request body
  
  // Validate that cattleID is present in the URL parameters
  if (!cattleID) {
    return res.status(400).send({ message: 'CattleID is required' });
  }

  // Check if all necessary fields are provided in the body
  if (!type || !breed || !age || !weight || !feed || !feedConsumption) {
    return res.status(400).send({ message: 'All fields are required' });
  }

  let connection;
  try {
    // Establish database connection
    connection = await getConnection();

    // Execute the stored procedure to update cattle
    await connection.execute(
      `BEGIN 
         UpdateCattle(:p_cattleID, :p_type, :p_breed, :p_age, :p_weight, :p_feed, :p_feedConsumption); 
       END;`,
      {
        p_cattleID: cattleID,  // Cattle ID from the URL parameter
        p_type: type,
        p_breed: breed,
        p_age: age,
        p_weight: weight,
        p_feed: feed,
        p_feedConsumption: feedConsumption
      },
      { autoCommit: true }  // Commit after execution
    );

    res.status(200).send({ message: 'Cattle updated successfully' });
  } catch (error) {
    console.error('Error updating cattle:', error);
    res.status(500).send({ message: 'Error updating cattle', error: error.message });
  } finally {
    if (connection) {
      await connection.close();  // Ensure to close the connection
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
