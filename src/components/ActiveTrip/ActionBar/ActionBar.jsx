// src/pages/TripDetailPage/ActionBar/ActionBar.jsx
// Sticky action bar with primary trip actions (mobile-first design)

import React from 'react';
import { motion } from 'framer-motion';
import { Edit, Share2, StopCircle, CreditCard } from 'lucide-react';
import { fadeInUp } from '../variants';
import styles from './ActionBar.module.css';

const ActionBar = ({ onEdit, onShare, onEndTrip, onBudget}) => {
  return (
    <motion.div 
      className={styles.container}
      variants={fadeInUp}
      initial="initial"
      animate="animate"
    >
      <div className={styles.content}>
        <motion.button
          onClick={onEdit}
          className={`${styles.actionButton} ${styles.secondary}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
        >
          <Edit size={18} />
          <span className={styles.buttonText}>Modify Trip</span>
        </motion.button>

        <motion.button
          onClick={onBudget}
          className={`${styles.actionButton} ${styles.secondary}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
        >
          <CreditCard size={18} />
          <span className={styles.buttonText}>Budget</span>
        </motion.button>

        <motion.button
          onClick={onEndTrip}
          className={`${styles.actionButton} ${styles.danger}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
        >
          <StopCircle size={18} />
          <span className={styles.buttonText}>End Trip</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ActionBar;