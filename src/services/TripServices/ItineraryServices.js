import api from "../api/axios"
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider";


export const useItineraryServices  = () =>{
  const { user, token } = useContext(AuthContext);
   
  const getHeaders = () => {
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
 
 
 const getItinerary = async (itId)=>{
    const id = parseInt(itId)
    try{
       const response = await api.get(`/trip/itineraries/${id}`,{headers:getHeaders()})
       return response.data
    }catch(err){
      console.log(err.response?.data?.detail)
       throw Error(err)
    }
  }
  

 const createItinerary = async (data)=>{
    if(data.id){
     return  updateItinerary(data)
    };
    
    try{
       const response = await api.post(`/trip/etineraries`,data,{headers:getHeaders()})
       return response.data
    }catch(err){
      console.log(err.response?.data?.detail)
       throw Error(err)
    }
  }; 
    
        
 const deleteItinerary = async (itId)=>{
    const id = parseInt(itId)
    try{
       const response = await api.delete(`/trip/etineraries/${id}`,{headers:getHeaders()})
       return response.data
    }catch(err){
      console.log(err.response?.data?.detail)
       throw Error(err)
    }
  };
  
    
 const getTripItineraries = async (tripId)=>{
    const id = parseInt(tripId)
    try{
       const response = await api.get(`/trip/trip/etineraries/${id}`,{headers:getHeaders()})
       return response.data
    }catch(err){
      console.log(err.response?.data?.detail)
       throw Error(err)
    }
  };
          
          
  
 const updateItinerary = async ({date,day,id,items,title,trip_id})=>{
    const newData = {date,day,items,title,trip_id} 
    console.log("update data: ",newData)
    try{
       const response = await api.patch(`/trip/etineraries/${parseInt(id)}`,newData,{headers:getHeaders()})
       return response.data
    }catch(err){
      console.log(err.response?.data?.detail)
       throw Error(err)
    }
  }
  
      
  
 return {
  getItinerary,
  updateItinerary,
  getTripItineraries,
  deleteItinerary,
  createItinerary
 }
};