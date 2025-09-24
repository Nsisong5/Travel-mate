// src/pages/BudgetPage/components/EditBudgetModal.jsx
// Dynamic budget editor with real-time validation and category allocation controls
// 
// Backend Integration Notes:
// - Expects AuthContext: const { token } = useAuth() for API headers
// - API Call: PATCH /user/budgets/:id with { amount, allocatedBreakdown: [{ category, allocated }] }
// - Response format: { id, amount, allocatedBreakdown, confirmedSpent, plannedSpent }

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, RefreshCw, AlertTriangle } from 'lucide-react';
import { useBudgetContext } from "../../../services/BudgetServices/BudgetContextProvider" 
import BudgetEditorControls from '../BudgetEditorControls/BudgetEditorControls';
import {
  calculateBudgetSummary,
  validateAllocations,
  suggestAllocation,
  autoAdjustAllocations,
  formatCurrency,
  parseNumericInput
} from '../../../utils/BudgetPage/budgetEngine';
import styles from './EditBudgetModal.module.css';

const EditBudgetModal = ({ isOpen, onClose, budget, onSaved }) => {
  const { getYearlyBudget,getYearlyBudgetUsedAmount, updateBudget,updateAllocation} = useBudgetContext()
  const [mainBudget, setMainBudget] = useState(0);
  const [allocations, setAllocations] = useState([]);
  const [errors, setErrors] = useState({});
  const [warnings, setWarnings] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [ yearlyBudget, setYearlyBudget ] = useState(0);
  const [yearlyBudgetUsed, setYearlyBudgetUsed] = useState(0)
 
  // Original values for reset functionality
  const [originalBudget, setOriginalBudget] = useState(0);
  const [originalAllocations, setOriginalAllocations] = useState([]);

  // Focus management
  const modalRef = useRef(null);
  const firstFocusableRef = useRef(null);

  // Initialize form data when modal opens
  useEffect(() => {
    if (isOpen && budget) {
      const budgetAmount = budget.amount || 0;
      const budgetAllocations = budget.allocatedBreakdown || [];
      
      setMainBudget(budgetAmount);
      setAllocations([...budgetAllocations]);
      setOriginalBudget(budgetAmount);
      setOriginalAllocations([...budgetAllocations]);
      setHasUnsavedChanges(false);
      setErrors({});
      setWarnings([]);
    }
  }, [isOpen, budget]);
  


   useEffect(()=>{
      const fetchAll = async()=>{
      try{
          const userYBudget = await getYearlyBudget()
          console.log("budgets: ",userYBudget[0].total)
          setYearlyBudget(userYBudget[0].total)
          const usedYearlyBudget = await getYearlyBudgetUsedAmount(userYBudget[0].id) 
          console.log("budges: ",usedYearlyBudget)
          setYearlyBudgetUsed(usedYearlyBudget);
       }catch(err){
        console.log(err)
       }
      
      
     }
     
     fetchAll();
   },[])   
         

  // Real-time validation and summary calculation
  const budgetSummary = calculateBudgetSummary(
    { amount: mainBudget },
    allocations,
    [] // We don't recalculate expenses here, just allocations
  );

  const validation = validateAllocations(
    mainBudget,
    allocations,
    budget?.confirmedSpent || 0
  );

  // Focus management and keyboard handling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        firstFocusableRef.current?.focus();
      }, 300);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // ESC key handling
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleMainBudgetChange = (value) => {
    if(!budgetAccept(value)){   
      setErrors({mainBudget: "yearly budget exceeded!"})    
    } else{
        setErrors({mainBudget: ""})   
    }
    const newAmount = parseNumericInput(value, 0);
    setMainBudget(newAmount);
    setHasUnsavedChanges(true);
    
    // Clear main budget errors
  };



  const updateCategory =  async(category)=>{     
      try{
         const res = await updateAllocation(category)
         return res
      } catch(err){
        throw Error(err.message)
      }
  }
  
  
  const handleCategoryAllocationChange = (categoryId, newAmount) => {
    const parsedAmount = parseNumericInput(newAmount, 0);
    
    setAllocations(prev => 
      prev.map(cat => 
        cat.id === categoryId 
          ? { ...cat, allocated: parsedAmount }
          : cat
      )
    );
    setHasUnsavedChanges(true);
  };
  
  const budgetAccept = (budgetAmount)=>{
      let used = yearlyBudgetUsed - budget.amount
      return (used + budgetAmount) < yearlyBudget
  
  }

  const handleAutoAdjust = (categoryId, newAmount) => {
    const adjustedAllocations = autoAdjustAllocations(
      allocations,
      categoryId,
      parseNumericInput(newAmount, 0),
      mainBudget
    );
    setAllocations(adjustedAllocations);
    setHasUnsavedChanges(true);
  };

  const handleSuggestAllocations = () => {
    const suggested = suggestAllocation(mainBudget, allocations, 'weighted');
    setAllocations(suggested);
    setHasUnsavedChanges(true);
  };

  const handleReset = () => {
    setMainBudget(originalBudget);
    setAllocations([...originalAllocations]);
    setHasUnsavedChanges(false);
    setErrors({});
    setWarnings([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate before submission
    if (!validation.isValid) {
      setErrors({ submit: 'Please fix the errors below before saving.' });
      return;
    }

    if (mainBudget <= 0) {
      setErrors({ mainBudget: 'Budget amount must be greater than 0' });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const payload = {
        amount: mainBudget,
        allocatedBreakdown: allocations.map(cat => ({
          id: cat.id,
          name: cat.name,
          allocated: cat.allocated
        }))
      };
      
      const verifyBudget = budgetAccept(payload.amount)
      if (verifyBudget){
         const { amount }= payload;
         const data = { amount }
         const res = await updateBudget(budget.id, data)
         console.log(res)
      } else{
        throw Error("yearly budget amount exceeded!")            
      }
      
      payload.allocatedBreakdown.forEach(allocation => {
         return updateCategory(allocation)
      })
    
      // Simulate successful API response
      const updatedBudget = {
        ...budget,
        amount: mainBudget,
        allocatedBreakdown: allocations
      };

      await onSaved(updatedBudget);
      setHasUnsavedChanges(false);
    } catch(error) {
      setErrors({ submit: error.message});
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="budget-edit-title"
        >
          <motion.div
            ref={modalRef}
            className={styles.modal}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.titleSection}>
                <h2 id="budget-edit-title" className={styles.title}>
                  Edit Budget
                </h2>
                <span className={styles.subtitle}>
                  {budget?.trip_name || 'Trip Budget'} • {budget?.period || 'Trip'}
                </span>
              </div>
              <button
                onClick={onClose}
                className={styles.closeButton}
                aria-label="Close modal"
                type="button"
              >
                <X size={20} />
              </button>
            </div>

            <div className={styles.content}>
              <form onSubmit={handleSubmit} className={styles.form}>
                {/* Main Budget Section */}
                <div className={styles.mainBudgetSection}>
                  <h3 className={styles.sectionTitle}>Main Budget Amount</h3>
                  <div className={styles.mainBudgetControls}>
                    <div className={styles.formGroup}>
                      <label htmlFor="main-budget" className={styles.label}>
                        Total Budget Amount
                      </label>
                      <input
                        ref={firstFocusableRef}
                        id="main-budget"
                        type="number"
                        min="0"
                        step="0.01"
                        value={mainBudget || ''}
                        onChange={(e) => handleMainBudgetChange(e.target.value)}
                        className={`${styles.input} ${styles.currencyInput} ${errors.mainBudget ? styles.inputError : ''}`}
                        placeholder="0.00"
                      />
                      {errors.mainBudget && (
                        <span className={styles.errorText}>{errors.mainBudget}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Category Allocations Section */}
                <div className={styles.allocationsSection}>
                  <div className={styles.sectionHeader}>
                    <h3 className={styles.sectionTitle}>Category Allocations</h3>
                    <button
                      type="button"
                      onClick={handleSuggestAllocations}
                      className={styles.suggestButton}
                      disabled={mainBudget <= 0}
                    >
                      <RefreshCw size={14} />
                      Auto-suggest
                    </button>
                  </div>

                  <div className={styles.categoriesList}>
                    {allocations.map((category) => (
                      <BudgetEditorControls
                        key={category.id}
                        category={category}
                        maxBudget={mainBudget}
                        onAllocationChange={handleCategoryAllocationChange}
                        onAutoAdjust={handleAutoAdjust}
                        validationErrors={validation.errors}
                      />
                    ))}
                  </div>
                </div>

                {/* Budget Summary Panel */}
                <div className={styles.summaryPanel}>
                  <h4 className={styles.summaryTitle}>Budget Summary</h4>
                  
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Total Budget:</span>
                    <span className={styles.summaryValue}>
                      {formatCurrency(budgetSummary.mainBudget)}
                    </span>
                  </div>
                  
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Total Allocated:</span>
                    <span className={`${styles.summaryValue} ${
                      budgetSummary.totalAllocated > budgetSummary.mainBudget ? styles.overBudget : ''
                    }`}>
                      {formatCurrency(budgetSummary.totalAllocated)}
                    </span>
                  </div>
                  
                  <div className={styles.summaryRow}>
                    <span className={styles.summaryLabel}>Remaining to Allocate:</span>
                    <span className={`${styles.summaryValue} ${
                      budgetSummary.remainingAfterAllocated < 0 ? styles.overBudget : styles.remaining
                    }`}>
                      {formatCurrency(budgetSummary.remainingAfterAllocated)}
                    </span>
                  </div>

                  {/* Validation Messages */}
                  {!validation.isValid && (
                    <div className={styles.validationMessages}>
                      {validation.errors.map((error, index) => (
                        <div key={index} className={styles.errorMessage}>
                          <AlertTriangle size={14} />
                          {error}
                        </div>
                      ))}
                    </div>
                  )}

                  {validation.hasWarnings && (
                    <div className={styles.warningMessages}>
                      {validation.warnings.map((warning, index) => (
                        <div key={index} className={styles.warningMessage}>
                          {warning}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <div className={styles.submitError}>
                    {errors.submit}
                  </div>
                )}

                {/* Actions */}
                <div className={styles.actions}>
                  <div className={styles.leftActions}>
                    {hasUnsavedChanges && (
                      <button
                        type="button"
                        onClick={handleReset}
                        className={styles.resetButton}
                      >
                        Reset Changes
                      </button>
                    )}
                  </div>
                  
                  <div className={styles.rightActions}>
                    <button
                      type="button"
                      onClick={onClose}
                      className={styles.cancelButton}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className={styles.saveButton}
                      disabled={isSubmitting || !validation.isValid || !hasUnsavedChanges}
                    >
                      {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditBudgetModal;

