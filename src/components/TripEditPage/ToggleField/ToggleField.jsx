import React from 'react';
import { motion } from 'framer-motion';
import styles from '../TripEditPage.module.css';

const ToggleField = ({ 
  label, 
  value, 
  onChange, 
  helperText 
}) => {
  return (
    <div className={styles.toggleField}>
      <div className={styles.toggleContainer}>
        <motion.button
          type="button"
          className={`${styles.toggleSwitch} ${value ? styles.toggleActive : ''}`}
          onClick={() => onChange(!value)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          aria-label={`Toggle ${label}`}
        >
          <motion.div
            className={styles.toggleThumb}
            animate={{ x: value ? '100%' : '0%' }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          />
        </motion.button>
        
        <span className={styles.toggleLabel}>{label}</span>
      </div>
      
      {helperText && (
        <p className={styles.toggleHelperText}>{helperText}</p>
      )}
    </div>
  );
};

export default ToggleField;