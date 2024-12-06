const oracledb = require('oracledb');
require("dotenv").config();

async function getConnection() {
  try {
    const connection = await oracledb.getConnection({
      user: process.env.DB_USER,  // Your Oracle DB username
      password: process.env.DB_PASSWORD,  // Your Oracle DB password
      connectString: process.env.DB_CONNECTION_STRING,  // Your Oracle connect string
    });
    return connection;
  } catch (err) {
    console.error('Database connection failed:', err);
    throw err;
  }
}

module.exports = { getConnection };
