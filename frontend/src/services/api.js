import axios from "axios";

const api = axios.create({
  baseURL: "http://your-backend-url", // Replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
