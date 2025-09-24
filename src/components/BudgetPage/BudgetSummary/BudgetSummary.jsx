// src/pages/BudgetPage/components/BudgetSummary.jsx
// Budget summary card showing total budget, spending progress, and quick actions

import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Edit, Plus, TrendingUp } from 'lucide-react';
import { formatCurrency, percent, calculateRemaining, getBudgetInsight } from '../utils';
import styles from './BudgetSummary.module.css';

const BudgetSummary = ({ budget, onEditBudget, onAddExpense }) => {
  const [animatedPercent, setAnimatedPercent] = useState(0);
  const controls = useAnimation();

  const totalBudget = budget?.amount || 0;
  const [confirmedSpent,setConfirmedSpent] = useState(0);
  const [plannedSpent,setPlannedSpent] = useState(0)
  const [remaining, setRemaining ] =  useState(totalBudget)
  const spentPercent = percent(confirmedSpent , totalBudget);
  const insight = getBudgetInsight(budget || {}); 
 
  useEffect(() => {
  
     const getPlannedSpent = ()=>{
         if(budget.allocatedBreakdown.length > 0){
           var plan = 0;
           budget.allocatedBreakdown.forEach( alloc => plan  += alloc.planned_spend)
           return plan 
         }
     }  
      
    setPlannedSpent(getPlannedSpent())
    
    // get remaining 
    
    const remaining = getRemaining();    
    remaining && setRemaining(remaining)
    
    // set spent 
    let spent  = getSpent()
    budget.allocatedBreakdown.length > 0 && setConfirmedSpent(spent)
    
    // Animate percentage counter on mount
    const animatePercent = async () => {
      await new Promise(resolve => setTimeout(resolve, 300)); // Wait for component mount
      
      let current = 0;
      const target = Math.round(spentPercent);
      const increment = target / 30; // 30 frames for smooth animation
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setAnimatedPercent(target);
          clearInterval(timer);
        } else {
          setAnimatedPercent(Math.round(current));
        }
      }, 16); // ~60fps

      return () => clearInterval(timer);
    };

    // Animate progress bar fill
    controls.start({
      width: `${spentPercent}%`,
      transition: { duration: 1.2, ease: 'easeOut', delay: 0.2 }
    });

    animatePercent();
  }, [spentPercent, controls, budget]);
    
   
  const getSpent = value =>{     
      if (budget.allocatedBreakdown.length > 0){
           var spent =  0; 
           budget.allocatedBreakdown.forEach(alloc => spent += alloc.spent)
           return spent;
       }
       return null
   }
   
   
  
   const getRemaining = ()=>{ 
       var spent  = getSpent();
       if (spent){
           return calculateRemaining(budget.amount,spent)   
       }
       return null
   }   
   



  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h2 className={styles.title}>Budget Overview</h2>
          <span className={styles.period}>{budget?.period || 'Trip'}</span>
        </div>
        <button
          onClick={onEditBudget}
          className={styles.editButton}
          aria-label="Edit budget"
          type="button"
        >
          <Edit size={16} />
        </button>
      </div>

      {/* Budget Amounts */}
      <div className={styles.amounts}>
        <div className={styles.totalBudget}>
          <span className={styles.label}>Total Budget</span>
          <span className={styles.amount}>{formatCurrency(totalBudget)}</span>
        </div>
        
        <div className={styles.remaining}>
          <span className={styles.label}>Remaining</span>
          <span className={`${styles.amount} ${styles.remainingAmount}`}>
            {formatCurrency(remaining)}
          </span>
        </div>
      </div>

      {/* Progress Section */}
      <div className={styles.progressSection}>
        <div className={styles.progressHeader}>
          <span className={styles.progressLabel}>Spent</span>
          <motion.span 
            className={styles.progressPercent}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {animatedPercent}%
          </motion.span>
        </div>
        
        <div 
          className={styles.progressTrack}
          role="progressbar"
          aria-valuenow={spentPercent}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label={`Budget progress: ${spentPercent}% spent`}
        >
          <motion.div
            className={styles.progressFill}
            initial={{ width: 0 }}
            animate={controls}
            style={{
              backgroundColor: insight.color
            }}
          />
        </div>
      </div>

      {/* Stats Row */}
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Confirmed</span>
          <span className={styles.statValue}>{formatCurrency(confirmedSpent)}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Planned</span>
          <span className={styles.statValue}>{formatCurrency(plannedSpent)}</span>
        </div>
      </div>

      {/* Budget Insight */}
      <motion.div 
        className={styles.insight}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.3 }}
        style={{ borderLeftColor: insight.color }}
      >
        <TrendingUp size={16} style={{ color: insight.color }} />
        <span>{insight.message}</span>
      </motion.div>

      {/* Action Buttons */}
      <div className={styles.actions}>
        <button
          onClick={onAddExpense}
          className={styles.addExpenseButton}
          type="button"
        >
          <Plus size={18} />
          Add Expense
        </button>
      </div>
    </motion.div>
  );
};

export default BudgetSummary;