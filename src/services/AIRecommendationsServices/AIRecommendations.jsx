// contexts/AIRecommendationsContext.js
import React, { createContext, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../../AuthProvider";

export const AIRecommendationsContext = createContext();

export const AIRecommendationsProvider = ({ children }) => {
  const { user, token } = useContext(AuthContext);

  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);




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




  const deleteRecommendation = async (id)=>{
      try{
         const res = api.delete(`/user/ai-recommendations/${id}/`, {headers: getAuthHeaders()})
         return res.data
      }catch(err){
        console.log(err)
        throw Error(err)
      }
  }


  const generateAiRecs = async ()=>{
      try{
         const res = api.get(`/control/trigger-recommendations/`, {headers: getAuthHeaders()})
         return res.data
      }catch(err){
        console.log(err)
        throw Error(err)
      }
  }
  

  const clearError = () => {
    setError(null);
  };


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


  const getTripAIRecommendations = async (tripId) => {
    if (!user) {
      throw new Error('User must be logged in to fetch recommendations');
    }

    setLoading(true);
    setError(null);

    try {
      const url = `/active_ai-recommendations/current_trip/${tripId}`;
      const response = await api.get(url, {
        headers: getAuthHeaders()
      });
      console.log("Active Trip AI recommendations loaded successfully:", response.data.length);
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


  const  getActiveTripRecDetail = async (recId) => {
    if (!user) {
      throw new Error('User must be logged in to fetch recommendations');
    }

    setLoading(true);
    setError(null);

    try {
      const url = `/active_ai-recommendations/ai_rec_detail/${recId}`;
      const response = await api.get(url, {
        headers: getAuthHeaders()
      });
      console.log("Active Trip AI recommendation loaded successfully:", response.data.length);
      return response.data;

    } catch (err) {
      console.error("Error fetching AI recommendation:", err);    
      let errorMessage = 'Failed to fetch AI recommendation';

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


  const getByType = async (type, limit = 10) => {
    return getUserAIRecommendations({ type, limit });
  };

  const getByCategory = async (category, limit = 10) => {
    return getUserAIRecommendations({ category, limit });
  };


  const getHighRated = async (minRating = 4.0, limit = 10) => {
    return getUserAIRecommendations({ min_rating: minRating, limit });
  };


  const getBudgetFriendly = async (maxBudgetScore = 70, limit = 10) => {
    return getUserAIRecommendations({ max_budget_score: maxBudgetScore, limit });
  };

  const searchByLocation = async (location, limit = 10) => {
    return getUserAIRecommendations({ location, limit });
  };


  const refreshRecommendations = async (filters = {}) => {
    return getUserAIRecommendations(filters);
  };





  const contextValue = {
    // State
    recommendations,
    setRecommendations,
    loading,
    error,
    user,
    getAIRec,
    generateAiRecs,
    deleteRecommendation,
    // Main functions
    getUserAIRecommendations,
    refreshRecommendations,
    getTripAIRecommendations,
    getActiveTripRecDetail,
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