const oracledb = require("oracledb");

async function newCow(cowData) {
    let conn;
    try {
      conn = await oracledb.getConnection();
      console.log(cowData);
      // adding into cattle
      await conn.execute(
        `INSERT INTO Cattle (cattle_ID, breed, age, weight, feed, feedConsumption) VALUES (:cattle_ID, :breed, :age, :weight, :feed, :feedConsumption)`,
        {
          cattle_ID: cowData.cattle_id, 
          breed: cowData.breed, 
          age: cowData.age, 
          weight: cowData.weight, 
          feed: cowData.feed, 
          feedConsumption: cowData.feedConsumption
        },
        { autoCommit: true }
      );
      // adding into cow
      await conn.execute(
        `INSERT INTO cow (cow_ID, cattle_ID, lactationStatus) VALUES (:cattle_ID, :cow_ID, :lactationStatus)`,
        {
          cow_ID: cowData.cow_ID,
          cattle_ID: cowData.cattle_ID,
          lactationStatus: cowData.lactationStatus
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

// toggles lactation status between "lactating" and "dry"
async function updateLactationStatusByID(id) {
    let conn;
    try {
      conn = await oracledb.getConnection();
      console.log(cowData);
      // adding into cattle
      await conn.execute(
        "UPDATE Cow SET ( IF lactationStatus = 'Lactating' THEN lactationStatus = 'Dry' ) WHERE cow_ID = :cow_ID",
        { cow_id: id }
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
    updateLactationStatusByID,
    newCow
};

