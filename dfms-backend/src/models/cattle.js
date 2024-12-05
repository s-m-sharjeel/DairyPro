const { getConnection } = require('../db'); // Importing the database connection utility

// Function to Add Cattle (CREATE)
async function addCattle(type, breed, age, weight, feed, feedConsumption) {
  let connection;
  try {
    connection = await getConnection();
    await connection.execute(
      `BEGIN AddCattle(:type, :breed, :age, :weight, :feed, :feedConsumption); END;`,
      { type, breed, age, weight, feed, feedConsumption },
      { autoCommit: true }
    );
  } catch (err) {
    console.error('Error adding cattle:', err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
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
async function updateCattle(cattleID, type, breed, age, weight, feed, feedConsumption) {
  let connection;
  try {
    connection = await getConnection();
    await connection.execute(
      `UPDATE Cattle
       SET Type = :type, Breed = :breed, Age = :age, Weight = :weight, Feed = :feed, FeedConsumption = :feedConsumption
       WHERE CattleID = :cattleID`,
      { cattleID, type, breed, age, weight, feed, feedConsumption },
      { autoCommit: true }
    );
  } catch (err) {
    console.error('Error updating cattle:', err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

// Function to Delete Cattle (DELETE)
async function deleteCattle(cattleID) {
  let connection;
  try {
    connection = await getConnection();

    // Step 1: Delete references in BreedingRecords
    await connection.execute(
      `DELETE FROM BreedingRecords WHERE CowID = :cattleID OR BullID = :cattleID`,
      [cattleID, cattleID],
      { autoCommit: true }
    );

    // Step 2: Delete references in MilkProduction (assuming CattleID is referenced as CowID)
    await connection.execute(
      `DELETE FROM MilkProduction WHERE CowID = :cattleID`,
      [cattleID],
      { autoCommit: true }
    );

    // Step 3: Now delete the parent record in Cattle
    await connection.execute(
      `DELETE FROM Cattle WHERE CattleID = :cattleID`,
      [cattleID],
      { autoCommit: true }
    );

  } catch (err) {
    console.error('Error deleting cattle:', err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = {
  addCattle,
  getAllCattle,
  getCattleById,
  updateCattle,
  deleteCattle
};
