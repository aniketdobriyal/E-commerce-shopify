import { createContext, useContext, useState } from "react";
import { loginUser, registerUser, verifyUser } from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);
  const [loading, setLoading] = useState(false);

  // -------- Login --------
  const login = async (email, password) => {
    try {
      setLoading(true);
      const data = await loginUser(email, password);

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setToken(data.token);
      setUser(data.user);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    } finally {
      setLoading(false);
    }
  };

  // -------- Register --------
  const register = async (name, email, password, phone) => {
    try {
      setLoading(true);
      const data = await registerUser(name, email, password, phone);
      return { success: true, message: data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    } finally {
      setLoading(false);
    }
  };

  // -------- Verify --------
  const verifyEmail = async (token) => {
    try {
      setLoading(true);
      const data = await verifyUser(token);
      return { success: true, message: data.message };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Verification failed",
      };
    } finally {
      setLoading(false);
    }
  };

  // -------- Logout --------
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, loading, register, verifyEmail }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
