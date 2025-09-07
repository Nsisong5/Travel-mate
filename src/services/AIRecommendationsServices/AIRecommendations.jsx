// contexts/AIRecommendationsContext.js
import React, { createContext, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../../AuthProvider";

export const AIRecommendationsContext = createContext();

export const AIRecommendationsProvider = ({ children }) => {
  const { user, token } = useContext(AuthContext);
   
  // State management
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  /**
   * Get authentication headers for API requests
   */
  const getAIRec = ()=>{
    const lcRecommendations = JSON.parse(localStorage.getItem("ai-recs"))
    console.log(lcRecommendations)
    return lcRecommendations 
  }
  
  const saveToLocalStorage = (data)=>{
    const lcRecommendations  = JSON.parse(localStorage.getItem("ai-recs"))
    lcRecommendations  && localStorage.removeItem("ai-recs")
    localStorage.setItem("ai-recs", JSON.stringify(data))
  }
  
   
  
  const getAuthHeaders = () => {
    const authToken = token || localStorage.getItem('access_token');
    if (!authToken) {
      throw new Error('No authentication token found. Please login again.');
    }
    return {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    };
  };

  /**
   * Clear any existing errors
   */
  const clearError = () => {
    setError(null);
  };

  /**
   * Get user AI recommendations from backend
   * @param {Object} filters - Optional filters for recommendations
   * @returns {Promise<Array>} Array of AI recommendations
   */
  const getUserAIRecommendations = async (filters = {}) => {
    if (!user) {
      throw new Error('User must be logged in to fetch recommendations');
    }

    setLoading(true);
    setError(null);
    
    try {
      console.log("Fetching AI recommendations for user:", user.email);
      
      // Build query parameters
      const params = new URLSearchParams();
      if (filters.category) params.append('category', filters.category);
      if (filters.location) params.append('location', filters.location);
      if (filters.type) params.append('type', filters.type);
      if (filters.min_rating) params.append('min_rating', filters.min_rating);
      if (filters.max_budget_score) params.append('max_budget_score', filters.max_budget_score);
      if (filters.limit) params.append('limit', filters.limit);
      if (filters.offset) params.append('offset', filters.offset);

      // Create URL with query string
      const queryString = params.toString();
      const url = queryString ? `user/ai-recommendations?${queryString}` : 'user/ai-recommendations';

      // Make authenticated API request
      const response = await api.get(url, {
        headers: getAuthHeaders()
      });

      console.log("AI recommendations loaded successfully:", response.data.length);
      setRecommendations(response.data);
      saveToLocalStorage(response.data)
      return response.data;

    } catch (err) {
      console.error("Error fetching AI recommendations:", err);
      
      let errorMessage = 'Failed to fetch AI recommendations';
      
      if (err.response?.status === 401) {
        localStorage.removeItem('access_token');
        errorMessage = 'Session expired. Please login again.';
      } else if (err.response?.status === 404) {
        errorMessage = 'AI recommendations service not available.';
      } else if (err.response?.data?.detail) {
        errorMessage = err.response.data.detail;
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
      
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get recommendations by type
   * @param {string} type - Type (Destinations, Hotels, Activities, Tips)
   * @param {number} limit - Number to return
   */
  const getByType = async (type, limit = 10) => {
    return getUserAIRecommendations({ type, limit });
  };

  /**
   * Get recommendations by category
   * @param {string} category - Category to filter by
   * @param {number} limit - Number to return
   */
  const getByCategory = async (category, limit = 10) => {
    return getUserAIRecommendations({ category, limit });
  };

  /**
   * Get high-rated recommendations
   * @param {number} minRating - Minimum rating (default: 4.0)
   * @param {number} limit - Number to return
   */
  const getHighRated = async (minRating = 4.0, limit = 10) => {
    return getUserAIRecommendations({ min_rating: minRating, limit });
  };

  /**
   * Get budget-friendly recommendations
   * @param {number} maxBudgetScore - Maximum budget score
   * @param {number} limit - Number to return
   */
  const getBudgetFriendly = async (maxBudgetScore = 70, limit = 10) => {
    return getUserAIRecommendations({ max_budget_score: maxBudgetScore, limit });
  };

  /**
   * Search recommendations by location
   * @param {string} location - Location to search
   * @param {number} limit - Number to return
   */
  const searchByLocation = async (location, limit = 10) => {
    return getUserAIRecommendations({ location, limit });
  };

  /**
   * Refresh current recommendations
   */
  const refreshRecommendations = async (filters = {}) => {
    return getUserAIRecommendations(filters);
  };

  // Context value
  const contextValue = {
    // State
    recommendations,
    setRecommendations,
    loading,
    error,
    user,
    getAIRec,
    
    // Main functions
    getUserAIRecommendations,
    refreshRecommendations,
    
    // Filter functions
    getByType,
    getByCategory,
    getHighRated,
    getBudgetFriendly,
    searchByLocation,
    
    // Utility functions
    clearError,
  };

  return (
    <AIRecommendationsContext.Provider value={contextValue}>
      {children}
    </AIRecommendationsContext.Provider>
  );
};

// Custom hook to use AI Recommendations context
export const useAIRecommendations = () => {
  const context = useContext(AIRecommendationsContext);
  if (!context) {
    throw new Error('useAIRecommendations must be used within an AIRecommendationsProvider');
  }
  return context;
};