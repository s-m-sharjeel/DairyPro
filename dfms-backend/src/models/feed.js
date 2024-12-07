const { getConnection } = require('../db'); // Importing the database connection utility

// Add Feed (Create)
// Add Feed (Create)
async function addFeed(type, quantity, supplier, cost) {
    let connection;
    try {
      connection = await getConnection();
  
      // Insert feed record using sequence for FeedID
      await connection.execute(
        `BEGIN AddFeed(:type, :quantity, :supplier, :cost); END;`,
        { type, quantity, supplier, cost },
        { autoCommit: true }
      );
    } catch (err) {
      console.error('Error adding feed:', err);
      throw err; // Rethrow error to be handled by controller
    } finally {
      if (connection) {
        await connection.close();
      }
    }
  }
  
  

// Get All Feeds (Read)
async function getAllFeeds() {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute('SELECT * FROM Feed ORDER BY FeedID');
    return result.rows.map(row => ({
      feedID: row[0],
      type: row[1],
      quantity: row[2],
      supplier: row[3],
      cost: row[4]
    }));
  } catch (err) {
    console.error('Error fetching all feeds:', err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

// Get Feed by ID (Read)
async function getFeedById(feedID) {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute('SELECT * FROM Feed WHERE FeedID = :feedID', [feedID]);
    if (result.rows.length === 0) {
      throw new Error('Feed not found');
    }
    const row = result.rows[0];
    return {
      feedID: row[0],
      type: row[1],
      quantity: row[2],
      supplier: row[3],
      cost: row[4]
    };
  } catch (err) {
    console.error('Error fetching feed by ID:', err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

// Update Feed (Update)
async function updateFeed(feedID, type, quantity, supplier, cost) {
  let connection;
  try {
    connection = await getConnection();
    await connection.execute(
      `exec UpdateFeed(:feedID);`,
      [type, quantity, supplier, cost, feedID],
      { autoCommit: true }
    );
  } catch (err) {
    console.error('Error updating feed:', err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

// Delete Feed (Delete)
async function deleteFeed(feedID) {
  let connection;
  try {
    connection = await getConnection();
    await connection.execute(
      `DELETE FROM Feed WHERE FeedID = :feedID`,
      [feedID],
      { autoCommit: true }
    );
  } catch (err) {
    console.error('Error deleting feed:', err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

// Export all CRUD operations
module.exports = {
  addFeed,
  getAllFeeds,
  getFeedById,
  updateFeed,
  deleteFeed
};
