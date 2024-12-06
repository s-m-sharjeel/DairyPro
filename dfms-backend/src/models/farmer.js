const bcrypt = require('bcryptjs');
const { getConnection } = require('../db');

async function addFarmer({ name, contactInfo, role, password }) {
  let connection;
  try {
    if (!name || !contactInfo || !role || !password) {
      throw new Error('All fields are required');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    connection = await getConnection();

    const existingFarmer = await connection.execute(
      'SELECT * FROM Farmer WHERE ContactInfo = :contactInfo',
      [contactInfo]
    );

    if (existingFarmer.rows.length > 0) {
      throw new Error('Contact information already in use');
    }

    await connection.execute(
      `BEGIN AddFarmer(:name, :contactInfo, :role, :password); END;`,
      { name, contactInfo, role, password: hashedPassword },
      { autoCommit: true }
    );

    return { success: true };
  } catch (err) {
    console.error('Error adding farmer:', err);
    throw new Error(err.message || 'Error adding farmer');
  } finally {
    if (connection) await connection.close();
  }
}

async function getAllFarmers() {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute('SELECT * FROM Farmer');
    return result.rows.map(row => ({
      farmerID: row[0],
      name: row[1],
      contactInfo: row[2],
      role: row[3],
    }));
  } catch (err) {
    console.error('Error fetching farmers:', err);
    throw err;
  } finally {
    if (connection) await connection.close();
  }
}

async function updateFarmer(farmerID, { name, contactInfo, role, password }) {
  let connection;
  try {
    connection = await getConnection();

    const query = `
      UPDATE Farmer 
      SET Name = :name, 
          ContactInfo = :contactInfo, 
          Role = :role 
          ${password ? ', Password = :password' : ''} 
      WHERE FarmerID = :farmerID
    `;

    const params = { name, contactInfo, role, farmerID };
    if (password) params.password = await bcrypt.hash(password, 10);

    await connection.execute(query, params, { autoCommit: true });
  } catch (err) {
    console.error('Error updating farmer:', err);
    throw err;
  } finally {
    if (connection) await connection.close();
  }
}

async function deleteFarmer(farmerID) {
  let connection;
  try {
    connection = await getConnection();
    await connection.execute(
      `DELETE FROM Farmer WHERE FarmerID = :farmerID`,
      [farmerID],
      { autoCommit: true }
    );
  } catch (err) {
    console.error('Error deleting farmer:', err);
    throw err;
  } finally {
    if (connection) await connection.close();
  }
}

async function checkFarmerLogin(contactInfo, password) {
  let connection;
  try {
    connection = await getConnection();
    const query = `
      SELECT FarmerID, Name, ContactInfo, Role, Password
      FROM Farmer 
      WHERE ContactInfo = :contactInfo
    `;
    const result = await connection.execute(query, { contactInfo });

    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, row[4]);
    if (!isPasswordValid) return null;

    return { farmerID: row[0], name: row[1], contactInfo: row[2], role: row[3] };
  } catch (err) {
    console.error('Error checking farmer login:', err);
    throw err;
  } finally {
    if (connection) await connection.close();
  }
}

async function updateFarmerPassword(farmerID, currentPassword, newPassword) {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute(
      'SELECT Password FROM Farmer WHERE FarmerID = :farmerID',
      { farmerID }
    );

    if (result.rows.length === 0) {
      throw new Error('Farmer not found');
    }

    const storedPassword = result.rows[0][0];
    const isPasswordValid = await bcrypt.compare(currentPassword, storedPassword);
    if (!isPasswordValid) throw new Error('Current password is incorrect');

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await connection.execute(
      'UPDATE Farmer SET Password = :newPassword WHERE FarmerID = :farmerID',
      { newPassword: hashedNewPassword, farmerID },
      { autoCommit: true }
    );

    return { success: true };
  } catch (err) {
    console.error('Error updating password:', err);
    throw err;
  } finally {
    if (connection) await connection.close();
  }
}

async function updateFarmerSettings(farmerID, settings) {
  let connection;
  try {
    connection = await getConnection();
    await connection.execute(
      `UPDATE FarmerSettings 
      SET Settings = :settings 
      WHERE FarmerID = :farmerID`,
      { settings: JSON.stringify(settings), farmerID },
      { autoCommit: true }
    );
  } catch (err) {
    console.error('Error updating settings:', err);
    throw err;
  } finally {
    if (connection) await connection.close();
  }
}


module.exports = {
  addFarmer,
  getAllFarmers,
  updateFarmer,
  deleteFarmer,
  checkFarmerLogin,
  updateFarmerPassword,
  updateFarmerSettings
};
