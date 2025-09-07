import React, { createContext, useState, useEffect } from "react";
import api from "./services/api/axios"; // your global axios instance

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("access_token") || null);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [isInitialized, setIsInitialized] = useState(false); // Track if auth check is complete
  
  console.log("AuthProvider mounted - Initial token:", token);
  console.log("Current user state:", user);
  console.log("Loading state:", isLoading);
  console.log("Initialized state:", isInitialized);

  // Auto-login on app start if valid token exists
  useEffect(() => {
    console.log("🚀 AuthProvider useEffect triggered - Starting auth initialization");
    
    const initializeAuth = async () => {
      const savedToken = localStorage.getItem("access_token");
      console.log("💾 Saved token from localStorage:", savedToken);
      
      if (savedToken) {
        console.log("✅ Token found, setting token state and verifying with backend");
        setToken(savedToken);
        try {
          console.log("🔍 Making request to /user/profile with token:", savedToken);
          
          // Verify token by fetching user profile
          const res = await api.get("/user/profile", {
            headers: { Authorization: `Bearer ${savedToken}` },
          });
          
          console.log("✅ Profile request successful:", res.data);
          setUser(res.data);
        } catch (error) {
          console.error("❌ Profile request failed:", error);
          console.error("Error details:", error.response?.data || error.message);
          
          // Token is invalid, clean up
          localStorage.removeItem("access_token");
          setToken(null);
          setUser(null);
        }
      } else {
        console.log("❌ No token found in localStorage");
      }
      
      console.log("🏁 Auth initialization complete");
      setIsLoading(false);
      setIsInitialized(true);
    };

    initializeAuth();
  }, []); // Run only once on component mount

  // Handle token changes (login/logout) - but skip during initialization
  useEffect(() => {
    console.log("🔄 Token change effect triggered - Token:", token, "Initialized:", isInitialized);
    
    if (!isInitialized) {
      console.log("⏳ Skipping token effect - still initializing");
      return; // Skip if still initializing
    }
    
    if (token) {
      console.log("🔍 Token changed, fetching user profile");
      // Set the authorization header for this request
      api
        .get("/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log("✅ Token change profile request successful:", res.data);
          setUser(res.data);
        })
        .catch((error) => {
          console.error("❌ Token change profile request failed:", error);
          logout(); // if token invalid, log out
        });
    }
  }, [token, isInitialized]);

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
      const res = await api.put("/user/profile", userData, {
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
    <AuthContext.Provider value={{ user, token, login, register, updateUser, changePassword, deleteAccount, logout, isLoading, isInitialized }}>
      {children}
    </AuthContext.Provider>
  );
};