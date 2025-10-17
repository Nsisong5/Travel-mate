import api from "../api/axios";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider";
import { createActiveTripRecommendations }from "./createActiveTripRecommendations"


export const useTripServices = () => {
  // Get user and token from AuthContext for authentication
  const { user, token } = useContext(AuthContext);
  const { createTripRecommendations,createTravelTips }  = createActiveTripRecommendations()
  /**
   * Get authentication headers for API requests
   * Uses token from AuthContext as preferred method
   */
  const getAuthHeaders = () => {
    // Primary: Use token from AuthContext if available
    const authToken = token || localStorage.getItem('access_token');

    if (!authToken) {
      throw new Error('No authentication token found. Please login again.');
    }

    return {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    };
  };



   const deleteTrip = async (id)=>{
      try{
          const response = await api.delete(`/trips/${id}`,{ headers: getAuthHeaders()})
          return response.data
      }catch(error){
        console.log("Error deleting trip: ",error)
      }
   }


  /**
   * Create a new trip
   * @param {Object} tripData - Trip data object
   * @returns {Promise} - Created trip data
   */
  const createTrip = async (tripData) => {
    tripData["cost_estimated"] = true
    tripData["has_budget"] = false
    tripData.origin = tripData.origin || "Not set!"
    console.log("trip data to be save: ",tripData)
    try {
        const response = await api.post('/trips', tripData, {
        headers: getAuthHeaders()
      });
      console.log("trip created: ", response.data)       
      await createTripRecommendations(response.data);
      await createTravelTips(response.data);

    } catch (error) {
      console.error("Error creating trip:", error);
      console.error("Error response:", error.response?.data);

      // Handle specific error types
      if (error.response?.status === 401) {
        localStorage.removeItem('access_token');
        throw new Error('Session expired. Please login again.');
      }

      if (error.response?.status === 422) {
        console.error("422 Validation Error Details:", error.response?.data?.detail);
        throw new Error(`Validation error: ${JSON.stringify(error.response?.data?.detail)}`);
      }

      throw new Error(error.response?.data?.detail || error.message || 'Failed to create trip');
    }
  };

  /**
   * Get user's trip history (completed trips)
   * @returns {Promise<Array>} - Array of completed trips
   */
  const getTripHistory = async () => {
    try {
      console.log("Fetching trip history for user:", user?.email);

      const response = await api.get('/trips/history', {
        headers: getAuthHeaders()
      });

      console.log("Trip history fetched successfully:", response.data);
      return response.data;

    } catch (error) {
      console.error("Error fetching trip history:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem('access_token');
        throw new Error('Session expired. Please login again.');
      }

      throw new Error(error.response?.data?.detail || error.message || 'Failed to fetch trip history');
    }
  };

  /**
   * Get user's upcoming trips (planned and upcoming status)
   * @returns {Promise<Array>} - Array of upcoming trips
   */
  const getUpcomingTrips = async () => {
    try {
      console.log("Fetching upcoming trips for user:", user?.email);

      const response = await api.get('/trips/upcoming', {
        headers: getAuthHeaders()
      });

      console.log("Upcoming trips fetched successfully:", response.data);
      return response.data;

    } catch (error) {
      console.error("Error fetching upcoming trips:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem('access_token');
        throw new Error('Session expired. Please login again.');
      }

      throw new Error(error.response?.data?.detail || error.message || 'Failed to fetch upcoming trips');
    }
  };



  const getTravelTips = async (tripId) => {
    try {

      const response = await api.get(`/travel-tips/by-trip/${tripId}`, {
        headers: getAuthHeaders()
      });

        console.log("Travel tips fetched:", response.data);
        return response.data;

    } catch (error){
      console.error("Error fetching travel tips:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem('access_token');
        throw new Error('Session expired. Please login again.');
      }

      throw new Error(error.response?.data?.detail || error.message || 'Failed to fetch upcoming trips');
   }

  };





  /**
   * Get all user's trips (both history and upcoming)
   * @returns {Promise<Object>} - Object containing history and upcoming arrays
   */

    const getUserTrips = async () => {

    try {
      const response = await api.get('/trips', {
        headers: getAuthHeaders()
      });

      localStorage.setItem("trips", response.data)
      return response.data;

    } catch (error) {
      console.error("Error fetching upcoming trips:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem('access_token');
        throw new Error('Session expired. Please login again.');
      }

      throw new Error(error.response?.data?.detail || error.message || 'Failed to fetch upcoming trips');
    }
  }; 




    const getTrip = async (id) => {

    try {
      const response = await api.get(`/trips/${id}`, {
        headers: getAuthHeaders()
      });

      localStorage.setItem("current_trip", response.data)
      return response.data;

    } catch (error) {
      console.error("Error fetching current trip:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem('access_token');
        throw new Error('Session expired. Please login again.');
      }

      throw new Error(error.response?.data?.detail || error.message || 'Failed to fetch upcoming trips');
    }
  }; 



    const updateTrip = async (payload,id) => {
    console.log("trip update payload: ",payload)
    const data = {
       status: payload.status,
       style: payload.style,
       start_date: payload.startDate,
       end_date: payload.endDate,
       local_gov: payload.city,
       cost: payload.cost,
       country: payload.country,
       cost_estimated: payload.aiEstimated,
       destination: payload.destination,
       state: payload.state,
       means: payload.meansOfTravel,
       budget_range: payload.budgetRange,
       origin: payload.origin,
       rating: payload.rating,
       title: payload.title
    } 

    try {
      const response = await api.patch(`/trips/${id}`, data,{
        headers: getAuthHeaders()
      });

      localStorage.setItem("current_trip", response.data)
      return response.data;

    } catch (error) {
      console.error("Error fetching current trip:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem('access_token');
        throw new Error('Session expired. Please login again.');
      }

      throw new Error(error.response?.data?.detail || error.message || 'Failed to fetch upcoming trips');
    }
  }; 





  const getAllTrips = async () => {
    try {
        const [historyResponse, upcomingResponse] = await Promise.all([
        api.get('/trips/history', { headers: getAuthHeaders() }),
        api.get('/trips/upcoming', { headers: getAuthHeaders() })
      ]);

      const allTrips = {
        history: historyResponse.data,
        upcoming: upcomingResponse.data,
        total: historyResponse.data.length + upcomingResponse.data.length
      };

      return allTrips;

    } catch (error) {
      console.error("Error fetching all trips:", error);

      if (error.response?.status === 401) {
        localStorage.removeItem('access_token');
        throw new Error('Session expired. Please login again.');
      }

      throw new Error(error.response?.data?.detail || error.message || 'Failed to fetch trips');
    }
  };

  /**
   * Get trip statistics for the user
   * @returns {Promise<Object>} - Trip statistics object
   */
  const getTripStats = async () => {
    try {
      const allTrips = await getAllTrips();

      const stats = {
        total_trips: allTrips.total,
        completed_trips: allTrips.history.length,
        upcoming_trips: allTrips.upcoming.length,
        countries_visited: [...new Set(allTrips.history.map(trip => 
          trip.destination.split(',').pop().trim()
        ))].length,
        total_days_traveled: allTrips.history.reduce((total, trip) => {
          const days = parseInt(trip.duration) || 0;
          return total + days;
        }, 0)
      };

      return stats;

    } catch (error) {
      console.error("Error calculating trip stats:", error);
      throw new Error('Failed to calculate trip statistics');
    }
  };

  // Return all available functions
  return {
    // Trip creation
    createTrip,
    deleteTrip,
     getTravelTips,
    // Trip retrieval
    getTripHistory,
    getUpcomingTrips,
    getAllTrips,
    getUserTrips,
    // Trip analytics
    getTripStats,
    getTrip,
    updateTrip    // TODO: Replace with actual API call
      //   headers: { Authorization: `Bearer ${authToken}` }
      // });
      // Expected response: { id, title, start_date, end_date, cover_image, images, itinerary, budget, cost_estimated, progress_percent, days_left }

      // Simulate API call
  };
};