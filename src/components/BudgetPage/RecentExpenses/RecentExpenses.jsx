// src/pages/BudgetPage/components/RecentExpenses.jsx
// Recent expenses list with edit/delete actions and add expense CTA

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit3, Trash2, Plus, Receipt, Filter } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils';
import styles from './RecentExpenses.module.css';

const RecentExpenses = ({ expenses = [], onDeleteExpense, onAddExpense }) => {
  const [filter, setFilter] = useState('all'); // 'all', 'confirmed', 'planned'
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // Filter expenses based on selected filter
  const filteredExpenses = expenses.filter(expense => {
    if (filter === 'confirmed') return !expense.is_planned;
    if (filter === 'planned') return expense.is_planned;
    return true; // 'all'
  });

  const handleDeleteClick = (expense) => {
    setShowDeleteConfirm(expense);
  };

  const handleConfirmDelete = async () => {
    if (showDeleteConfirm) {
      try {
        await onDeleteExpense(showDeleteConfirm.id);
        setShowDeleteConfirm(null);
      } catch (error) {
        console.error('Failed to delete expense:', error);
      }
    }
  };

  const handleEditClick = (expense) => {
    // TODO: Implement edit expense functionality
    console.log('Edit expense:', expense);
  };

  if (expenses.length === 0) {
    return (
      <motion.div 
        className={styles.emptyState}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Receipt size={48} />
        <h3>No expenses yet</h3>
        <p>Start tracking your travel expenses</p>
        <button onClick={onAddExpense} className={styles.addButton}>
          <Plus size={18} />
          Add First Expense
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header with filters */}
      <div className={styles.header}>
        <h2 className={styles.title}>Recent Expenses</h2>
        <div className={styles.filters}>
          <button
            onClick={() => setFilter('all')}
            className={`${styles.filterButton} ${filter === 'all' ? styles.filterActive : ''}`}
            type="button"
          >
            All
          </button>
          <button
            onClick={() => setFilter('confirmed')}
            className={`${styles.filterButton} ${filter === 'confirmed' ? styles.filterActive : ''}`}
            type="button"
          >
            Confirmed
          </button>
          <button
            onClick={() => setFilter('planned')}
            className={`${styles.filterButton} ${filter === 'planned' ? styles.filterActive : ''}`}
            type="button"
          >
            Planned
          </button>
        </div>
      </div>

      {/* Expenses List */}
      <div className={styles.expensesList}>
        <AnimatePresence>
          {filteredExpenses.map((expense, index) => (
            <motion.div
              key={expense.id}
              className={`${styles.expenseItem} ${expense.is_planned ? styles.planned : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.05 }}
              layout
            >
              <div className={styles.expenseContent}>
                <div className={styles.expenseMain}>
                  <div className={styles.expenseInfo}>
                    <span className={styles.description}>{expense.description}</span>
                    <div className={styles.metadata}>
                      <span className={styles.category}>{expense.categoryName}</span>
                      <span className={styles.date}>{formatDate(expense.date)}</span>
                      {expense.is_planned && (
                        <span className={styles.plannedBadge}>Planned</span>
                      )}
                    </div>
                  </div>
                  <div className={styles.amount}>
                    {formatCurrency(expense.amount)}
                  </div>
                </div>
                
                <div className={styles.actions}>
                  <button
                    onClick={() => handleEditClick(expense)}
                    className={styles.actionButton}
                    aria-label={`Edit ${expense.description}`}
                    type="button"
                  >
                    <Edit3 size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(expense)}
                    className={`${styles.actionButton} ${styles.deleteButton}`}
                    aria-label={`Delete ${expense.description}`}
                    type="button"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add Expense CTA */}
      <motion.div className={styles.addExpenseSection}>
        <button onClick={onAddExpense} className={styles.addExpenseButton}>
          <Plus size={18} />
          Add Expense
        </button>
      </motion.div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            className={styles.deleteModal}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDeleteConfirm(null)}
          >
            <motion.div
              className={styles.deleteModalContent}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Delete Expense</h3>
              <p>Are you sure you want to delete "{showDeleteConfirm.description}"?</p>
              <div className={styles.deleteModalActions}>
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className={styles.cancelButton}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className={styles.deleteConfirmButton}
                  type="button"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RecentExpenses;