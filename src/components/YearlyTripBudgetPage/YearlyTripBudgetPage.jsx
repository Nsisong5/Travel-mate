import React, { useState, useEffect, use } from 'react';
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

const YearlyBudgetManager = () => {
  const navigate = useNavigate();
  const [yearlyBudget, setYearlyBudget] = useState(null);
  const handleTripCreate =()=>navigate("/trip_budget");
  const { createYearlyBudget,getYearlyBudget, updateYearlyBudget,getYBudgetst,getYearlyBudgetUsedAmount} = useBudgetContext()
  const [ usedBudget,setUsedBudegt ] = useState(0)
  const [remaining,setRemaining] = useState(0)
  const [tripBudgets, setTripBudgets] = useState([
    {
      id: 1,
      title: "Summer in Japan",
      destination: "Tokyo & Kyoto",
      allocated: 4500,
      spent: 4200,
      status: "completed",
      dates: "Jun 2024"
    },
    {
      id: 2,
      title: "European Adventure",
      destination: "Paris & Rome",
      allocated: 4000,
      spent: 2800,
      status: "active",
      dates: "Sep 2024"
    }
  ]);

  const [modalState, setModalState] = useState({
    isOpen: false,
    type: 'create', // 'create', 'edit-yearly', 'edit-trip'
    editingTrip: null
  });

  useEffect(()=>{
    const fetchAll = async()=>{
        await fetchYearlyBudget();
    }
    fetchAll();
  },[])
  

  useEffect(() => {
    const fetchAll = async () => {
      const yearlyBudgetRes = await fetchYearlyBudget();
      if (!yearlyBudgetRes || !yearlyBudgetRes[0]) return;
      const yBudget = yearlyBudgetRes[0];
      setYearlyBudget(yBudget);
      await fetchYBudgets();
      const totalTripsBudgets  = await fetchYearlyBudgetTripsBudgets(yBudget.id); // Pass the id directly
      getRemaining(yBudget.total,totalTripsBudgets); // Pass the budget directly
    };
    fetchAll();
  }, []);
  
  
  const fetchYearlyBudget = async()=>{
       try{
           const res = await getYearlyBudget();
           setYearlyBudget(res[0]) 
           return res
       }catch(err){
          console.log(err)
       }
  }
  


  const fetchYearlyBudgetTripsBudgets = async(id)=>{
    if (!id) return;
       try{
           const res = await getYearlyBudgetUsedAmount(id);
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
  
  const getRemaining = async (budget,used)=>{
        const rem = budget ? budget - used : budget;        
        setRemaining(rem);
        setUsedBudegt(used);
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
       const response = await createYearlyBudget(data)
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
  
  console.log("y_budget:",yearlyBudget)
  // If no yearly budget exists, show empty state
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

  console.log('usedc budget: ',usedBudget)
  return (
    <div className={styles.container}>
      {/* Yearly Budget Overview */}
      <YearlyBudgetCard
        yearlyBudget={yearlyBudget}
        remaining={remaining}
        onEdit={() => openModal('edit-yearly')}
        used = {usedBudget}
      />

      {/* Trip Budgets List */}
      <TripBudgetsList tripBudgets={tripBudgets} />

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