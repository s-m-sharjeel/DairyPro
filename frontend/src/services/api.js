import axios from "axios";

const api = axios.create({
  baseURL: "http://your-backend-url", // Replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});


export const updateUserSettings = async (data) => {
  try {
    const response = await api.put('/user/settings', data);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update settings');
  }
};

export default api;


