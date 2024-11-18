const oracledb = require("oracledb");

async function listAllVetRecords() {
    let conn;
    try {
      conn = await oracledb.getConnection();
      const result = await conn.execute(`SELECT * FROM VeterinaryRecord`);
      return result.rows;
    } catch (err) {
      throw err;
    } finally {
      if (conn) {
        await conn.close();
      }
    }
  }

async function newVetRecord(VR_Data) {
    let conn;
    try {
      conn = await oracledb.getConnection();
      console.log(bullData);
      // adding into records
      await conn.execute(
        `INSERT INTO VeterinaryRecord (VR_ID, cattle_ID, date, time, symptoms, diagnosis, treatment) VALUES (:VR_ID, :cattle_ID, :date, :time, :symptoms, :diagnosis, :treatment)`,
        {
            VR_ID: VR_Data.VR_ID, 
            cattle_ID: VR_Data.cattle_ID, 
            date: VR_Data.date, 
            time: VR_Data.time, 
            symptoms: VR_Data.symptoms,
            diagnosis: VR_Data.diagnosis,
            treatment: VR_Data.treatment
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
    newVetRecord,
    listAllVetRecords,
};

