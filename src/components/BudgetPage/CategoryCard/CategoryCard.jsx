// src/pages/BudgetPage/components/CategoryCard.jsx
// Individual category card showing allocated vs spent amounts with progress indicator

import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { formatCurrency, percent } from '../utils';
import styles from './CategoryCard.module.css';

const CategoryCard = ({ category }) => {
  const { name, allocated, spent, iconName } = category;
  const spentPercent = percent(spent, allocated);
  const remaining = Math.max(allocated - spent, 0);
  
  // Get icon component dynamically
  const IconComponent = Icons[iconName] || Icons.Circle;
  
  // Determine status color based on percentage
  const getStatusColor = () => {
    if (spentPercent >= 90) return '#ef4444'; // red
    if (spentPercent >= 70) return '#f59e0b'; // amber
    return '#10b981'; // green
  };

  const handleCardClick = () => {
    // TODO: Implement category detail drawer/modal
    console.log('Open category details for:', name);
  };

  return (
    <motion.div 
      className={styles.container}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleCardClick}
      tabIndex="0"
      role="button"
      aria-label={`View details for ${name} category`}
      data-action="open-category"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <IconComponent size={20} />
        </div>
        <h3 className={styles.categoryName}>{name}</h3>
      </div>

      <div className={styles.amounts}>
        <div className={styles.spent}>
          <span className={styles.amountLabel}>Spent</span>
          <span className={styles.amountValue}>{formatCurrency(spent)}</span>
        </div>
        <div className={styles.allocated}>
          <span className={styles.amountLabel}>Budget</span>
          <span className={styles.amountValue}>{formatCurrency(allocated)}</span>
        </div>
      </div>

      <div className={styles.progressSection}>
        <div className={styles.progressHeader}>
          <span className={styles.progressLabel}>
            {formatCurrency(remaining)} remaining
          </span>
          <span 
            className={styles.progressPercent}
            style={{ color: getStatusColor() }}
          >
            {Math.round(spentPercent)}%
          </span>
        </div>
        
        <div className={styles.progressTrack}>
          <motion.div
            className={styles.progressFill}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(spentPercent, 100)}%` }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            style={{ backgroundColor: getStatusColor() }}
          />
        </div>
      </div>

      {spentPercent > 100 && (
        <motion.div 
          className={styles.overBudgetWarning}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          Over budget by {formatCurrency(spent - allocated)}
        </motion.div>
      )}
    </motion.div>
  );
};

export default CategoryCard;