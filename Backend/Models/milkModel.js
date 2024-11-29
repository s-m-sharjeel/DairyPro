<<<<<<< Updated upstream
=======
const oracledb = require("oracledb");

async function listAllMilkProduction() {
  let conn;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(`SELECT * FROM MilkProduction`);
    return result.rows;
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

// delete Milk Production
async function deleteMilkProductionByID(id) {
  let conn;
  try {
    // Delete the Milk Production
    const deleteResult = await conn.execute(
      "DELETE FROM MilkProduction WHERE MP_ID = :MP_ID",
      { MP_ID: id },
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

// have to implement this
// async function addMilkProduction(milkData) {
//   let conn;
//   try {
//     // Add the Milk Production
//     const deleteResult = await conn.execute(
//       // "addmilk",
//       { MP_ID: milkData },
//       { autoCommit: true }
//     );

//     return deleteResult;
//   } catch (err) {
//     console.log(err);
//     throw err;
//   } finally {
//     if (conn) {
//       await conn.close();
//     }
//   }
// }

module.exports = {
  listAllMilkProduction,
  deleteMilkProductionByID,
  // deleteMilkProductionByID
};
>>>>>>> Stashed changes
