import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, AlertCircle } from 'lucide-react';
import EmptyBudgetState from './components/EmptyBudgetState';
import YearlyBudgetCard from './components/YearlyBudgetCard';
import TripBudgetsList from './components/TripBudgetsList';
import BudgetModal from './components/BudgetModal';
import styles from './YearlyTripBudgetPage.module.css';
import { useNavigate } from "react-router-dom";
import { formatBudgetAmount } from '../../utils/BudgetPage/getBudgetFeedback';
import { useBudgetContext } from "../../services/BudgetServices/BudgetContextProvider"
import { useTripServices } from "../../services/TripServices/TripServices"

const YearlyBudgetManager = () => {
  const navigate = useNavigate();
  const [yearlyBudget, setYearlyBudget] = useState(null);
  const handleTripCreate =()=>navigate("/trip_budget");
  const { createYearlyBudget,getYearlyBudget, updateYearlyBudget,getYBudgetst,getYearlyBudgetUsedAmount} = useBudgetContext()
  const [ usedBudget,setUsedBudegt ] = useState(0)
  const [remaining,setRemaining] = useState(0)
  const { getUserTrips } = useTripServices()
  const [trips,setTrips ] = useState([])
  const {getYearlyBudgetBudgets, getAllocations } = useBudgetContext()
  const [tripBudgets, setTripBudgets] = useState([]);

  const [modalState, setModalState] = useState({
    isOpen: false,
    type: 'create', // 'create', 'edit-yearly', 'edit-trip'
    editingTrip: null
  });
  
  useEffect(()=>{
   const fetchAll = async ()=>{
     const fetchedYearlyBudget = await fetchYearlyBudget();
     const usedAmount = await fetchUsedBudegtAMount(fetchedYearlyBudget.id) || 0;    
     getRemaining(fetchedYearlyBudget.total, usedAmount)
     const trips = await getUserTrips();
     const budgets = await getYearlyBudgetBudgets(fetchedYearlyBudget.id)
     const allocations = await getAllocations();
     trips.map(trip=> getTripsBudgets(trip,budgets,allocations));
   }
   
   fetchAll();
  },[])
  

  
  const getTripsBudgets = async(trip,budgets, allocations)=>{     
       //console.log("trip: ",trip,"budgets: ", budgets,"allocations: ", allocations)
        var matchBudget = null;
        var allocated = 0; 
        var data = {
         id:trip.id,
         title: trip.title,
         destination: trip.destination,
         
        };        
       
        if(budgets.data.length > 0){
          budgets.data.map(budget=>{  
          if(budget.trip_id == trip.id){
             allocations.map(allocation =>{
             if (allocation.budget_id == budget.id){
                allocated += allocation.allocated;;             
                matchBudget  = budget.amount;
          } 
        })}})}
        
        data["allocated"] = allocated; 
        data["spent"] = allocated;
        data["status"] = trip.status;
        data["dates"] = trip.created_at
        setTripBudgets(prev =>([
           ...prev,
           data
        ]))
       
  }

  
  const fetchYearlyBudget = async()=>{
       try{
           const res = await getYearlyBudget();
           setYearlyBudget(res[0]) 
           return res[0]
       }catch(err){
          console.log(err)
       }
  }
  
  

  const fetchUsedBudegtAMount = async(id)=>{

       try{
           const res = await getYearlyBudgetUsedAmount(parseInt(id));
           setUsedBudegt(res)
           return res
       }catch(err){
          console.log(err.response?.data?.detail)
       }
  }
  
    
      
  
    const fetchYBudgets = async()=>{
       try{
           const res = await getYBudgetst();
           setTripBudgets(res)
           return res
       }catch(err){
          console.log(err)
       }
  }
  
  const getRemaining = (budget,used)=>{
      const rem = budget ? budget - used || 0: 0;
      setRemaining(rem)
  }

  const openModal = (type, trip = null) => {
    setModalState({
      isOpen: true,
      type,
      editingTrip: trip
    });
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      type: 'create',
      editingTrip: null
    });
    document.body.style.overflow = 'unset';
  };

  const handleYearlyBudgetCreate = async(amount) => {
    setYearlyBudget({
      total: amount,
      used: 0,
      year: new Date().getFullYear()
    });
    closeModal();
    
    try{
       const data = {}
       data["total"] = parseInt(amount);
       data["year"]  = parseInt(new Date().getFullYear())
       data["used"] = parseInt(0)
       console.log("data: ",data)
       const response = await createYearlyBudget(data)
       console.log(response)
    }catch(err){
       console.log(err.response?.detail)
    }
    
  };

  const handleYearlyBudgetUpdate =async(amount) => {
    setYearlyBudget({
      ...yearlyBudget,
      total: amount
    });
    closeModal();
    const { used, total,year } = yearlyBudget;
    const newBudget = {'used': used,'year': year};
    newBudget['total'] = amount;
    try{
        const res = await updateYearlyBudget(newBudget)
        setYearlyBudget(res)
        return res
    } catch(err){
     console.log(err)
    }    
  };

  const handleTripBudgetCreate = (tripData) => {
    const newTrip = {
      id: Date.now(),
      ...tripData,
      spent: 0,
      status: 'active',
      dates: 'Upcoming'
    };
    
    setTripBudgets([...tripBudgets, newTrip]);
    
    // Update yearly budget used amount
    if (yearlyBudget) {
      setYearlyBudget({
        ...yearlyBudget,
        used: yearlyBudget.used + tripData.allocated
      });
    }
    
    closeModal();
  };



  const getBudgetStatus = (allocated) => {
    if (!yearlyBudget) return 'safe';
    const remainingAfterAllocation = remaining - allocated;
    if (remainingAfterAllocation < 0) return 'danger';
    if (remainingAfterAllocation < yearlyBudget.total * 0.15) return 'warning';
    return 'safe';
  };
  
  
  if (!yearlyBudget) {
    return (
      <div className={styles.container}>
        <EmptyBudgetState onCreateBudget={() => openModal('create-yearly')} />
        
        <BudgetModal
          isOpen={modalState.isOpen}
          type={modalState.type}
          onClose={closeModal}
          onYearlyBudgetCreate={handleYearlyBudgetCreate}
          onYearlyBudgetUpdate={handleYearlyBudgetUpdate}
          onTripBudgetCreate={handleTripBudgetCreate}
          yearlyBudget={yearlyBudget}
          remaining={remaining}
          getBudgetStatus={getBudgetStatus}
          editingTrip={modalState.editingTrip}
        />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Yearly Budget Overview */}
      <YearlyBudgetCard
        yearlyBudget={yearlyBudget}
        remaining={remaining}
        used={usedBudget}
        onEdit={() => openModal('edit-yearly')}
      />

      {/* Trip Budgets List */}
      <TripBudgetsList tripBudgets={tripBudgets}/>

      {/* Add New Budget Button */}
      <motion.button
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleTripCreate}
        className={styles.addBudgetBtn}
        disabled={remaining < 500}
      >
        <Plus size={20} />
        Add New Trip Budget
      </motion.button>

      {remaining < 500 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={styles.warningMessage}
        >
          <AlertCircle size={16} />
          <span>Insufficient budget remaining to create new trips. Consider increasing your yearly budget.</span>
        </motion.div>
      )}

      {/* Modal */}
      <BudgetModal
        isOpen={modalState.isOpen}
        type={modalState.type}
        onClose={closeModal}
        onYearlyBudgetCreate={handleYearlyBudgetCreate}
        onYearlyBudgetUpdate={handleYearlyBudgetUpdate}
        onTripBudgetCreate={handleTripBudgetCreate}
        yearlyBudget={yearlyBudget}
        remaining={remaining}
        getBudgetStatus={getBudgetStatus}
        editingTrip={modalState.editingTrip}
      />
    </div>
  );
};

export default YearlyBudgetManager;