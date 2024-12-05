async function testConnection() {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute('SELECT * FROM DUAL');
    console.log('Database connection test passed:', result.rows);
  } catch (err) {
    console.error('Test connection failed:', err);
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

testConnection();  // Call this function to test the connection
