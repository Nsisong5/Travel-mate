import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Plus } from 'lucide-react';
import styles from '../YearlyTripBudgetPage.module.css';

const EmptyBudgetState = ({ onCreateBudget }) => {
  return (
    <div className={styles.emptyState}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={styles.emptyStateCard}
      >
        <TrendingUp className={styles.emptyIcon} />
        <h2>Create Your {new Date().getFullYear()} Travel Budget</h2>
        <p>Start planning your adventures with a yearly budget that helps you allocate funds across multiple trips.</p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onCreateBudget}
          className={styles.createBudgetBtn}
        >
          <Plus size={20} />
          Create Yearly Budget
        </motion.button>
      </motion.div>
    </div>
  );
};

export default EmptyBudgetState;