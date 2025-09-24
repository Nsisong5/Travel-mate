import React, { createContext, useState, useEffect } from "react";
import api from "./services/api/axios"; // your global axios instance

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // Don't initialize from localStorage here
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Auto-login on app start if valid token exists
  useEffect(() => {
    console.log("🚀 AuthProvider useEffect triggered - Starting auth initialization");
    
    const initializeAuth = async () => {
      const savedToken = localStorage.getItem("access_token");
   
      if (savedToken) {
        try {
        
          // Verify token by fetching user profile
          const res = await api.get("/user/profile", {
            headers: { Authorization: `Bearer ${savedToken}` },
          });
          
          setUser(res.data);
          setToken(savedToken); // Set token AFTER successful verification
        } catch (error) {
          console.error("❌ Profile request failed:", error);
          console.error("Error details:", error.response?.data || error.message);
                 
          // Token is invalid, clean up
          console.log("🧹 Cleaning up invalid token");
          
          localStorage.removeItem("access_token");
          setToken(null);
          setUser(null);
        }
      } else {
        console.log("❌ No token found in localStorage");
      }
      setIsLoading(false);
      setIsInitialized(true);
    };

    initializeAuth();
  }, []); // Run only once on component mount

  const login = async (credentials) => {
    try {
      const res = await api.post("/auth/login", credentials);
      const { access_token } = res.data;

      // Store token in localStorage
      localStorage.setItem("access_token", access_token);
      setToken(access_token);

      // Use the newly received token (access_token) instead of the old token state
      const userRes = await api.get("/user/profile", {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      setUser(userRes.data);
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.detail || error.message);
    }
  };

  const register = async (credentials) => {
    try {
      // credentials should include { email, password, full_name }
      const res = await api.post("/auth/register", credentials);
      const { access_token } = res.data;

      // Store token in localStorage
      localStorage.setItem("access_token", access_token);
      setToken(access_token);

      // Use the newly received token to get user profile
      const userRes = await api.get("/user/profile", {
        headers: { Authorization: `Bearer ${access_token}` },
      });

      setUser(userRes.data);
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.detail || error.message);
    }
  };

  const updateUser = async (userData) => {
    try {
      // userData can include any fields to update: { full_name, email, password, etc. }
      const res = await api.patch("/user/profile", userData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update user state with the returned data
      setUser(res.data);
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || error.message);
    }
  };

  const changePassword = async (passwordData) => {
    try {
      // passwordData should include { current_password, new_password }
      await api.patch("/user/change-password", passwordData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.detail || error.message);
    }
  };

  const deleteAccount = async () => {
    try {
      await api.delete("/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Log out the user after account deletion
      logout();
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.detail || error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser, // Add setUser to the context value
      token, 
      login, 
      register, 
      updateUser, 
      changePassword, 
      deleteAccount, 
      logout, 
      isLoading, 
      isInitialized 
    }}>
      {children}
    </AuthContext.Provider>
  );
};