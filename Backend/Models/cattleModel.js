const oracledb = require("oracledb");

async function listAllCattle() {
  let conn;
  try {
    conn = await oracledb.getConnection();
    const result = await conn.execute(`SELECT * FROM Cattle`);
    return result.rows;
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

// updateCattle
async function updateCattleByID(updatedData) {
  console.log(updatedData);
  let conn;
  try {
    conn = await oracledb.getConnection();

    let fieldsToUpdate = [];
    let values = { cattle_ID: updatedData.id };

    if (updatedData.newBreed) {
      fieldsToUpdate.push("breed = :breed");
      values.breed = updatedData.newBreed;
    }
    if (updatedData.newAge) {
      fieldsToUpdate.push("age = :age");
      values.age = updatedData.newAge;
    }
    if (updatedData.newWeight) {
      fieldsToUpdate.push("weight = :weight");
      values.weight = updatedData.newWeight;
    }
    if (updatedData.newFeed) {
      fieldsToUpdate.push("feed = :feed");
      values.feed = updatedData.newFeed;
    }
    if (updatedData.fc) {
      fieldsToUpdate.push("feedConsumption = :feedConsumption");
      values.feedConsumption = updatedData.fc;
    }

    // If no fields to update, return
    if (fieldsToUpdate.length === 0) {
      throw new Error("No fields provided to update");
    }

    const sql = `UPDATE Cattle SET ${fieldsToUpdate.join(
      ", "
    )} WHERE cattle_ID = :cattle_ID`;

    const result = await conn.execute(sql, values, { autoCommit: true });
    return result;
  } catch (err) {
    throw err;
  } finally {
    if (conn) {
      await conn.close();
    }
  }
}

// deleteCattle
async function deleteCattleByID(id) {
  let conn;
  try {
    conn = await oracledb.getConnection();

    // Get the bull_ID of the Cattle being deleted
    const getBullResult = await conn.execute(
      `SELECT bull_ID FROM Bull WHERE cattle_ID = :cattle_ID`,
      { cattle_ID: id }
    );

    const bull_ID = getBullResult.rows[0][0];

    // if bull
    if (bull_ID !== undefined) {
        // Delete the Breeding Record of Bull corresponding to the Cattle being deleted
        await conn.execute(
            "DELETE FROM BreedingRecord WHERE bull_ID= :bull_ID",
            { bull_ID: bull_ID },
            { autoCommit: true }
          );
        // Delete the Bull corresponding to the Cattle being deleted
        await conn.execute(
          "DELETE FROM Bull WHERE cattle_ID= :cattle_ID",
          { cattle_ID: id },
          { autoCommit: true }
        );

    } else {

        // Get the offspring_ID of the Cattle being deleted
        const getOffspringResult = await conn.execute(
            `SELECT offspring_ID FROM Offspring WHERE cattle_ID = :cattle_ID`,
            { cattle_ID: id }
        );
  
        const offspring_ID = getOffspringResult.rows[0][0];

        // if offspring
        if (offspring_ID !== undefined) {
            // Delete the Breeding Record of Offspring corresponding to the Cattle being deleted
            await conn.execute(
                "DELETE FROM BreedingRecord WHERE offspring_ID= :offspring_ID",
                { offspring_ID: offspring_ID },
                { autoCommit: true }
            );
            // Delete the Offspring corresponding to the Cattle being deleted
            await conn.execute(
            "DELETE FROM Offspring WHERE cattle_ID= :cattle_ID",
            { cattle_ID: id },
            { autoCommit: true }
            );

        } else {

            // Get the offspring_ID of the Cattle being deleted
            const getCowResult = await conn.execute(
                `SELECT cow_ID FROM Cow WHERE cattle_ID = :cattle_ID`,
                { cattle_ID: id }
            );
    
            const cow_ID = getCowResult.rows[0][0];

            // Delete the Breeding Record of Cow corresponding to the Cattle being deleted
            await conn.execute(
                "DELETE FROM BreedingRecord WHERE cow_ID= :cow_ID",
                { cow_ID: cow_ID },
                { autoCommit: true }
            );
            // Delete the MilkProduction Records of Cow corresponding to the Cattle being deleted
            await conn.execute(
                "DELETE FROM MilkProduction WHERE cow_ID= :cow_ID",
                { cow_ID: cow_ID },
                { autoCommit: true }
            );
            // Delete the Cow corresponding to the Cattle being deleted
            await conn.execute(
            "DELETE FROM Bull WHERE cattle_ID= :cattle_ID",
            { cattle_ID: id },
            { autoCommit: true }
            );
            
        }

    }


    // Delete the Veterinary Record of Cattle being deleted
    await conn.execute(
        "DELETE FROM VeterinaryRecord WHERE cattle_ID= :cattle_ID",
        { cattle_ID: id },
        { autoCommit: true }
      );

    // Delete the Cattle
    const deleteResult = await conn.execute(
      "DELETE FROM Cattle WHERE cattle_ID = :cattle_ID",
      { cattle_ID: id },
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
  listAllCattle,
  updateCattleByID,
  deleteCattleByID,
};
