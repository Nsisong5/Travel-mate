import React, { createContext, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../../AuthProvider";

export const SavedPlaceContext = createContext();

   export const SavedPlaceContextProvider = ({ children }) => {
   const { user, token } = useContext(AuthContext);

   const getHeaders = ()=>{
    return {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
     };
    }

   
    const savePlace = async(placeData)=>{
    console.log(placeData)
    try {
      const response = await api.post("/places", placeData, {
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Error saving place:", error.response?.data.detail || error.message.detail);
      throw new Error(
        error.response?.data?.detail || "Failed to save place. Please try again."
      );
     }
   } 
   
   
    const getSavePlaces = async()=>{
    try {
      const response = await api.get("places/saved",{
        headers: getHeaders(),
      });
      return response.data;
    } catch (error) {
      console.error("Error saving place:", error.response?.data.detail || error.message.detail);
      throw new Error(
        error.response?.data?.detail || "Failed to save place. Please try again."
      );
     }
   } 
   
   const removeSavePlace = async(data)=>{
    try {
      const response = await api.delete(`places/${data}`,{
        headers: getHeaders(),
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Error removing place:", error.response?.data.detail || error.message.detail);
      throw new Error(
        error.response?.data?.detail || "Failed to remove saveplace. Please try again."
      );
     }
   }   
  
  
  const contextValue = {
    savePlace,
    getSavePlaces,
    removeSavePlace,
  };

  return (
    <SavedPlaceContext.Provider value={contextValue}>
      {children}
    </SavedPlaceContext.Provider>
  );
};


export const useSavedPlaceContext = () => {
  const context = useContext(SavedPlaceContext);
  if (!context) {
    throw new Error('useAIRecommendations must be used within an AIRecommendationsProvider');
  }
  return context;
};