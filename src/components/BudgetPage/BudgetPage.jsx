// src/pages/BudgetPage/BudgetPage.jsx
// Main Budget Dashboard page - production-ready, mobile-first, theme-adaptive
//
// INTEGRATION NOTES:
// 1. Add to router: <Route path="/budget" element={<BudgetPage />} />
// 2. Uses global CSS variables: --primary, --panel, --text, --muted, --ring, --shadow
// 3. Expected backend endpoints:
//    - GET /user/budgets (current budget data)
//    - GET /user/expenses?trip_id=123 (recent expenses)
//    - POST /user/expenses (create expense)
//    - DELETE /user/expenses/:id (remove expense)
// 4. Requires AuthContext for API headers: useAuth() -> { token, user }

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronDown } from 'lucide-react';
// TODO: Import ThemeContext - adjust path based on your project structure
import { useTheme } from '../../ThemeContext';
//import { useAuth } from '../../contexts/AuthContext';

import BudgetSummary from './BudgetSummary/BudgetSummary';
import CategoryCard from './CategoryCard/CategoryCard';
import RecentExpenses from './RecentExpenses/RecentExpenses';
import AddExpenseModal from './AddExpenseModal/AddExpenseModal';
import EditBudgetModal from './EditBudgetModal/EditBudgetModal';
import { MOCK_BUDGET, MOCK_EXPENSES,MOCK_CATEGORIES } from './mockData';
import styles from './BudgetPage.module.css';
import { useBudgetContext} from "../../services/BudgetServices/BudgetContextProvider"
import {useExpenses } from "../../services/ExpensesServices/ExpensesServices" 
import { useTripServices } from "../../services/TripServices/TripServices" 

