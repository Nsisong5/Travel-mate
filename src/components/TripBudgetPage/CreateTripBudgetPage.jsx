// src/pages/BudgetPage/CreateTripBudgetPage.jsx
// Dedicated page for creating new trip budgets with smart allocation suggestions
//
// Backend Integration Notes:
// - Requires AuthContext: const { user, token } = useAuth() for API headers
// - API Calls: 
//   - GET /user/trips/upcoming -> { trips: [MOCK_TRIPS] }
//   - POST /user/budgets -> { trip_id, amount, allocatedBreakdown }
// - Route integration: Add <Route path="/budget/create" element={<CreateTripBudgetPage />} />

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronDown, 
  Plus, 
  Check, 
  DollarSign,
  Calendar,
  MapPin,
  Sparkles
} from 'lucide-react';
import * as Icons from 'lucide-react';
import { 
  MOCK_TRIPS, 
  MOCK_CATEGORIES, 
  BUDGET_PRESETS 
} from '../BudgetPage/mockData';
import {
  formatCurrency,
  suggestAllocation,
  calculateBudgetSummary,
  validateAllocations,
  parseNumericInput
} from '../../utils/BudgetPage/budgetEngine';
import styles from './CreateTripBudgetPage.module.css';

// Animation variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: 'easeOut',
      staggerChildren: 0.1 
    }
  },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const CreateTripBudgetPage = () => {
  const navigate = useNavigate();
  
  // Form state
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [mainBudget, setMainBudget] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [allocations, setAllocations] = useState({});
  const [showTripDropdown, setShowTripDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  
  // Data state
  const [availableTrips, setAvailableTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAvailableTrips();
  }, []);

  const fetchAvailableTrips = async () => {
    setLoading(true);
    try {
      // TODO: Replace with real API call
      // const response = await api.get('/user/trips/upcoming', {
      //   headers: { Authorization: `Bearer ${token}` }
      // });
      // const tripsWithoutBudgets = response.data.trips.filter(trip => !trip.hasBudget);
      // setAvailableTrips(tripsWithoutBudgets);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 600));
      const tripsWithoutBudgets = MOCK_TRIPS.filter(trip => !trip.hasBudget);
      setAvailableTrips(tripsWithoutBudgets);
    } catch (error) {
      console.error('Failed to fetch trips:', error);
      setErrors({ trips: 'Failed to load available trips' });
    } finally {
      setLoading(false);
    }
  };

  // Initialize categories with default selection
  useEffect(() => {
    // Pre-select essential categories
    const essentialCategories = new Set(['lodging', 'food', 'transport', 'activities']);
    setSelectedCategories(essentialCategories);
  }, []);

  // Auto-suggest allocations when budget or categories change
  useEffect(() => {
    if (mainBudget && selectedCategories.size > 0) {
      const budgetAmount = parseNumericInput(mainBudget);
      if (budgetAmount > 0) {
        const categoriesArray = Array.from(selectedCategories).map(id => 
          MOCK_CATEGORIES.find(cat => cat.id === id)
        ).filter(Boolean);
        
        const suggested = suggestAllocation(budgetAmount, categoriesArray, 'weighted');
        const newAllocations = {};
        
        suggested.forEach(cat => {
          newAllocations[cat.id] = cat.allocated;
        });
        
        setAllocations(newAllocations);
      }
    }
  }, [mainBudget, selectedCategories]);

  const handleTripSelect = (trip) => {
    setSelectedTrip(trip);
    setShowTripDropdown(false);
    clearError('trip');
  };

  const handlePresetSelect = (amount) => {
    setMainBudget(amount.toString());
    clearError('budget');
  };

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
        // Remove allocation for unchecked category
        setAllocations(prevAlloc => {
          const newAlloc = { ...prevAlloc };
          delete newAlloc[categoryId];
          return newAlloc;
        });
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  const handleAllocationChange = (categoryId, amount) => {
    const parsedAmount = parseNumericInput(amount, 0);
    setAllocations(prev => ({
      ...prev,
      [categoryId]: parsedAmount
    }));
  };

  const clearError = (field) => {
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Calculate summary for preview
  const getCurrentAllocations = () => {
    return Array.from(selectedCategories).map(id => {
      const category = MOCK_CATEGORIES.find(cat => cat.id === id);
      return {
        ...category,
        allocated: allocations[id] || 0,
        spent: 0
      };
    });
  };

  const budgetSummary = calculateBudgetSummary(
    { amount: parseNumericInput(mainBudget) },
    getCurrentAllocations(),
    []
  );

  const validation = validateAllocations(
    parseNumericInput(mainBudget),
    getCurrentAllocations()
  );

  const validateForm = () => {
    const newErrors = {};

    if (!selectedTrip) {
      newErrors.trip = 'Please select a trip';
    }

    const budgetAmount = parseNumericInput(mainBudget);
    if (budgetAmount <= 0) {
      newErrors.budget = 'Budget amount must be greater than 0';
    }

    if (selectedCategories.size === 0) {
      newErrors.categories = 'Please select at least one category';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm() || !validation.isValid) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        trip_id: selectedTrip.id,
        amount: parseNumericInput(mainBudget),
        allocatedBreakdown: getCurrentAllocations().map(cat => ({
          category: cat.id,
          allocated: cat.allocated
        }))
      };

      // TODO: Replace with real API call
      // const response = await api.post('/user/budgets', payload, {
      //   headers: { 
      //     Authorization: `Bearer ${token}`,
      //     'Content-Type': 'application/json'
      //   }
      // });
      // const newBudget = response.data;

      // Simulate successful creation
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Navigate to budget dashboard for the created budget
      navigate(`/budget?trip=${selectedTrip.id}`, {
        state: { message: 'Budget created successfully!' }
      });

    } catch (error) {
      console.error('Failed to create budget:', error);
      setErrors({ submit: 'Failed to create budget. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.skeleton} />
      </div>
    );
  }

  return (
    <motion.div 
      className={styles.container}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Header */}
      <motion.header className={styles.header} variants={pageVariants}>
        <button
          onClick={() => navigate(-1)}
          className={styles.backButton}
          aria-label="Go back"
          type="button"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className={styles.title}>Create Trip Budget</h1>
      </motion.header>

      <div className={styles.content}>
        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Trip Selection */}
          <motion.section className={styles.section} variants={pageVariants}>
            <h2 className={styles.sectionTitle}>
              <MapPin size={18} />
              Select Trip
            </h2>
            
            <div className={styles.tripSelector}>
              <button
                type="button"
                onClick={() => setShowTripDropdown(!showTripDropdown)}
                className={`${styles.tripButton} ${errors.trip ? styles.inputError : ''}`}
              >
                {selectedTrip ? (
                  <>
                    <div className={styles.tripInfo}>
                      <span className={styles.tripTitle}>{selectedTrip.title}</span>
                      <span className={styles.tripDates}>
                        {new Date(selectedTrip.start_date).toLocaleDateString()} - 
                        {new Date(selectedTrip.end_date).toLocaleDateString()}
                      </span>
                    </div>
                    <ChevronDown size={16} />
                  </>
                ) : (
                  <>
                    <span>Select a trip</span>
                    <ChevronDown size={16} />
                  </>
                )}
              </button>

              {showTripDropdown && (
                <motion.div 
                  className={styles.tripDropdown}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {availableTrips.map(trip => (
                    <button
                      key={trip.id}
                      type="button"
                      onClick={() => handleTripSelect(trip)}
                      className={styles.tripOption}
                    >
                      <div className={styles.tripInfo}>
                        <span className={styles.tripTitle}>{trip.title}</span>
                        <span className={styles.tripDates}>
                          {new Date(trip.start_date).toLocaleDateString()} - 
                          {new Date(trip.end_date).toLocaleDateString()}
                        </span>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
            
            {errors.trip && (
              <span className={styles.errorText}>{errors.trip}</span>
            )}
          </motion.section>

          {/* Budget Amount */}
          <motion.section className={styles.section} variants={pageVariants}>
            <h2 className={styles.sectionTitle}>
              <DollarSign size={18} />
              Budget Amount
            </h2>

            {/* Budget Presets */}
            <div className={styles.presets}>
              {BUDGET_PRESETS.map(preset => (
                <button
                  key={preset.amount}
                  type="button"
                  onClick={() => handlePresetSelect(preset.amount)}
                  className={styles.presetButton}
                >
                  <span className={styles.presetLabel}>{preset.label}</span>
                  <span className={styles.presetAmount}>{formatCurrency(preset.amount)}</span>
                </button>
              ))}
            </div>

            {/* Manual Input */}
            <div className={styles.budgetInput}>
              <input
                type="number"
                min="0"
                step="0.01"
                value={mainBudget}
                onChange={(e) => {
                  setMainBudget(e.target.value);
                  clearError('budget');
                }}
                className={`${styles.input} ${styles.currencyInput} ${errors.budget ? styles.inputError : ''}`}
                placeholder="Enter custom amount"
              />
            </div>
            
            {errors.budget && (
              <span className={styles.errorText}>{errors.budget}</span>
            )}
          </motion.section>

          {/* Category Selection */}
          <motion.section className={styles.section} variants={pageVariants}>
            <h2 className={styles.sectionTitle}>
              <Sparkles size={18} />
              Choose Categories
            </h2>

            <div className={styles.categoriesGrid}>
              {MOCK_CATEGORIES.map(category => {
                const IconComponent = Icons[category.iconName] || Icons.Circle;
                const isSelected = selectedCategories.has(category.id);
                const allocation = allocations[category.id] || 0;

                return (
                  <motion.div
                    key={category.id}
                    className={`${styles.categoryCard} ${isSelected ? styles.categorySelected : ''}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <label className={styles.categoryLabel}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleCategoryToggle(category.id)}
                        className={styles.categoryCheckbox}
                      />
                      
                      <div className={styles.categoryHeader}>
                        <div className={styles.categoryIcon}>
                          <IconComponent size={16} />
                        </div>
                        <span className={styles.categoryName}>{category.name}</span>
                        {isSelected && (
                          <div className={styles.checkIcon}>
                            <Check size={14} />
                          </div>
                        )}
                      </div>
                      
                      {isSelected && (
                        <motion.div 
                          className={styles.allocationInput}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                        >
                          <input
                            type="number"
                            min="0"
                            step="0.01"
                            value={allocation || ''}
                            onChange={(e) => handleAllocationChange(category.id, e.target.value)}
                            className={styles.allocationAmountInput}
                            placeholder="0.00"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <span className={styles.allocationLabel}>
                            {formatCurrency(allocation)}
                          </span>
                        </motion.div>
                      )}
                    </label>
                  </motion.div>
                );
              })}
            </div>
            
            {errors.categories && (
              <span className={styles.errorText}>{errors.categories}</span>
            )}
          </motion.section>

          {/* Budget Preview */}
          {parseNumericInput(mainBudget) > 0 && selectedCategories.size > 0 && (
            <motion.section 
              className={styles.previewSection}
              variants={pageVariants}
            >
              <h2 className={styles.sectionTitle}>
                <Calendar size={18} />
                Budget Preview
              </h2>

              <div className={styles.previewCard}>
                <div className={styles.previewRow}>
                  <span className={styles.previewLabel}>Total Budget:</span>
                  <span className={styles.previewValue}>
                    {formatCurrency(budgetSummary.mainBudget)}
                  </span>
                </div>
                
                <div className={styles.previewRow}>
                  <span className={styles.previewLabel}>Total Allocated:</span>
                  <span className={`${styles.previewValue} ${
                    budgetSummary.totalAllocated > budgetSummary.mainBudget ? styles.overBudget : ''
                  }`}>
                    {formatCurrency(budgetSummary.totalAllocated)}
                  </span>
                </div>
                
                <div className={styles.previewRow}>
                  <span className={styles.previewLabel}>Remaining:</span>
                  <span className={`${styles.previewValue} ${
                    budgetSummary.remainingAfterAllocated < 0 ? styles.overBudget : styles.remaining
                  }`}>
                    {formatCurrency(budgetSummary.remainingAfterAllocated)}
                  </span>
                </div>

                {!validation.isValid && (
                  <div className={styles.validationWarning}>
                    <span>Please adjust allocations to match your budget.</span>
                  </div>
                )}
              </div>
            </motion.section>
          )}

          {/* Submit Error */}
          {errors.submit && (
            <div className={styles.submitError}>
              {errors.submit}
            </div>
          )}

          {/* Actions */}
          <motion.div className={styles.actions} variants={pageVariants}>
            <button
              type="submit"
              className={styles.createButton}
              disabled={isSubmitting || !validation.isValid}
            >
              {isSubmitting ? 'Creating Budget...' : 'Create Budget'}
            </button>

            <div className={styles.secondaryActions}>
              <button
                type="button"
                onClick={() => navigate('/budget')}
                className={styles.secondaryButton}
              >
                Go to Dashboard
              </button>
              
              <button
                type="button"
                onClick={() => window.location.reload()}
                className={styles.secondaryButton}
              >
                Add Another Budget
              </button>
            </div>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};

export default CreateTripBudgetPage;