import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, ChevronDown } from 'lucide-react';
import styles from '../TopDestinationsPage.module.css';

const FilterSection = ({ filters, categories, budgetRanges, onFilterChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showBudgetDropdown, setShowBudgetDropdown] = useState(false);

  const handleCategorySelect = (category) => {
    onFilterChange('category', category);
    setShowCategoryDropdown(false);
  };

  const handleBudgetSelect = (budget) => {
    onFilterChange('budget', budget);
    setShowBudgetDropdown(false);
  };

  const activeFiltersCount = [
    filters.category !== 'All' ? 1 : 0,
    filters.budget !== 'All' ? 1 : 0,
    filters.country.trim() ? 1 : 0
  ].reduce((sum, val) => sum + val, 0);

  return (
    <motion.section 
      className={styles.filterSection}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      {/* Mobile Filter Toggle */}
      <motion.button
        className={styles.filterToggle}
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Filter size={18} />
        <span>Filters</span>
        {activeFiltersCount > 0 && (
          <span className={styles.filterBadge}>{activeFiltersCount}</span>
        )}
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.button>

      {/* Filter Content */}
      <AnimatePresence>
        {(isExpanded || window.innerWidth >= 768) && (
          <motion.div
            className={styles.filterContent}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Country Search */}
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Country or City</label>
              <div className={styles.searchWrapper}>
                <Search size={16} className={styles.searchIcon} />
                <input
                  type="text"
                  value={filters.country}
                  onChange={(e) => onFilterChange('country', e.target.value)}
                  className={styles.searchInput}
                  placeholder="Search destinations..."
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Category</label>
              <div className={styles.dropdownWrapper}>
                <button
                  className={styles.dropdownButton}
                  onClick={() => {
                    setShowCategoryDropdown(!showCategoryDropdown);
                    setShowBudgetDropdown(false);
                  }}
                >
                  <span>{filters.category}</span>
                  <ChevronDown size={16} />
                </button>
                
                <AnimatePresence>
                  {showCategoryDropdown && (
                    <motion.div
                      className={styles.dropdown}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {categories.map(category => (
                        <motion.button
                          key={category}
                          className={`${styles.dropdownItem} ${
                            filters.category === category ? styles.active : ''
                          }`}
                          onClick={() => handleCategorySelect(category)}
                          whileHover={{ backgroundColor: 'var(--card-grad-start)' }}
                        >
                          {category}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Budget Filter */}
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Budget</label>
              <div className={styles.dropdownWrapper}>
                <button
                  className={styles.dropdownButton}
                  onClick={() => {
                    setShowBudgetDropdown(!showBudgetDropdown);
                    setShowCategoryDropdown(false);
                  }}
                >
                  <span>{filters.budget}</span>
                  <ChevronDown size={16} />
                </button>
                
                <AnimatePresence>
                  {showBudgetDropdown && (
                    <motion.div
                      className={styles.dropdown}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {budgetRanges.map(budget => (
                        <motion.button
                          key={budget}
                          className={`${styles.dropdownItem} ${
                            filters.budget === budget ? styles.active : ''
                          }`}
                          onClick={() => handleBudgetSelect(budget)}
                          whileHover={{ backgroundColor: 'var(--card-grad-start)' }}
                        >
                          {budget}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default FilterSection;