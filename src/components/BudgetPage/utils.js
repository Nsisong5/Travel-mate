// src/pages/BudgetPage/utils.js
// Utility functions for budget calculations and formatting

/**
 * Format currency value using Intl.NumberFormat
 * TODO: Connect to user preferences for currency (EUR, USD, etc.)
 * Currently defaults to USD - replace with user.currency from context/settings
 */
export const formatCurrency = (value, currency = 'USD') => {
  if (value === null || value === undefined || isNaN(value)) return '$0.00';
  
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  } catch (error) {
    // Fallback formatting if currency is invalid
    return `$${parseFloat(value).toFixed(2)}`;
  }
};

/**
 * Calculate percentage with safe division by zero
 */
export const percent = (used, total) => {
  if (!total || total === 0) return 0;
  const percentage = (used / total) * 100;
  return Math.min(Math.max(percentage, 0), 100); // Clamp between 0-100
};

/**
 * Calculate remaining budget safely
 */
export const calculateRemaining = (total, confirmedSpent = 0) => {
  return Math.max(total - confirmedSpent, 0);
};

/**
 * Get budget status color based on percentage used
 */
export const getBudgetStatusColor = (percentUsed) => {
  if (percentUsed >= 90) return '#ef4444'; // red - danger
  if (percentUsed >= 70) return '#f59e0b'; // amber - warning
  return '#10b981'; // green - good
};

/**
 * Generate budget insight message based on spending patterns
 */
export const getBudgetInsight = (budget) => {
  const totalSpent = budget.confirmedSpent || 0;
  const totalBudget = budget.amount || 0;
  const percentUsed = percent(totalSpent, totalBudget);

  if (percentUsed >= 90) {
    return {
      type: 'warning',
      message: 'You\'ve used 90% of your budget. Consider reviewing your spending.',
      color: '#ef4444'
    };
  } else if (percentUsed >= 70) {
    return {
      type: 'caution',
      message: `You're ${Math.round(percentUsed)}% through your budget. Keep an eye on spending.`,
      color: '#f59e0b'
    };
  } else if (percentUsed >= 50) {
    return {
      type: 'info',
      message: 'You\'re halfway through your budget. Good pacing so far!',
      color: '#3b82f6'
    };
  } else {
    return {
      type: 'success',
      message: 'Great budgeting! You\'re well within your spending limits.',
      color: '#10b981'
    };
  }
};

/**
 * Format date for display
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    }).format(date);
  } catch (error) {
    return dateString;
  }
};

/**
 * Get category icon name mapping
 */
export const getCategoryIcon = (categoryId) => {
  const iconMap = {
    food: 'utensils',
    lodging: 'bed',
    transport: 'car',
    activities: 'map-pin',
    shopping: 'shopping-bag',
    misc: 'more-horizontal'
  };
  
  return iconMap[categoryId] || 'circle';
};

/**
 * Validate expense form data
 */
export const validateExpense = (expenseData) => {
  const errors = {};
  
  if (!expenseData.amount || expenseData.amount <= 0) {
    errors.amount = 'Amount must be greater than 0';
  }
  
  if (!expenseData.category) {
    errors.category = 'Category is required';
  }
  
  if (!expenseData.date) {
    errors.date = 'Date is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};