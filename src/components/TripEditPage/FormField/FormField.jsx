import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import styles from '../TripEditPage.module.css';

const FormField = ({ 
  label, 
  value, 
  onChange, 
  type = 'text', 
  placeholder, 
  icon, 
  readonly = false,
  disabled = false,
  required = false,
  error 
}) => {
  const IconComponent = icon ? Icons[icon] : null;

  return (
    <div className={`${styles.formField} ${error ? styles.fieldError : ''}`}>
      <label className={styles.fieldLabel}>
        {IconComponent && <IconComponent size={16} className={styles.fieldIcon} />}
        <span className={styles.labelText}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </span>
      </label>
      
      <motion.input
        type={type}
        value={value || ''}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        placeholder={placeholder}
        className={`${styles.fieldInput} ${readonly ? styles.readonlyInput : ''}`}
        readOnly={readonly}
        disabled={disabled}
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

export default FormField;