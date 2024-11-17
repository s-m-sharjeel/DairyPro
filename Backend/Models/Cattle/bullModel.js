const oracledb = require("oracledb");

async function newBull(bullData) {
    let conn;
    try {
      conn = await oracledb.getConnection();
      console.log(bullData);
      // adding into cattle
      await conn.execute(
        `INSERT INTO Cattle (cattle_ID, breed, age, weight, feed, feedConsumption) VALUES (:cattle_ID, :breed, :age, :weight, :feed, :feedConsumption)`,
        {
          cattle_ID: bullData.cattle_id, 
          breed: bullData.breed, 
          age: bullData.age, 
          weight: bullData.weight, 
          feed: bullData.feed, 
          feedConsumption: bullData.feedConsumption
        },
        { autoCommit: true }
      );
      // adding into bull
      await conn.execute(
        `INSERT INTO Bull (bull_ID, cattle_ID) VALUES (:cattle_ID, :bull_ID)`,
        {
          bull_ID: bullData.bull_ID,
          cattle_ID: bullData.cattle_ID,
        },
        { autoCommit: true }
      );
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
    newBull
};

