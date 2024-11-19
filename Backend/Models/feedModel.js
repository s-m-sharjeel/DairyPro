const oracledb = require("oracledb");

async function listAllFeed() {
  let conn;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(`SELECT * FROM Feed`);
    return result.rows;
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

// delete Feed
async function deleteFeedByID(id) {
  let conn;
  try {

    // Update Feed to null for all Cattle which were consuming this feed
    await conn.execute(
        "UPDATE Cattle SET feed_ID = NULL WHERE feed_ID = :feed_ID",
        { feed_ID: id },
        { autoCommit: true }
      )

    // Delete the Feed
    const deleteResult = await conn.execute(
      "DELETE FROM Feed WHERE feed_ID = :feed_ID",
      { feed_ID: id },
      { autoCommit: true }
    );

    return deleteResult;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}
module.exports = {
  listAllFeed,
  deleteFeedByID,
};
