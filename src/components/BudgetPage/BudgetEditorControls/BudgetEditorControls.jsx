// src/pages/BudgetPage/components/BudgetEditorControls.jsx
// Individual category allocation controls with numeric input focused design

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { formatCurrency, parseNumericInput, getCategoryStatus } from '../../../utils/BudgetPage/budgetEngine';
import styles from './BudgetEditorControls.module.css';
import { useBudgetContext } from "../../../services/BudgetServices/BudgetContextProvider" 

const BudgetEditorControls = ({
  category,
  maxBudget,
  onAllocationChange,
  validationErrors = []
}) => {
  
  //budget service 
  const { getYearlyBudget } = useBudgetContext()
  
  const [localValue, setLocalValue] = useState(category.allocated || 0);
  const [isEditing, setIsEditing] = useState(false);

  // effect 
  const [ yearlyBudget, setYearlyBudget ] = useState(0);
    
 
  const { name, allocated, spent, iconName, id } = category;
  const IconComponent = Icons[iconName] || Icons.Circle;
  
  // Sync local value with prop changes
  useEffect(() => {
    
    setLocalValue(allocated || 0);
  }, [allocated]);


  // Calculate category status for visual indicators
  const categoryStatus = getCategoryStatus(category);
  const percentAllocated = maxBudget > 0 ? (allocated / maxBudget) * 100 : 0;
  const hasSpending = spent > 0;


 useEffect(()=>{
      const fetchAll = async()=>{
      try{
          const userYBudget = await getYearlyBudget()
          setYearlyBudget(userYBudget.total)
       }catch(err){
        console.log(err)
       }
     }
     
     fetchAll();
 },[])


  
  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalValue(value); // Keep as string while editing
  };

  const handleInputBlur = () => {
    const parsedValue = parseNumericInput(localValue, 0, maxBudget);
    setLocalValue(parsedValue);
    onAllocationChange(id, parsedValue);
    setIsEditing(false);
  };

  const handleInputFocus = (e) => {
    // Prevent accidental focus on mobile during scrolling
    if (e.type === 'touchstart' && !isEditing) {
      e.preventDefault();
      return;
    }
    setIsEditing(true);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.target.blur(); // This will trigger handleInputBlur
    }
    if (e.key === 'Escape') {
      setLocalValue(allocated || 0);
      setIsEditing(false);
      e.target.blur();
    }
  };

  // Check if this category has validation errors
  const categoryErrors = validationErrors.filter(error => 
    error.toLowerCase().includes(name.toLowerCase())
  );

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.header}>
        <div className={styles.categoryInfo}>
          <div 
            className={styles.iconContainer}
            style={{ backgroundColor: categoryStatus.color }}
          >
            <IconComponent size={16} />
          </div>
          <div className={styles.nameSection}>
            <span className={styles.categoryName}>{name}</span>
            {hasSpending && (
              <span className={styles.spentIndicator}>
                {formatCurrency(spent)} spent
              </span>
            )}
          </div>
        </div>

        <div className={styles.allocationDisplay}>
          <span className={styles.allocationPercent}>
            {Math.round(percentAllocated)}%
          </span>
        </div>
      </div>

      <div className={styles.controls}>
        {/* Numeric Input - Mobile Optimized */}
        <div className={styles.inputSection}>
          <input
            type="number"
            min="0"
            max={maxBudget}
            step="0.01"
            value={isEditing ? localValue : (localValue || '')}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onFocus={handleInputFocus}
            onTouchStart={handleInputFocus}
            onKeyDown={handleKeyDown}
            className={`${styles.numericInput} ${categoryErrors.length > 0 ? styles.inputError : ''}`}
            placeholder="0.00"
            aria-label={`${name} allocation amount`}
          />
          <span className={styles.currencyLabel}>USD</span>
        </div>
      </div>

      {/* Progress visualization - simplified */}
      <div className={styles.progressSection}>
        <div className={styles.progressTrack}>
          <motion.div
            className={styles.progressFill}
            style={{ backgroundColor: categoryStatus.color }}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(percentAllocated, 100)}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
          {hasSpending && (
            <motion.div
              className={styles.spentOverlay}
              style={{ 
                width: `${Math.min((spent / maxBudget) * 100, 100)}%`,
                backgroundColor: spent > allocated ? '#ef4444' : 'rgba(0,0,0,0.2)'
              }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((spent / maxBudget) * 100, 100)}%` }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            />
          )}
        </div>
        
        <div className={styles.progressLabels}>
          <span className={styles.progressLabel}>
            {formatCurrency(allocated || 0)} allocated
          </span>
          <span className={styles.progressStatus}>
            {categoryStatus.message}
          </span>
        </div>
      </div>

      {/* Validation Errors */}
      {categoryErrors.length > 0 && (
        <div className={styles.errorMessages}>
          {categoryErrors.map((error, index) => (
            <div key={index} className={styles.errorMessage}>
              {error}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default BudgetEditorControls;