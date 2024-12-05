// src/db.js
const oracledb = require('oracledb');
const { getConnection } = require('../db'); // Importing the database connection utility

async function getConnection() {
  try {
    const connection = await oracledb.getConnection({
      user: 'c##proj', // your Oracle username
      password: '123', // your Oracle password
      connectString: 'localhost:1521/orcl' // Oracle connection string
    });
    return connection;
  } catch (err) {
    console.error('Database connection failed:', err);
    throw err;
  }
}

module.exports = { getConnection };
