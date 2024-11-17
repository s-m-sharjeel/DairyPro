const oracledb = require("oracledb");

async function createUser(email, hashedPassword) {
  const query = `INSERT INTO users (email, password) VALUES (:email, :password)`;
  const binds = { email, password: hashedPassword };

  let connection;
  try {
    connection = await oracledb.getConnection();
    await connection.execute(query, binds, { autoCommit: true });
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

async function findUserByEmail(email) {
  const query = `SELECT * FROM users WHERE email = :email`;
  let connection;
  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute(query, [email]);
    return result.rows[0];
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = { createUser, findUserByEmail };
