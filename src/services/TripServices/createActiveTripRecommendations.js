import api from "../api/axios";
import { AuthContext } from "../../AuthProvider";

export const  createActiveTripRecommendations = ()=>{
  const getAuthHeaders = () => {
    
    // Primary: Use token from AuthContext if available
    const authToken = localStorage.getItem('access_token');
    
    if (!authToken) {
      throw new Error('No authentication token found. Please login again.');
    }
    
    return {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    };
  };
  
      
   const  createTripRecommendations = async (tripData)=>{  
   try{
     tripData["trip_type"] = tripData.style
      const res = await api.post("/api/travel-recs/current-trip",tripData,{ headers: getAuthHeaders()})
      return res.data
   } catch(err){
     console.log(err.response.data.detail)
     throw Error(err)
   }
  }
  
   const  createTravelTips = async (tripData)=>{  
   console.log("trip data: ",tripData)
   const newData = {}
   newData["destination"] = tripData.destination
   newData["country"] =  tripData.country
   newData["trip_id"] = tripData.id
   
   try{
      const res = await api.post("/api/travel-recs/travel-tips", newData,{ headers: getAuthHeaders()})
      console.log("travel tips: ",res.data)
      return res.data
   } catch(err){
     console.log(err.response.data.detail)
     throw Error(err)
   }
  }  
  
  
  return{
    createTripRecommendations,
    createTravelTips,
  }

}


