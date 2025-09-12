import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, DollarSign } from 'lucide-react';
import styles from '../YearlyTripBudgetPage.module.css';
import { getBudgetFeedback, formatBudgetAmount, validateBudgetAmount } from '../../../utils/BudgetPage/getBudgetFeedback';

const BudgetModal = ({
  isOpen,
  type,
  onClose,
  onYearlyBudgetCreate,
  onYearlyBudgetUpdate,
  onTripBudgetCreate,
  yearlyBudget,
  remaining,
  getBudgetStatus,
  editingTrip
}) => {
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    allocated: '',
    yearlyTotal: ''
  });

  const [budgetFeedback, setBudgetFeedback] = useState({
    message: '',
    sentiment: 'neutral',
    color: 'var(--muted)'
  });

  const [formErrors, setFormErrors] = useState({});

  // Reset form when modal opens/closes or type changes
  useEffect(() => {
    if (isOpen) {
      if (type === 'edit-yearly') {
        setFormData(prev => ({ 
          ...prev, 
          yearlyTotal: yearlyBudget?.total?.toString() || '' 
        }));
      } else if (type === 'edit-trip' && editingTrip) {
        setFormData({
          title: editingTrip.title,
          destination: editingTrip.destination,
          allocated: editingTrip.allocated.toString(),
          yearlyTotal: formData.yearlyTotal
        });
      } else {
        setFormData({
          title: '',
          destination: '',
          allocated: '',
          yearlyTotal: formData.yearlyTotal
        });
      }
      setFormErrors({});
      setBudgetFeedback({ message: '', sentiment: 'neutral', color: 'var(--muted)' });
    }
  }, [isOpen, type, editingTrip, yearlyBudget]);

  // Update budget feedback when yearly total changes
  useEffect(() => {
    if ((type === 'edit-yearly' || type === 'create-yearly') && formData.yearlyTotal) {
      const feedback = getBudgetFeedback(formData.yearlyTotal);
      setBudgetFeedback(feedback);
    }
  }, [formData.yearlyTotal, type]);

  const validateForm = () => {
    const errors = {};
    
    if (type === 'edit-yearly' || type === 'create-yearly') {
      const validation = validateBudgetAmount(formData.yearlyTotal);
      if (!validation.isValid) {
        errors.yearlyTotal = validation.error;
      } else if (yearlyBudget && parseInt(formData.yearlyTotal) < yearlyBudget.used) {
        errors.yearlyTotal = `Budget cannot be less than already allocated amount: ${formatBudgetAmount(yearlyBudget.used)}`;
      }
    } else {
      if (!formData.title.trim()) {
        errors.title = 'Trip title is required';
      }
      if (!formData.destination.trim()) {
        errors.destination = 'Destination is required';
      }
      
      const validation = validateBudgetAmount(formData.allocated);
      if (!validation.isValid) {
        errors.allocated = validation.error;
      } else if (getBudgetStatus && getBudgetStatus(parseInt(formData.allocated)) === 'danger') {
        errors.allocated = 'This amount exceeds your remaining budget';
      }
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear specific field error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (type === 'edit-yearly') {
      onYearlyBudgetUpdate(parseInt(formData.yearlyTotal));
    } else if (type === 'create-yearly') {
      onYearlyBudgetCreate(parseInt(formData.yearlyTotal));
    } else if (type === 'create') {
      onTripBudgetCreate({
        title: formData.title,
        destination: formData.destination,
        allocated: parseInt(formData.allocated)
      });
    }
  };

  const getModalTitle = () => {
    switch (type) {
      case 'edit-yearly':
        return 'Edit Yearly Budget';
      case 'create-yearly':
        return 'Create Yearly Budget';
      case 'edit-trip':
        return 'Edit Trip Budget';
      default:
        return 'Create New Trip Budget';
    }
  };

  const getSubmitButtonText = () => {
    switch (type) {
      case 'edit-yearly':
        return 'Update Budget';
      case 'create-yearly':
        return 'Create Budget';
      case 'edit-trip':
        return 'Update Trip';
      default:
        return 'Create Trip Budget';
    }
  };

  const isYearlyBudgetModal = type === 'edit-yearly' || type === 'create-yearly';
  const hasErrors = Object.keys(formErrors).length > 0;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={styles.modalOverlay}
        onClick={onClose}
      />
      <motion.div
        initial={{ 
          opacity: 0, 
          scale: 0.9,
          x: "-50%",
          y: "-50%"
        }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          x: "-50%",
          y: "-50%"
        }}
        exit={{ 
          opacity: 0, 
          scale: 0.9,
          x: "-50%",
          y: "-50%"
        }}
        transition={{ 
          type: "spring", 
          damping: 25, 
          stiffness: 300,
          opacity: { duration: 0.2 }
        }}
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%'
        }}
      >
        <div className={styles.modalHeader}>
          <h3>{getModalTitle()}</h3>
          <button onClick={onClose} className={styles.closeBtn} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className={styles.modalForm}>
          {isYearlyBudgetModal ? (
            <YearlyBudgetForm
              value={formData.yearlyTotal}
              onChange={(value) => handleInputChange('yearlyTotal', value)}
              error={formErrors.yearlyTotal}
              feedback={budgetFeedback}
              yearlyBudget={yearlyBudget}
            />
          ) : (
            <TripBudgetForm
              formData={formData}
              onChange={handleInputChange}
              errors={formErrors}
              remaining={remaining}
              getBudgetStatus={getBudgetStatus}
            />
          )}

          <div className={styles.modalActions}>
            <button type="button" onClick={onClose} className={styles.cancelBtn}>
              Cancel
            </button>
            <motion.button
              onClick={handleSubmit}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={styles.submitBtn}
              disabled={hasErrors || (!isYearlyBudgetModal && (!formData.title || !formData.destination || !formData.allocated)) || (isYearlyBudgetModal && !formData.yearlyTotal)}
            >
              {getSubmitButtonText()}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// Yearly Budget Form Sub-component
