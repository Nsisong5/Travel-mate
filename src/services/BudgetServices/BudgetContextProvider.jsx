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
  console.log("budget data: ", budgetData)
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
      
 const getUsedAmount = (budgets) => {
  const amount = 0;
  if (budgets.length > 0){
   console.log(budgets)
   budgets.forEach(budget => amount += budget.amount )
   console.log("amount used: ",amount)}
  return amount
 };    
      
 const updateBudget = async (budgetId, updateData) => {
  console.log("update data: ",budgetId, updateData)
  try {
    const response = await api.patch(`/user/budgets/${parseInt(budgetId)}`, updateData, {
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error updating budget:", error);
    throw error;
  }
 };
      
                                       
 const getYBudgets = async (id) => {
  try {
    const response = await api.get(`/user/budgets/yearly/${id}`,{
      headers: getHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching budgets:", error);
    throw error;
  }
 };
                                                                            
  const getYearlyBudgetUsedAmount = async (budgetId)=>{
    const id = parseInt(budgetId)
    try{
        const res = await api.get(`/user/budgets/yearly/${id}`,{ headers: getHeaders()})      
        var amount = 0;
        res.data.forEach( budget =>{
           amount += budget.amount
        })
        return amount
     }catch(err){
      console.log(err.response?.data?.detail)
     }   
  }                                                                                                                                     
  
                                                                            
 const getYearlyBudgetBudgets = async (budgetId)=>{
     
     try{
        const res = await api.get(`/user/budgets/yearly/${parseInt(budgetId)}`,{ headers: getHeaders()})
        localStorage.setItem("userBudgets",JSON.stringify(res.data))
        return res
     }catch(err){
      console.log(err.response?.data?.detail)
     }   
 }                                                                                                              

 const getTripBudget = async (tripId)=>{
     const id = parseInt(tripId);
     try{
        const res = await api.get(`/user/budgets/trip/${id}`,{ headers: getHeaders()})
        return res.data
     }catch(err){
      console.log(err.response?.data?.detail)
     }   
 }                                                                                                              
        
        
                
 const getAllocations = async (budgetId)=>{
     var res = [];
     try{
        if (budgetId){
         const response = await api.get(`/user/allocations/${budgetId}`)
         return response.data
        } else{
            const res = await api.get(`/user/allocations`)      
            return res.data 
        }
     }catch(err){
      console.log(err.response?.data?.detail)
     }   
 }                                                                                                                                                                                                                                                                                                                             
 
 



  const updateAllocation = async (payload)=>{
 
     const allocId = payload.id;
     try{
         const response = await api.patch(`/user/allocations/${allocId}`, payload)
         return response 
     }catch(err){
      console.log(err.response?.data)
     }   
 }     
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
  const contextValue = {
    createYearlyBudget,
    getYearlyBudget,
    updateYearlyBudget,
    createBudget,
    updateBudget,
    getYBudgets,
    getYearlyBudgetUsedAmount,
    getYearlyBudgetBudgets,
    getAllocations,
    getTripBudget,
    updateAllocation,
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