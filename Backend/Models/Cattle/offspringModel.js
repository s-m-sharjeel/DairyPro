const oracledb = require("oracledb");

async function newOffspring(offspringData) {
    let conn;
    try {
      conn = await oracledb.getConnection();
      console.log(offspringData);
      // adding into cattle
      await conn.execute(
        "INSERT INTO Cattle (cattle_ID, breed, age, weight, feed, feedConsumption) VALUES (:cattle_ID, :breed, :age, :weight, :feed, :feedConsumption)",
        {
          cattle_ID: offspringData.cattle_id, 
          breed: offspringData.breed, 
          age: offspringData.age, 
          weight: offspringData.weight, 
          feed: offspringData.feed, 
          feedConsumption: offspringData.feedConsumption
        },
        { autoCommit: true }
      );
      // adding into offspring
      await conn.execute(
        "INSERT INTO offspring (offspring_ID, cattle_ID, sex) VALUES (:cattle_ID, :offspring_ID, :sex)",
        {
          offspring_ID: offspringData.offspring_ID,
          cattle_ID: offspringData.cattle_ID,
          sex: offspringData.sex
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

// shifts an offspring to cow/bull 
async function growOffspringByID(id) {
    let conn;
    try {
      conn = await oracledb.getConnection();
      console.log(offspringData);

      // Delete the Breeding Record of Offspring corresponding to the Cattle being deleted
      await conn.execute(
        "DELETE FROM BreedingRecord WHERE offspring_ID= :offspring_ID",
        { offspring_ID: id },
        { autoCommit: true }
      );
      // Grow the Offspring into Cow/Bull based on its sex
      await conn.execute(
        // will define this func in oracle
        "exec growOffspring(:cattle_ID)",
        { cattle_ID: id },
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
    growOffspringByID,
    newOffspring
};

