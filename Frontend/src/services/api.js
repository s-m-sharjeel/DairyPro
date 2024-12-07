import axios from 'axios';

// Base URL for the backend
const BASE_URL = 'http://localhost:3001';  // Adjust this as necessary for your backend

// Function to get all cattle
export const getAllCattle = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data; // Data returned from the backend (array of cattle)
  } catch (error) {
    console.error("Error fetching all cattle:", error);
    throw error;
  }
};

// Function to get a specific cattle by ID
export const getCattleById = async (cattleID) => {
  try {
    const response = await axios.get(`${BASE_URL}/${cattleID}`);
    return response.data; // Cattle data for the given ID
  } catch (error) {
    console.error(`Error fetching cattle with ID ${cattleID}:`, error);
    throw error;
  }
};

// Function to add a new cattle
export const addCattle = async (cattleData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/cattle`, cattleData); // Ensure the endpoint is correct
    return response.data;
  } catch (error) {
    console.error("Error adding cattle:", error);
    throw error;
  }
};

// Function to add a new feed
export const addFeed = async (feedData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/feed`, feedData); // Ensure the endpoint is correct
    return response.data;
  } catch (error) {
    console.error("Error adding feed:", error);
    throw error;
  }
};

// Function to update an existing cattle
export const updateCattle = async (cattleID, cattleData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${cattleID}`, cattleData);
    return response.data; // Updated cattle data
  } catch (error) {
    console.error(`Error updating cattle with ID ${cattleID}:`, error);
    throw error;
  }
};

// Function to delete a cattle by ID
export const deleteCattle = async (cattleID) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${cattleID}`);
    return response.data; // Confirmation message or status of deletion
  } catch (error) {
    console.error(`Error deleting cattle with ID ${cattleID}:`, error);
    throw error;
  }
};

// Function to get all milk production records
export const getMilkProductionList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/milkproduction`);
    return response.data; // List of milk production records
  } catch (error) {
    console.error("Error fetching milk production list:", error);
    throw error;
  }
};

// Function to get milk production by cattle ID
export const getMilkProductionByCattleId = async (cattleID) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/milkproduction/${cattleID}`);
    return response.data; // Milk production data for the given cattle ID
  } catch (error) {
    console.error(`Error fetching milk production for cattle ID ${cattleID}:`, error);
    throw error;
  }
};

// Function to add a new milk production record
export const addMilkProduction = async (milkData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/milkproduction`, milkData);
    return response.data; // Added milk production record
  } catch (error) {
    console.error("Error adding milk production:", error);
    throw error;
  }
};

// Function to update an existing milk production record
export const updateMilkProduction = async (recordID, milkData) => {
  try {
    const response = await axios.put(`${BASE_URL}/api/milkproduction/${recordID}`, milkData);
    return response.data; // Updated milk production record
  } catch (error) {
    console.error(`Error updating milk production with ID ${recordID}:`, error);
    throw error;
  }
};

// Function to delete a milk production record
export const deleteMilkProduction = async (recordID) => {
  try {
    const response = await axios.delete(`${BASE_URL}/api/milkproduction/${recordID}`);
    return response.data; // Confirmation message or status of deletion
  } catch (error) {
    console.error(`Error deleting milk production with ID ${recordID}:`, error);
    throw error;
  }
};

export const getAllBR = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data; // Data returned from the backend (array of BR)
  } catch (error) {
    console.error("Error fetching all BR:", error);
    throw error;
  }
};

export const getAllCows = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/cow`); // Assuming the endpoint for cows is '/api/cows'
    return response.data; // Data returned from the backend (array of cows)
  } catch (error) {
    console.error("Error fetching all cows:", error);
    throw error;
  }
};

export const updatePassword = async ({ currentPassword, newPassword }, farmerID) => {
  //const farmerID = localStorage.getItem("farmerID");
  console.log('eche: ', farmerID);  // Ensure farmerID is logged correctly
  //console.log(localStorage.getItem("farmerID"));

  if (!farmerID) {
    throw new Error("Farmer ID is missing.");
  }

  try {
    const response = await axios.put(`http://localhost:3001/api/farmer/${farmerID}/password`, {
      currentPassword,
      newPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating password:", error.response || error);
    throw error;
  }
};

// Add this function in the api.js file
export const updateUserSettings = async (formData, farmerID) => {
  console.log(farmerID);
  const response = await axios.put(`${BASE_URL}/api/farmer/${farmerID}`, formData);
  return response.data;
};


export default axios;
