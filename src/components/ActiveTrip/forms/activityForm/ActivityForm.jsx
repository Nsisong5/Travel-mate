// src/components/forms/ActivityForm/ActivityForm.jsx
// Modal form for creating/editing individual activities within itinerary days
// TODO: Connect to backend API for activity CRUD operations

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Type, MapPin, Clock } from 'lucide-react';
import { modal } from '../../variants';
import styles from './ActivityForm.module.css';

const ActivityForm = ({
  isOpen,
  onClose,
  onSave,
  initialData = null,
  tripId,
  dayId,
  mode = 'create' // 'create' | 'edit'
}) => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    time: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Populate form when editing
  useEffect(() => {
    if (isOpen) {
      if (initialData && mode === 'edit') {
        setFormData({
          title: initialData.title || '',
          location: initialData.location || '',
          time: initialData.time || ''
        });
      } else {
        // Reset for create mode
        setFormData({
          title: '',
          location: '',
          time: ''
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
        const firstInput = document.querySelector('#activityTitleInput');
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
    
    if (!formData.title.trim()) {
      newErrors.title = 'Activity name is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.time.trim()) {
      newErrors.time = 'Time is required';
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
        // POST /trips/${tripId}/itinerary/${dayId}/activities
        // const response = await api.post(`/trips/${tripId}/itinerary/${dayId}/activities`, formData);
      } else {
        // PATCH /trips/${tripId}/itinerary/${dayId}/activities/${initialData.id}
        // const response = await api.patch(`/trips/${tripId}/itinerary/${dayId}/activities/${initialData.id}`, formData);
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 600));
      
      onSave(formData);
      onClose();
    } catch (error) {
      console.error('Failed to save activity:', error);
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
          aria-labelledby="activity-form-title"
        >
          <motion.div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.header}>
              <h2 id="activity-form-title" className={styles.title}>
                {mode === 'create' ? 'Add Activity' : 'Edit Activity'}
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
                <label htmlFor="activityTitleInput" className={styles.label}>
                  <Type size={16} />
                  Activity
                </label>
                <input
                  id="activityTitleInput"
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
                  placeholder="e.g., Eat Dinner"
                />
                {errors.title && (
                  <span className={styles.errorText}>{errors.title}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="activityLocationInput" className={styles.label}>
                  <MapPin size={16} />
                  Location
                </label>
                <input
                  id="activityLocationInput"
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className={`${styles.input} ${errors.location ? styles.inputError : ''}`}
                  placeholder="e.g., Le Comptoir Restaurant"
                />
                {errors.location && (
                  <span className={styles.errorText}>{errors.location}</span>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="activityTimeInput" className={styles.label}>
                  <Clock size={16} />
                  Time
                </label>
                <input
                  id="activityTimeInput"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  className={`${styles.input} ${errors.time ? styles.inputError : ''}`}
                />
                {errors.time && (
                  <span className={styles.errorText}>{errors.time}</span>
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

export default ActivityForm;