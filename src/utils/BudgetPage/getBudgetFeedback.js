/**
 * Budget Engine Utility
 * Provides dynamic budget feedback based on amount ranges
 */

export const getBudgetFeedback = (amount) => {
  const numericAmount = parseFloat(amount);
  
  // Handle invalid inputs
  if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
    return {
      message: "",
      sentiment: "neutral",
      color: "var(--muted)"
    };
  }

  // Define budget ranges and corresponding feedback
  if (numericAmount < 500) {
    return {
      message: "That's a tight budget, plan carefully!",
      sentiment: "warning",
      color: "#f59e0b"
    };
  }
  
  if (numericAmount >= 500 && numericAmount <= 2000) {
    return {
      message: "Great choice! That's a smart and balanced budget.",
      sentiment: "positive",
      color: "#10b981"
    };
  }
  
  if (numericAmount > 2000 && numericAmount <= 5000) {
    return {
      message: "Excellent budget range for comfortable travel experiences!",
      sentiment: "positive",
      color: "#10b981"
    };
  }
  
  if (numericAmount > 5000 && numericAmount <= 10000) {
    return {
      message: "Wow, that's a luxurious budget — plenty of room for amazing trips!",
      sentiment: "luxurious",
      color: "#8b5cf6"
    };
  }
  
  // Ultra-high budgets (>$10,000)
  if (numericAmount > 10000) {
    return {
      message: "Premium luxury travel awaits! Sky's the limit with this budget.",
      sentiment: "premium",
      color: "#f59e0b"
    };
  }

  return {
    message: "Perfect for planning your dream adventures!",
    sentiment: "positive",
    color: "#10b981"
  };
};

// Additional utility functions for budget calculations
export const formatBudgetAmount = (amount) => {
  const numericAmount = parseFloat(amount);
  if (isNaN(numericAmount)) return "$0";
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(numericAmount);
};

export const getBudgetCategory = (amount) => {
  const numericAmount = parseFloat(amount);
  
  if (numericAmount < 500) return "Budget";
  if (numericAmount <= 2000) return "Standard";
  if (numericAmount <= 5000) return "Comfort";
  if (numericAmount <= 10000) return "Luxury";
  return "Premium";
};

export const validateBudgetAmount = (amount) => {
  const numericAmount = parseFloat(amount);
  
  return {
    isValid: !isNaN(numericAmount) && numericAmount > 0,
    error: isNaN(numericAmount) ? "Please enter a valid number" : 
           numericAmount <= 0 ? "Budget must be greater than $0" : null
  };
};