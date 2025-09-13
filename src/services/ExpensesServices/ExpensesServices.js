import React, { createContext, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../../AuthProvider";



export const useExpenses = () => {
   const { user, token } = useContext(AuthContext);      
   const getHeaders = ()=>{
    return {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
     };
    }
  
  const getExpenses = async (tripId) => {
  try {
    const response = await api.get(`/user/expenses`, {
      params: { trip_id: tripId },
      headers: getHeaders(),
    });
    return response.data;
   } catch (error) {
    console.error("Error fetching expenses:", error);
    throw error;
   }
  }; 
  
  const addExpense = async (expenseData) => {
  try {
    const response = await api.post(`/user/expenses`, expenseData, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error adding expense:", error);
    throw error;
  }
};

   const deleteExpense = async (expenseId) => {
  try {
    const response = await api.delete(`/user/expenses/${expenseId}`, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting expense:", error);
    throw error;
  }
 };
 
  const updateExpense = async (expenseId, updateData) => {
  try {
    const response = await api.patch(`/user/expenses/${expenseId}`, updateData, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error updating expense:", error);
    throw error;
  }
 };


    
  
  return {
    getExpenses,
    addExpense,
    updateExpense,
    deleteExpense
  };
};
