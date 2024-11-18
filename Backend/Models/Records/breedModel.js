const oracledb = require("oracledb");

async function listAllBreedingRecords() {
    let conn;
    try {
      conn = await oracledb.getConnection();
      const result = await conn.execute(`SELECT * FROM BreedingRecord`);
      return result.rows;
    } catch (err) {
      throw err;
    } finally {
      if (conn) {
        await conn.close();
      }
    }
  }

async function newBreedingRecord(BR_Data) {
    let conn;
    try {
      conn = await oracledb.getConnection();
      console.log(bullData);
      // adding into records
      await conn.execute(
        `INSERT INTO BreedingRecord (BR_ID, cow_ID, bull_ID, offspring_ID, date) VALUES (:BR_ID, :cow_ID, :bull_ID, :offspring_ID, :date)`,
        {
            BR_ID: BR_Data.BR_ID, 
            cow_ID: BR_Data.cow_ID, 
            bull_ID: BR_Data.bull_ID, 
            offspring_ID: BR_Data.offspring_ID, 
            date: BR_Data.date
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
    newBreedingRecord,
    listAllBreedingRecords,
};

