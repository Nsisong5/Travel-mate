import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import styles from '../TripEditPage.module.css';

const DateField = ({ 
  label, 
  value, 
  onChange, 
  min, 
  max,
  required = false,
  error 
}) => {
  return (
    <div className={`${styles.formField} ${error ? styles.fieldError : ''}`}>
      <label className={styles.fieldLabel}>
        <Calendar size={16} className={styles.fieldIcon} />
        <span className={styles.labelText}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </span>
      </label>
      
      <motion.input
        type="date"
        value={value || ''}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        min={min}
        max={max}
        className={styles.fieldInput}
        whileFocus={{ 
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
      />
      
      {error && (
        <motion.span
          className={styles.fieldErrorText}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.span>
      )}
    </div>
  );
};

export default DateField;