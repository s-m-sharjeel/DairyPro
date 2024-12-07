const { getConnection } = require('../db'); // Importing the database connection utility

async function getMilkProductionForToday() {
    let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute(`SELECT SUM(Quantity)
        FROM MilkProduction
        WHERE TRUNC("Date") = TRUNC(SYSDATE)`);
    return result.rows.map(row => ({
      totalMilk: row[0],
      avgQuality: row[1]
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
  const result = await connection.execute(`SELECT AVG(QualityTestResult)
      FROM MilkProduction
      WHERE TRUNC("Date") = TRUNC(SYSDATE)`);
  return result.rows.map(row => ({
    totalMilk: row[0],
    avgQuality: row[1]
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


module.exports = {
    getMilkProductionForToday,
    getAverageQualityForToday
};
