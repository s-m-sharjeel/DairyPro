const { getConnection } = require('../db'); // Importing the database connection utility

async function getMilkProductionForToday() {
    let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute(`SELECT SUM(Quantity) AS totalMilk
        FROM MilkProduction
        WHERE TRUNC("Date") = TRUNC(SYSDATE)`);
    return result.rows.map(row => ({
      totalMilk: row[0]
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

async function getAverageQualityForToday() {
  let connection;
try {
  connection = await getConnection();
  const result = await connection.execute(`SELECT AVG(QualityTestResult) AS averageQuality
      FROM MilkProduction
      WHERE TRUNC("Date") = TRUNC(SYSDATE)`);
      return result.rows.map(row => ({
        averageQuality: row[0]
      }));
} catch (err) {
  console.error('Error fetching average quality for today:', err);
  throw err;
} finally {
  if (connection) {
    await connection.close();
  }
}
}

async function getMostConsumedFeedForToday() {
  let connection;
try {
  connection = await getConnection();
  const result = await connection.execute(`SELECT f.Type AS topFeed 
    FROM Feed f 
    JOIN Cattle c 
    ON c.feedID = f.feedID 
    GROUP BY (f.Type) 
    ORDER BY SUM(c.feedConsumption) DESC 
    FETCH FIRST ROW ONLY`);
    return result.rows.map(row => ({
      topFeed: row[0]
    }));
} catch (err) {
  console.error('Error fetching Most Consumed Feed For Today:', err);
  throw err;
} finally {
  if (connection) {
    await connection.close();
  }
}
}

// gets the biggest threat to cattle in the last month
async function getBiggestHealthThreat() {
  let connection;
try {
  connection = await getConnection();
  const result = await connection.execute(
    `SELECT vr.diagnosis AS healthThreat 
    FROM VeterinaryRecords vr 
    JOIN Cattle c 
    ON c.CattleID = vr.CattleID 
    WHERE (MONTHS_BETWEEN(SYSDATE, vr."Date") < 1)
    GROUP BY (vr.diagnosis) 
    ORDER BY SUM(c.CattleID) DESC 
    FETCH FIRST ROW ONLY`
  );
  return result.rows.map(row => ({
    healthThreat: row[0]
  }));
} catch (err) {
  console.error('Error fetching top most health threat:', err);
  throw err;
} finally {
  if (connection) {
    await connection.close();
  }
}
}

module.exports = {
    getMilkProductionForToday,
    getAverageQualityForToday,
    getMostConsumedFeedForToday,
    getBiggestHealthThreat
};
