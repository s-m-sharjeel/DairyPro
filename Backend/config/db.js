const oracledb = require("oracledb");
require("dotenv").config();

async function initialize() {
  try {
    await oracledb.createPool({
      user: "c##first",
      password: "123",
      connectString: "localhost:1521/oracl",
    });
    console.log("Connected to OracleDB");
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = { initialize };