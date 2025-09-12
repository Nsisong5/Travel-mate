import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import * as Icons from 'lucide-react';
import styles from '../TripEditPage.module.css';

const DropdownField = ({ 
  label, 
  value, 
  onChange, 
  options = [],
  icon, 
  required = false,
  error 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const IconComponent = icon ? Icons[icon] : null;
  
  const selectedOption = options.find(option => option.value === value);

  const handleSelect = (selectedValue) => {
    onChange(selectedValue);
    setIsOpen(false);
  };

  return (
    <div className={`${styles.formField} ${error ? styles.fieldError : ''}`}>
      <label className={styles.fieldLabel}>
        {IconComponent && <IconComponent size={16} className={styles.fieldIcon} />}
        <span className={styles.labelText}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </span>
      </label>
      
      <div className={styles.dropdownWrapper}>
        <motion.button
          type="button"
          className={`${styles.dropdownButton} ${isOpen ? styles.dropdownOpen : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <span className={styles.dropdownText}>
            {selectedOption ? selectedOption.label : `Select ${label.toLowerCase()}`}
          </span>
          <motion.div
            className={styles.dropdownChevron}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={styles.dropdownMenu}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {options.map((option) => (
                <motion.button
                  key={option.value}
                  type="button"
                  className={`${styles.dropdownOption} ${
                    value === option.value ? styles.dropdownOptionActive : ''
                  }`}
                  onClick={() => handleSelect(option.value)}
                  whileHover={{ backgroundColor: 'var(--card-grad-start)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  {option.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div 
          className={styles.dropdownBackdrop}
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default DropdownField;