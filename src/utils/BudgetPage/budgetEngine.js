// src/pages/BudgetPage/utils/budgetEngine.js
// Client-side budget calculation engine for real-time budget validation and allocation

/**
 * Format currency value using Intl.NumberFormat
 * TODO: Connect to user preferences for currency from AuthContext/UserSettings
 */
export const formatCurrency = (value, locale = 'en-US', currency = 'USD') => {
  if (value === null || value === undefined || isNaN(value)) return '$0.00';
  
  try {
    return new Intl.NumberFormat(locale, {
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
 * Calculate comprehensive budget summary with all totals
 */
export const calculateBudgetSummary = (budget, allocations = [], expenses = []) => {
  const mainBudget = budget?.amount || 0;
  
  // Calculate total allocated across categories
  const totalAllocated = allocations.reduce((sum, cat) => sum + (cat.allocated || 0), 0);
  
  // Calculate confirmed and planned spending from expenses
  const confirmedSpent = expenses
    .filter(exp => !exp.is_planned)
    .reduce((sum, exp) => sum + exp.amount, 0);
  
  const plannedSpent = expenses
    .filter(exp => exp.is_planned)
    .reduce((sum, exp) => sum + exp.amount, 0);
  
  // Calculate remaining amounts
  const remainingAfterConfirmed = Math.max(mainBudget - confirmedSpent, 0);
  const remainingAfterAllocated = Math.max(mainBudget - totalAllocated, 0);
  const remainingTotal = Math.max(mainBudget - confirmedSpent - plannedSpent, 0);
  
  // Determine budget status
  let status = 'healthy';
  let statusMessage = 'Budget is on track';
  
  if (confirmedSpent > mainBudget) {
    status = 'overbudget';
    statusMessage = `Over budget by ${formatCurrency(confirmedSpent - mainBudget)}`;
  } else if (totalAllocated > mainBudget) {
    status = 'overallocated';
    statusMessage = `Over-allocated by ${formatCurrency(totalAllocated - mainBudget)}`;
  } else if ((confirmedSpent + plannedSpent) > mainBudget) {
    status = 'projected_overrun';
    statusMessage = 'Projected to exceed budget';
  } else if (confirmedSpent > (mainBudget * 0.8)) {
    status = 'warning';
    statusMessage = 'Approaching budget limit';
  }
  
  return {
    mainBudget,
    totalAllocated,
    confirmedSpent,
    plannedSpent,
    remainingAfterConfirmed,
    remainingAfterAllocated,
    remainingTotal,
    status,
    statusMessage,
    percentUsed: mainBudget > 0 ? (confirmedSpent / mainBudget) * 100 : 0,
    percentAllocated: mainBudget > 0 ? (totalAllocated / mainBudget) * 100 : 0
  };
};

/**
 * Validate budget allocations and return errors/warnings
 */
export const validateAllocations = (mainBudget, allocations, confirmedSpent = 0) => {
  const errors = [];
  const warnings = [];
  
  if (mainBudget <= 0) {
    errors.push('Main budget must be greater than 0');
  }
  
  const totalAllocated = allocations.reduce((sum, cat) => sum + (cat.allocated || 0), 0);
  
  if (totalAllocated > mainBudget) {
    errors.push(`Total allocations (${formatCurrency(totalAllocated)}) exceed main budget (${formatCurrency(mainBudget)})`);
  }
  
  // Check individual categories for overspending
  allocations.forEach(category => {
    if (category.spent > category.allocated) {
      warnings.push(`${category.name}: Already spent ${formatCurrency(category.spent)} of ${formatCurrency(category.allocated)} allocated`);
    }
    
    if (category.allocated < 0) {
      errors.push(`${category.name}: Allocation cannot be negative`);
    }
  });
  
  if (confirmedSpent > mainBudget) {
    errors.push(`Already spent ${formatCurrency(confirmedSpent)} which exceeds budget of ${formatCurrency(mainBudget)}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    hasWarnings: warnings.length > 0
  };
};

/**
 * Suggest smart allocation amounts based on category weights or equal distribution
 */
export const suggestAllocation = (mainBudget, categories, strategy = 'weighted') => {
  if (mainBudget <= 0 || !categories || categories.length === 0) {
    return categories || [];
  }
  
  // Default category weights for travel budgets
  const defaultWeights = {
    lodging: 0.40,     // 40% for accommodation
    food: 0.25,        // 25% for meals
    transport: 0.20,   // 20% for transportation
    activities: 0.10,  // 10% for activities/entertainment
    shopping: 0.03,    // 3% for shopping
    misc: 0.02         // 2% for miscellaneous
  };
  
  if (strategy === 'equal') {
    // Equal distribution
    const amountPerCategory = mainBudget / categories.length;
    return categories.map(cat => ({
      ...cat,
      allocated: Math.round(amountPerCategory)
    }));
  }
  
  // Weighted distribution
  const totalWeight = categories.reduce((sum, cat) => {
    return sum + (defaultWeights[cat.id] || (1 / categories.length));
  }, 0);
  
  return categories.map(cat => {
    const weight = defaultWeights[cat.id] || (1 / categories.length);
    const normalizedWeight = weight / totalWeight;
    const suggestedAmount = Math.round(mainBudget * normalizedWeight);
    
    return {
      ...cat,
      allocated: suggestedAmount
    };
  });
};

/**
 * Auto-adjust allocations when one category changes to prevent over-allocation
 */
export const autoAdjustAllocations = (allocations, changedCategoryId, newAmount, maxBudget) => {
  if (!allocations || allocations.length === 0) return allocations;
  
  const otherCategories = allocations.filter(cat => cat.id !== changedCategoryId);
  const changedCategory = allocations.find(cat => cat.id === changedCategoryId);
  
  if (!changedCategory) return allocations;
  
  const otherCategoriesTotal = otherCategories.reduce((sum, cat) => sum + cat.allocated, 0);
  const remainingBudget = maxBudget - newAmount;
  
  // If remaining budget can accommodate other categories, no adjustment needed
  if (remainingBudget >= otherCategoriesTotal) {
    return allocations.map(cat => 
      cat.id === changedCategoryId ? { ...cat, allocated: newAmount } : cat
    );
  }
  
  // Need to proportionally reduce other categories
  if (remainingBudget > 0 && otherCategoriesTotal > 0) {
    const reductionRatio = remainingBudget / otherCategoriesTotal;
    
    return allocations.map(cat => {
      if (cat.id === changedCategoryId) {
        return { ...cat, allocated: newAmount };
      }
      
      const adjustedAmount = Math.max(0, Math.round(cat.allocated * reductionRatio));
      return { ...cat, allocated: adjustedAmount };
    });
  }
  
  // If no remaining budget, zero out other categories
  return allocations.map(cat => ({
    ...cat,
    allocated: cat.id === changedCategoryId ? newAmount : 0
  }));
};

/**
 * Calculate category spending status for visual indicators
 */
export const getCategoryStatus = (category) => {
  const { allocated, spent } = category;
  const percentSpent = allocated > 0 ? (spent / allocated) * 100 : 0;
  
  if (spent > allocated) {
    return {
      status: 'overbudget',
      color: '#ef4444',
      message: `Over by ${formatCurrency(spent - allocated)}`
    };
  } else if (percentSpent >= 80) {
    return {
      status: 'warning',
      color: '#f59e0b',
      message: `${Math.round(100 - percentSpent)}% remaining`
    };
  } else if (percentSpent >= 50) {
    return {
      status: 'moderate',
      color: '#3b82f6',
      message: `${Math.round(100 - percentSpent)}% remaining`
    };
  } else {
    return {
      status: 'healthy',
      color: '#10b981',
      message: `${Math.round(100 - percentSpent)}% remaining`
    };
  }
};

/**
 * Generate budget insights and recommendations
 */
export const getBudgetInsights = (budgetSummary) => {
  const insights = [];
  const { status, percentUsed, remainingAfterConfirmed, mainBudget } = budgetSummary;
  
  switch (status) {
    case 'overbudget':
      insights.push({
        type: 'error',
        title: 'Budget Exceeded',
        message: 'Consider reviewing your expenses or increasing your budget.',
        action: 'Review expenses'
      });
      break;
      
    case 'warning':
      insights.push({
        type: 'warning',
        title: 'Approaching Limit',
        message: `You have ${formatCurrency(remainingAfterConfirmed)} remaining.`,
        action: 'Monitor spending'
      });
      break;
      
    case 'healthy':
      if (percentUsed < 25) {
        insights.push({
          type: 'success',
          title: 'Great Budgeting!',
          message: 'You\'re well within your spending limits.',
          action: 'Keep it up'
        });
      }
      break;
  }
  
  return insights;
};

/**
 * Parse and sanitize numeric input for budget amounts
 */
export const parseNumericInput = (value, min = 0, max = Infinity) => {
  if (value === '' || value === null || value === undefined) return 0;
  
  const parsed = typeof value === 'string' 
    ? parseFloat(value.replace(/[^\d.-]/g, '')) 
    : parseFloat(value);
    
  if (isNaN(parsed)) return 0;
  
  return Math.max(min, Math.min(max, parsed));
};