const UserModel = require('../models/user');

async function addUser(req, res) {
  const { name, email, role, password } = req.body;

  try {
    // console.log(name);
    // console.log(email);
    // console.log(role);
    // console.log(password);
    await UserModel.addUser({ name, email, role, password });
    
    res.status(201).send('User added successfully');
  } catch (err) {
    res.status(500).send(err.message || 'Error adding User');
  }
}

async function getAllUsers(req, res) {
  try {
    const Users = await UserModel.getAllUsers();
    res.json(Users);
  } catch (err) {
    res.status(500).send('Error fetching Users');
  }
}

async function updateUser(req, res) {
  const { UserID } = req.params;

  try {
    await UserModel.updateUser(UserID, req.body);
    res.send('User updated successfully');
  } catch (err) {
    res.status(500).send(err.message || 'Error updating User');
  }
}

async function deleteUser(req, res) {
  const { UserID } = req.params;

  try {
    await UserModel.deleteUser(UserID);
    res.send('User deleted successfully');
  } catch (err) {
    res.status(500).send(err.message || 'Error deleting User');
  }
}

async function checkUserLogin(req, res) {
  const { email, password } = req.body;

  try {
    const user = await UserModel.checkUserLogin(email, password);
    if (!user) return res.status(401).send('Invalid login credentials');

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).send(err.message || 'Error logging in User');
  }
}

async function updateUserPassword(req, res) {
  const { userID } = req.params;
  const { currentPassword, newPassword } = req.body;

  try {
    await UserModel.updateUserPassword(userID, currentPassword, newPassword);
    res.send('Password updated successfully');
  } catch (err) {
    res.status(500).send(err.message || 'Error updating password');
  }
}

async function updateUserSettings(req, res) {
  const { UserID } = req.params;
  const settings = req.body; // Expect settings as an object

  try {
    await UserModel.updateUserSettings(UserID, settings);
    res.send('User settings updated successfully');
  } catch (err) {
    res.status(500).send(err.message || 'Error updating User settings');
  }
}



module.exports = {
  addUser,
  getAllUsers,
  updateUser,
  updateUserSettings,
  deleteUser,
  checkUserLogin,
  updateUserPassword,
};