// Framer Motion variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: 'easeOut',
      staggerChildren: 0.1 
    }
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const BudgetPage = () => {
  const navigate = useNavigate();
  
  // TODO: Uncomment when ThemeContext is available
  // const { theme } = useContext(ThemeContext);
  // const { user, token } = useAuth();
  
  // State management
  const { tripId } = useParams();
  const [budget, setBudget] = useState({
    "allocatedBreakdown": []
  });
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showEditBudgetModal, setShowEditBudgetModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [selectedTrip, setSelectedTrip] = useState();
  const { getTripBudget , getAllocations,updateAllocation} = useBudgetContext();
  const [allocations, setAllocations ] = useState([])
  const { addExpense,editExpenses,getExpenses,deleteExpense } = useExpenses();
  const { getTrip } = useTripServices()
  useEffect(() => {
    
    const fetchAll = async()=>{
      const budgetData = await fetchBudgetData();
      const exp = await fetchRecentExpenses();     
      if (budgetData){ 
        const alloc = await getAllocations(budgetData.id)
        setBudget(prev=> (
         {
           ...prev,
           allocatedBreakdown: alloc
         }
       ))
       setAllocations(alloc)
     }else{setError("no budget found for this trip!")}
    
      const trip = await getTrip(tripId);
     trip && setSelectedTrip(trip.title)
   }
    
    fetchAll();
  }, []);



 const fetchBudgetData = async () => {
    setLoading(true);
    try {
      const fetchedBudget = await getTripBudget(tripId);
      fetchedBudget ? setBudget(prev => ({...prev,...fetchedBudget}))
     :setBudget(MOCK_BUDGET)
      return fetchedBudget    
      } catch (err) {
      console.error('Failed to fetch budget data:', err);
      setError('Failed to load budget information');
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentExpenses = async () => {
    try {
      const response = await getExpenses(tripId);
      response ? setExpenses(response)
      :setExpenses(MOCK_EXPENSES);
      return response
    } catch (err) {
      console.error('Failed to fetch expenses:', err);
    }
  };

  const handleAddExpense = async (expenseData) => {
    try {
    
      // Simulate API response
      const newExpense = {
        id: expenseData.id || Date.now(),
        ...expenseData,
        created_at: new Date().toISOString()
      };
       
      if (expenseData.id) {
        // Update existing expense
        setExpenses(prev => prev.map(exp => 
          exp.id === expenseData.id ? newExpense : exp
        ));
      } else {
        // Add new expense
        setExpenses(prev => [newExpense, ...prev]);
      }
      
      // Update budget spent amounts
      setBudget(prev => ({
        ...prev,
        confirmedSpent: prev.confirmedSpent + (expenseData.is_planned ? 0 : expenseData.amount),
        plannedSpent: prev.plannedSpent + (expenseData.is_planned ? expenseData.amount : 0),
        allocatedBreakdown: budget.allocatedBreakdown.map(cat => 
          cat.id === expenseData.category 
            ? { ...cat, spent: cat.spent + expenseData.amount }
            : cat
        )
      }));

      setShowAddExpenseModal(false);
      setEditingExpense(null);
    } catch (err) {
      console.error('Failed to save expense:', err);
      throw new Error('Failed to save expense');
    }
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setShowAddExpenseModal(true);
  };

  const handleEditBudget = () => {
    setShowEditBudgetModal(true);
  };

  const handleSaveBudget = (updatedBudget) => {
    setBudget(updatedBudget);
    setShowEditBudgetModal(false);
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      const response = await deleteExpense(expenseId);
      const expenseToDelete = expenses.find(exp => exp.id === expenseId);
      if (expenseToDelete) {
        // Update local state
        setExpenses(prev => prev.filter(exp => exp.id !== expenseId));
        
        // Update budget amounts
        setBudget(prev => ({
          ...prev,
          confirmedSpent: prev.confirmedSpent - (expenseToDelete.is_planned ? 0 : expenseToDelete.amount),
          plannedSpent: prev.plannedSpent - (expenseToDelete.is_planned ? expenseToDelete.amount : 0),
          allocatedBreakdown: budget.allocatedBreakdown.map(cat => 
            cat.id === expenseToDelete.category 
              ? { ...cat, spent: Math.max(0, cat.spent - expenseToDelete.amount) }
              : cat
          )
        }));
      }
    } catch (err) {
      console.error('Failed to delete expense:', err);
    }
  };
  


  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.skeleton} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2>Unable to load budget</h2>
        <p>{error}</p>
        <button onClick={() => navigate("/trip_budget",{ state: { previous : "active" }})} className={styles.backButton}>
          Create Budget
        </button>
      </div>
    );
  }

  return (
    <motion.main 
      className={styles.container}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      // TODO: Apply theme class when ThemeContext available
      // data-theme={theme}
    >
      {/* Header */}
      <motion.header className={styles.header} variants={pageVariants}>
        <button
          onClick={() => navigate(-1)}
          className={styles.backButton}
          aria-label="Go back"
          type="button"
        >
          <ChevronLeft size={20} />
        </button>
        
        <h1 className={styles.title}>Budget</h1>
        
        <div className={styles.tripSelector}>
          <button className={styles.tripButton} type="button">
            <span>{selectedTrip}</span>
            <ChevronDown size={16} />
          </button>
        </div>
      </motion.header>

      {/* Budget Summary */}
      <motion.div variants={pageVariants}>
        <BudgetSummary 
          budget={budget}
          onEditBudget={handleEditBudget}
          onAddExpense={() => setShowAddExpenseModal(true)}
        />
      </motion.div>

      {/* Category Grid */}
      <motion.section className={styles.categoriesSection} variants={pageVariants}>
        <h2 className={styles.sectionTitle}>Categories</h2>
        <div className={styles.categoryGrid}>
          {budget.allocatedBreakdown.map((category, index) => (
            <motion.div
              key={category.id}
              variants={pageVariants}
              transition={{ delay: index * 0.05 }}
            >
              <CategoryCard category={category} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Recent Expenses */}
      <motion.section className={styles.expensesSection} variants={pageVariants}>
        <RecentExpenses 
          expenses={expenses}
          onDeleteExpense={handleDeleteExpense}
          onEditExpense={handleEditExpense}
          onAddExpense={() => setShowAddExpenseModal(true)}
        />
      </motion.section>

      {/* Add/Edit Expense Modal */}
      <AddExpenseModal
        isOpen={showAddExpenseModal}
        budget= {budget}
        updateAllocation={updateAllocation}
        onClose={() => {
          setShowAddExpenseModal(false);
          setEditingExpense(null);
        }}
        onSave={handleAddExpense}
        expenseToEdit={editingExpense}
        tripId={budget?.trip_id}
      />

      {/* Edit Budget Modal */}
      <EditBudgetModal
        isOpen={showEditBudgetModal}
        onClose={() => setShowEditBudgetModal(false)}
        onSaved={handleSaveBudget}
        budget={budget}
      />
    </motion.main>
  );
};

export default BudgetPage;