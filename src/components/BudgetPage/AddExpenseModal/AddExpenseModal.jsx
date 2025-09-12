// src/pages/BudgetPage/components/AddExpenseModal.jsx
// Fully accessible modal for adding new expenses with form validation and focus management

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { MOCK_CATEGORIES } from '../mockData';
import { validateExpense } from '../utils';
import styles from './AddExpenseModal.module.css';

const AddExpenseModal = ({ isOpen, onClose, onSave, tripId }) => {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0], // Today's date
    is_planned: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Focus management refs
  const modalRef = useRef(null);
  const firstFocusableRef = useRef(null);
  const lastFocusableRef = useRef(null);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        amount: '',
        category: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        is_planned: false
      });
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen]);

  // Focus management and keyboard handling
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      // Focus first element after animation
      setTimeout(() => {
        firstFocusableRef.current?.focus();
      }, 300);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard event handler for ESC and focus trap
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen) return;

      if (event.key === 'Escape') {
        onClose();
      } else if (event.key === 'Tab') {
        // Focus trap implementation
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'amount' ? parseFloat(value) || '' : value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    const validation = validateExpense(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare expense data for API
      const expensePayload = {
        ...formData,
        trip_id: tripId,
        categoryName: MOCK_CATEGORIES.find(cat => cat.id === formData.category)?.name || 'Unknown'
      };

      // TODO: Replace with real API call
      // await api.post('/user/expenses', expensePayload, {
      //   headers: { 
      //     Authorization: `Bearer ${authToken}`,
      //     'Content-Type': 'application/json'
      //   }
      // });

      await onSave(expensePayload);
    } catch (error) {
      console.error('Failed to save expense:', error);
      // Handle API errors here - show error message to user
      setErrors({ submit: 'Failed to save expense. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          role="dialog"
          aria-modal="true"
          aria-labelledby="expense-modal-title"
        >
          <motion.div
            ref={modalRef}
            className={styles.modal}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={styles.header}>
              <h2 id="expense-modal-title" className={styles.title}>
                Add Expense
              </h2>
              <button
                ref={lastFocusableRef}
                onClick={onClose}
                className={styles.closeButton}
                aria-label="Close modal"
                type="button"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Amount Field */}
              <div className={styles.formGroup}>
                <label htmlFor="expense-amount" className={styles.label}>
                  Amount *
                </label>
                <input
                  ref={firstFocusableRef}
                  id="expense-amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={formData.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  className={`${styles.input} ${errors.amount ? styles.inputError : ''}`}
                  placeholder="0.00"
                  required
                />
                {errors.amount && (
                  <span className={styles.errorText}>{errors.amount}</span>
                )}
              </div>

              {/* Category Field */}
              <div className={styles.formGroup}>
                <label htmlFor="expense-category" className={styles.label}>
                  Category *
                </label>
                <select
                  id="expense-category"
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className={`${styles.input} ${styles.select} ${errors.category ? styles.inputError : ''}`}
                  required
                >
                  <option value="">Select category</option>
                  {MOCK_CATEGORIES.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <span className={styles.errorText}>{errors.category}</span>
                )}
              </div>

              {/* Description Field */}
              <div className={styles.formGroup}>
                <label htmlFor="expense-description" className={styles.label}>
                  Description
                </label>
                <input
                  id="expense-description"
                  type="text"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className={styles.input}
                  placeholder="What was this expense for?"
                />
              </div>

              {/* Date Field */}
              <div className={styles.formGroup}>
                <label htmlFor="expense-date" className={styles.label}>
                  Date *
                </label>
                <input
                  id="expense-date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className={`${styles.input} ${errors.date ? styles.inputError : ''}`}
                  required
                />
                {errors.date && (
                  <span className={styles.errorText}>{errors.date}</span>
                )}
              </div>

              {/* Type Toggle */}
              <div className={styles.formGroup}>
                <div className={styles.toggleContainer}>
                  <label className={styles.toggleLabel}>
                    <input
                      type="checkbox"
                      checked={formData.is_planned}
                      onChange={(e) => handleInputChange('is_planned', e.target.checked)}
                      className={styles.toggleInput}
                    />
                    <span className={styles.toggleSlider}></span>
                    <span className={styles.toggleText}>
                      {formData.is_planned ? 'Planned Expense' : 'Confirmed Expense'}
                    </span>
                  </label>
                  <p className={styles.toggleHelp}>
                    {formData.is_planned 
                      ? 'This expense is planned but not yet incurred'
                      : 'This expense has been confirmed and paid'
                    }
                  </p>
                </div>
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className={styles.submitError}>
                  {errors.submit}
                </div>
              )}

              {/* Actions */}
              <div className={styles.actions}>
                <button
                  type="button"
                  onClick={onClose}
                  className={styles.cancelButton}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.saveButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Save Expense'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddExpenseModal;