import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.post("/signin", { email, password });
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      console.error("Login error", error);
    }
  };

  const register = async (name, email, password, role) => {
    try {
      const response = await axios.post("/signup", {
        name,
        email,
        password,
        role,
      });
      return response.data;
    } catch (error) {
      console.error("Registration error", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
