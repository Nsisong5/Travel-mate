// src/components/forms/ItineraryForm/ItineraryForm.jsx
// Modal form for creating/editing itinerary days
// TODO: Connect to backend API for itinerary CRUD operations

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Hash, Type } from 'lucide-react';
import { modal } from '../../variants';
import styles from './ItineraryForm.module.css';

const ItineraryForm = ({
  isOpen,
  onClose,
  onSave,
  initialData = null,
  tripId,
  mode = 'create' // 'create' | 'edit'
}) => {
  const [formData, setFormData] = useState({
    date: '',
    day: '',
    title: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Populate form when editing
  useEffect(() => {
    if (isOpen) {
      if (initialData && mode === 'edit') {
        setFormData({
          date: initialData.date || '',
          day: initialData.day || '',
          title: initialData.title || ''
        });
      } else {
        // Reset for create mode
        setFormData({
          date: '',
          day: '',
          title: ''
        });
      }
      setErrors({});
    }
  }, [isOpen, initialData, mode]);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus first input after animation
      setTimeout(() => {
        const firstInput = document.querySelector(`#${styles.dateInput}`);
        firstInput?.focus();
      }, 150);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.date.trim()) {
      newErrors.date = 'Date is required';
    }
    
    if (!formData.day.trim()) {
      newErrors.day = 'Day is required';
    }
    
    if (!formData.title.trim()) {
      newErrors.title = 'Activity name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // TODO: Replace with actual API calls
      if (mode === 'create') {
        // POST /trips/${tripId}/itinerary
        // const response = await api.post(`/trips/${tripId}/itinerary`, formData);
      } else {
        // PATCH /trips/${tripId}/itinerary/${initialData.id}
        // const response = await api.patch(`/trips/${tripId}/itinerary/${initialData.id}`, formData);
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      onSave(formData);
      onClose();
    } catch (error) {
      console.error('Failed to save itinerary:', error);
      // TODO: Show error notification
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
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
          variants={modal}
          initial="initial"
          animate="animate"
          exit="exit"
          onClick={handleBackdropClick}
          onKeyDown={handleKeyDown}
          role="dialog"
          aria-modal="true"
          aria-labelledby="form-title"
        >
          <motion.div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.header}>
              <h2 id="form-title" className={styles.title}>
                {mode === 'create' ? 'Create Itinerary' : 'Edit Itinerary'}
              </h2>
              <button
                onClick={onClose}
                className={styles.closeButton}
                aria-label="Close form"
                type="button"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="dateInput" className={styles.label}>
                  <Calendar size={16} />
                  Date
                </label>
                <input
                  id="dateInput"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className={`${styles.input} ${errors.date ? styles.inputError : ''}`}
                  placeholder="Select date"
                />
                {errors.date && (
                  <span className={styles.errorText}>{errors.date}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="dayInput" className={styles.label}>
                  <Hash size={16} />
                  Day
                </label>
                <input
                  id="dayInput"
                  type="text"
                  value={formData.day}
                  onChange={(e) => handleInputChange('day', e.target.value)}
                  className={`${styles.input} ${errors.day ? styles.inputError : ''}`}
                  placeholder="e.g., Day 1"
                />
                {errors.day && (
                  <span className={styles.errorText}>{errors.day}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="titleInput" className={styles.label}>
                  <Type size={16} />
                  Activity Name
                </label>
                <input
                  id="titleInput"
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
                  placeholder="e.g., Arrival & Explore"
                />
                {errors.title && (
                  <span className={styles.errorText}>{errors.title}</span>
                )}
              </div>

              <div className={styles.actions}>
                <button
                  type="button"
                  onClick={onClose}
                  className={`${styles.button} ${styles.secondary}`}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`${styles.button} ${styles.primary}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ItineraryForm;