const YearlyBudgetForm = ({ value, onChange, error, feedback, yearlyBudget }) => {
  return (
    <div className={styles.inputGroup}>
      <label>Yearly Budget Total</label>
      <div className={styles.inputWrapper}>
        <DollarSign size={20} className={styles.inputIcon} />
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${styles.input} ${error ? styles.inputError : ''} ${styles.inputWithIcon}`}
          placeholder="5000"
          min="100"
          step="100"
        />
      </div>
      {error && (
        <span className={styles.errorText}>{error}</span>
      )}
      {feedback.message && !error && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.budgetFeedback}
          style={{ color: feedback.color }}
        >
          {feedback.message}
        </motion.div>
      )}
      {yearlyBudget && (
        <small className={styles.inputHint}>
          Currently allocated: {formatBudgetAmount(yearlyBudget.used)}
        </small>
      )}
    </div>
  );
};

// Trip Budget Form Sub-component
const TripBudgetForm = ({ formData, onChange, errors, remaining, getBudgetStatus }) => {
  return (
    <>
      <div className={styles.inputGroup}>
        <label>Trip Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => onChange('title', e.target.value)}
          className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
          placeholder="e.g., Summer in Japan"
        />
        {errors.title && (
          <span className={styles.errorText}>{errors.title}</span>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label>Destination</label>
        <input
          type="text"
          value={formData.destination}
          onChange={(e) => onChange('destination', e.target.value)}
          className={`${styles.input} ${errors.destination ? styles.inputError : ''}`}
          placeholder="e.g., Tokyo & Kyoto"
        />
        {errors.destination && (
          <span className={styles.errorText}>{errors.destination}</span>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label>Budget Amount</label>
        <div className={styles.inputWrapper}>
          <DollarSign size={20} className={styles.inputIcon} />
          <input
            type="number"
            value={formData.allocated}
            onChange={(e) => onChange('allocated', e.target.value)}
            className={`${styles.input} ${errors.allocated ? styles.inputError : ''} ${styles.inputWithIcon}`}
            placeholder="2000"
            min="100"
            step="50"
          />
        </div>
        {errors.allocated && (
          <span className={styles.errorText}>{errors.allocated}</span>
        )}
        {formData.allocated && !errors.allocated && getBudgetStatus && (
          <small className={`${styles.inputHint} ${
            getBudgetStatus(parseInt(formData.allocated)) === 'danger' ? styles.danger :
            getBudgetStatus(parseInt(formData.allocated)) === 'warning' ? styles.warning : ''
          }`}>
            {getBudgetStatus(parseInt(formData.allocated)) === 'danger' && 
              '⚠️ This exceeds your remaining budget'}
            {getBudgetStatus(parseInt(formData.allocated)) === 'warning' && 
              '⚠️ This will leave you with limited budget for future trips'}
            {getBudgetStatus(parseInt(formData.allocated)) === 'safe' && 
              `✓ Remaining budget after allocation: ${formatBudgetAmount(remaining - parseInt(formData.allocated))}`}
          </small>
        )}
      </div>
    </>
  );
};

export default BudgetModal;