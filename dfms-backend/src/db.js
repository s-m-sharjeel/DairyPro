const oracledb = require('oracledb');

async function getConnection() {
  try {
    const connection = await oracledb.getConnection({
      user: 'c##proj',        // Your Oracle DB username
      password: '123',        // Your Oracle DB password
      connectString: 'localhost:1521/oracl' // Your Oracle connect string
    });
    return connection;
  } catch (err) {
    console.error('Database connection failed:', err);
    throw err;
  }
}

module.exports = { getConnection };
