const { getConnection } = require('../db'); // Importing the database connection utility


async function addFarmer({ name, contactInfo, role }) {
    let connection;
    try {
      connection = await getConnection();
      await connection.execute(
        `INSERT INTO Farmer (Name, ContactInfo, Role, Password) VALUES (:name, :contactInfo, :role, :password)`,
        [name, contactInfo, role, password],
        { autoCommit: true }
      );
    } catch (err) {
      console.error('Error adding farmer:', err);
      throw err;
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
        password: row[4],
      }));
    } catch (err) {
      console.error('Error fetching farmers:', err);
      throw err;
    } finally {
      if (connection) await connection.close();
    }
  }
  
  // async function getFarmerById(farmerID) {
  //   let connection;
  //   try {
  //     connection = await getConnection();
  //     const result = await connection.execute(
  //       'SELECT * FROM Farmer WHERE FarmerID = :farmerID',
  //       [farmerID]
  //     );
  //     if (result.rows.length === 0) throw new Error('Farmer not found');
  //     const row = result.rows[0];
  //     return {
  //       farmerID: row[],
  //       name: row[1],
  //       contactInfo: row[2],
  //       role: row[3],
  //       //password: row[4],
  //     };
  //   } catch (err) {
  //     console.log('yeh scn: ',farmerID);
  //     console.error('Error fetching farmer by ID:', err);
  //     throw err;
  //   } finally {
  //     if (connection) await connection.close();
  //   }
  // }
  
  async function updateFarmer(farmerID, { name, contactInfo, role }) {
    let connection;
    try {
      connection = await getConnection();
      await connection.execute(
        `UPDATE Farmer 
         SET Name = :name, ContactInfo = :contactInfo, Role = :role, Password = :password
         WHERE FarmerID = :farmerID`,
        [name, contactInfo, role, farmerID],
        { autoCommit: true }
      );
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

  async function checkFarmerLogin(email, password) {
    let connection;
    try {
        console.log('Attempting to connect to the database...');
        connection = await getConnection();
        
        console.log('Executing query with email and password:', { email, password });
        const query = `
            SELECT FarmerID, Name, ContactInfo, Role 
            FROM Farmer 
            WHERE ContactInfo = :email AND Password = :password
        `;
        const result = await connection.execute(query, { email, password });
        
        console.log('Query result:', result.rows);
        
        if (result.rows.length > 0) {
            const row = result.rows[0];
            console.log('Farmer found:', row);
            return {
                farmerID: row[0],
                name: row[1],
                contactInfo: row[2],
                role: row[3],
            };
        } else {
            console.log('No matching farmer found.');
        }
        return null; // No matching farmer
    } catch (err) {
        console.error('Error checking farmer login:', err);
        throw err;
    } finally {
        if (connection) {
            console.log('Closing the database connection...');
            await connection.close();
        }
    }
}


  
  module.exports = {
    checkFarmerLogin,
    addFarmer,
    getAllFarmers,
    //getFarmerById,
    updateFarmer,
    deleteFarmer
  };
  