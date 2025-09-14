import React, { createContext, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../../AuthProvider";

export const BudgetContext = createContext();

   export const BudgetContextProvider = ({ children }) => {
   const { user, token } = useContext(AuthContext);

   const getHeaders = ()=>{
    return {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
     };
    }
    
    const createYearlyBudget = async(budgetData)=>{
          console.log("BudgetData: ", budgetData)
          try{
              const response = await api.post("/yearly/budgets", budgetData,{
                 headers: getHeaders()
              }) 
              localStorage.setItem("lcBudget",JSON.stringify(response.data))
              return response.data  
          }catch(err){
            console.log("yearly budget creation failed: ",err.response.data.detail)
            throw Error(err.response?.data?.detail)         
         }     
    }


    const getYearlyBudget = async()=>{
          try{
              const response = await api.get("/yearly/budgets",{
                headers: getHeaders()
              })
              localStorage.setItem("lcBudget", JSON.stringify(response.data))          
              return response.data   
          }catch(err){
            console.log("yearly budget fetch failed: ",err.response?.data?.detail)    
            throw Error("error during budget fetch:",err)
          }    
    
    } 

            

    const updateYearlyBudget = async(data)=>{
        console.log('data to update yearly budget: ',data)
          try{
              const response = await api.patch("/yearly/budgets", data,{
                headers: getHeaders()
              })
              localStorage.setItem("lcBudget", JSON.stringify(response.data))          
              return response.data   
          }catch(err){
            console.log("yearly budget update failed: ",err.response)    
            throw Error("error during budget update:",err)
          }
    }        
             

  const createBudget = async (budgetData) => {
  try {
    const response = await api.post(`/user/budgets`, budgetData, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error creating budget:", error);
    throw error;
  }
 };                
      
 const updateBudget = async (budgetId, updateData) => {
  try {
    const response = await api.patch(`/user/budgets/${budgetId}`, updateData, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error updating budget:", error);
    throw error;
  }
 };
                                       
                                                                                                         
  const contextValue = {
    createYearlyBudget,
    getYearlyBudget,
    updateYearlyBudget,
    createBudget,
    updateBudget
  };

  return (
    <BudgetContext.Provider value={contextValue}>
      {children}
    </BudgetContext.Provider>
  );
};


export const useBudgetContext  = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudgeContext must be used within an useBudgetContextProvider');
  }
  return context;
};