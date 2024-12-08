const bcrypt = require('bcryptjs');
const { getConnection } = require('../db');

async function addUser({ name, email, role, password }) {
  let connection;
  try {
    if (!name || !email || !role || !password) {
      throw new Error('All fields are required');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    connection = await getConnection();

    const existingUser = await connection.execute(
      'SELECT * FROM "User" WHERE email = :email',
      [email]
    );

    if (existingUser.rows.length > 0) {
      throw new Error('email already in use');
    }

    await connection.execute(
      `BEGIN AddUser(:name, :email, :password, :role); END;`,
      { name, email, role, password: hashedPassword },
      { autoCommit: true }
    );

    return { success: true };
  } catch (err) {
    console.error('Error adding User:', err);
    throw new Error(err.message || 'Error adding User');
  } finally {
    if (connection) await connection.close();
  }
}

async function getAllUsers() {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute('SELECT * FROM "User"');
    return result.rows.map(row => ({
      UserID: row[0],
      name: row[1],
      email: row[2],
      role: row[3],
    }));
  } catch (err) {
    console.error('Error fetching Users:', err);
    throw err;
  } finally {
    if (connection) await connection.close();
  }
}

async function updateUser(UserID, { name, email, role, password }) {
  let connection;
  try {
    connection = await getConnection();

    const query = `
      UPDATE "User" 
      SET Name = :name, 
          email = :email, 
          Role = :role 
          ${password ? ', Password = :password' : ''} 
      WHERE UserID = :UserID
    `;

    const params = { name, email, role, UserID };
    if (password) params.password = await bcrypt.hash(password, 10);

    await connection.execute(query, params, { autoCommit: true });
  } catch (err) {
    console.error('Error updating User:', err);
    throw err;
  } finally {
    if (connection) await connection.close();
  }
}

async function deleteUser(UserID) {
  let connection;
  try {
    connection = await getConnection();
    await connection.execute(
      `BEGIN DeleteUser(:UserID); END;`,
      [UserID],
      { autoCommit: true }
    );
  } catch (err) {
    console.error('Error deleting User:', err);
    throw err;
  } finally {
    if (connection) await connection.close();
  }
}

async function checkUserLogin(email, password) {
  let connection;
  try {
    connection = await getConnection();
    const query = `
      SELECT UserID, Name, Email, Role, Password
      FROM "User" 
      WHERE email = :email
    `;
    const result = await connection.execute(query, { email });

    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, row[4]);
    if (!isPasswordValid) return null;

    return { userID: row[0], name: row[1], email: row[2], role: row[3] };
  } catch (err) {
    console.error('Error checking User login:', err);
    throw err;
  } finally {
    if (connection) await connection.close();
  }
}

async function updateUserPassword(UserID, currentPassword, newPassword) {
  let connection;
  try {
    connection = await getConnection();
    const result = await connection.execute(
      'SELECT Password FROM "User" WHERE UserID = :UserID',
      { UserID }
    );

    if (result.rows.length === 0) {
      throw new Error('User not found');
    }

    const storedPassword = result.rows[0][0];
    const isPasswordValid = await bcrypt.compare(currentPassword, storedPassword);
    if (!isPasswordValid) throw new Error('Current password is incorrect');

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await connection.execute(
      'BEGIN UpdatePassword(:UserID, :newPassword); END;',
      { newPassword: hashedNewPassword, UserID },
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

async function updateUserSettings(UserID, settings) {
  let connection;
  try {
    connection = await getConnection();
    await connection.execute(
      `UPDATE UserSettings 
      SET Settings = :settings 
      WHERE UserID = :UserID`,
      { settings: JSON.stringify(settings), UserID },
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
  addUser,
  getAllUsers,
  updateUser,
  deleteUser,
  checkUserLogin,
  updateUserPassword,
  updateUserSettings
};
