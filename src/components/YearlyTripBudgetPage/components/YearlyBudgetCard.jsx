import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Edit3 } from 'lucide-react';
import styles from '../YearlyTripBudgetPage.module.css';
import { formatBudgetAmount } from '../../../utils/BudgetPage/getBudgetFeedback';

const YearlyBudgetCard = ({ yearlyBudget, remaining, onEdit }) => {
  const usedPercentage = (yearlyBudget.used / yearlyBudget.total) * 100;
  console.log("yearly budget from card: ", yearlyBudget)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={styles.yearlyBudgetCard}
    >
      <div className={styles.cardHeader}>
        <div className={styles.headerLeft}>
          <Calendar className={styles.yearIcon} />
          <div>
            <h1 className={styles.yearTitle}>{yearlyBudget.year} Travel Budget</h1>
            <p className={styles.yearSubtitle}>Total allocated across all trips</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onEdit}
          className={styles.editBtn}
          aria-label="Edit yearly budget"
        >
          <Edit3 size={16} />
        </motion.button>
      </div>

      <div className={styles.budgetStats}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Total Budget</span>
          <span className={styles.statValue}>{formatBudgetAmount(yearlyBudget.total)}</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Remaining</span>
          <span className={`${styles.statValue} ${styles.remaining}`}>
            {formatBudgetAmount(remaining)}
          </span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Used</span>
          <span className={styles.statValue}>{formatBudgetAmount(yearlyBudget.used)}</span>
        </div>
      </div>

      <div className={styles.progressSection}>
        <div className={styles.progressHeader}>
          <span>Budget Usage</span>
          <span>{usedPercentage.toFixed(1)}%</span>
        </div>
        <div className={styles.progressBar}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${usedPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={styles.progressFill}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default YearlyBudgetCard;