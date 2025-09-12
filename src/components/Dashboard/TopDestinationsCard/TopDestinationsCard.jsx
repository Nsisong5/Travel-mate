import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoreVertical, ChevronDown } from 'lucide-react';
import styles from './TopDestinationsCard.module.css';

// Mock data for different time periods
const MOCK_DATA = {
  'all-time': [
    { rank: 1, country: 'France', flag: '🇫🇷', visits: 89500 },
    { rank: 2, country: 'Spain', flag: '🇪🇸', visits: 72300 },
    { rank: 3, country: 'United States', flag: '🇺🇸', visits: 68900 },
    { rank: 4, country: 'China', flag: '🇨🇳', visits: 62800 },
    { rank: 5, country: 'Italy', flag: '🇮🇹', visits: 58400 }
  ],
  'this-month': [
    { rank: 1, country: 'Japan', flag: '🇯🇵', visits: 12400 },
    { rank: 2, country: 'Thailand', flag: '🇹🇭', visits: 9800 },
    { rank: 3, country: 'Greece', flag: '🇬🇷', visits: 8600 },
    { rank: 4, country: 'Turkey', flag: '🇹🇷', visits: 7200 },
    { rank: 5, country: 'Portugal', flag: '🇵🇹', visits: 6800 }
  ],
  'this-week': [
    { rank: 1, country: 'Maldives', flag: '🇲🇻', visits: 2100 },
    { rank: 2, country: 'Bali', flag: '🇮🇩', visits: 1800 },
    { rank: 3, country: 'Dubai', flag: '🇦🇪', visits: 1600 },
    { rank: 4, country: 'Iceland', flag: '🇮🇸', visits: 1400 },
    { rank: 5, country: 'Norway', flag: '🇳🇴', visits: 1200 }
  ]
};

const FILTER_OPTIONS = [
  { value: 'all-time', label: 'All Time' },
  { value: 'this-month', label: 'This Month' },
  { value: 'this-week', label: 'This Week' }
];

const TopDestinationsCard = () => {
  const [selectedFilter, setSelectedFilter] = useState('this-month');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);

  const currentData = MOCK_DATA[selectedFilter];
  const maxVisits = Math.max(...currentData.map(item => item.visits));

  const handleFilterChange = (value) => {
    setSelectedFilter(value);
    setShowDropdown(false);
  };

  const formatVisits = (visits) => {
    if (visits >= 1000) {
      return `${(visits / 1000).toFixed(1)}k`;
    }
    return visits.toString();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  };

  const barVariants = {
    hidden: { width: 0 },
    visible: (visits) => ({
      width: `${(visits / maxVisits) * 100}%`,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        delay: 0.3
      }
    })
  };

  return (
    <motion.div 
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className={styles.header}>
        <h3 className={styles.title}>Top Destinations (This Month)</h3>
        
        <div className={styles.headerActions}>
          {/* Filter Dropdown */}
          <div className={styles.filterWrapper}>
            <motion.button
              className={`${styles.filterButton} ${showDropdown ? styles.active : ''}`}
              onClick={() => setShowDropdown(!showDropdown)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{FILTER_OPTIONS.find(opt => opt.value === selectedFilter)?.label}</span>
              <motion.div
                animate={{ rotate: showDropdown ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={16} />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  className={styles.dropdown}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {FILTER_OPTIONS.map(option => (
                    <motion.button
                      key={option.value}
                      className={`${styles.dropdownOption} ${
                        selectedFilter === option.value ? styles.selected : ''
                      }`}
                      onClick={() => handleFilterChange(option.value)}
                      whileHover={{ backgroundColor: 'var(--card-grad-start)' }}
                    >
                      {option.label}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Options Menu */}
          <div className={styles.optionsWrapper}>
            <motion.button
              className={`${styles.optionsButton} ${showOptionsMenu ? styles.active : ''}`}
              onClick={() => setShowOptionsMenu(!showOptionsMenu)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <MoreVertical size={16} />
            </motion.button>

            <AnimatePresence>
              {showOptionsMenu && (
                <motion.div
                  className={styles.optionsMenu}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                >
                  <button className={styles.optionsMenuItem}>Export Data</button>
                  <button className={styles.optionsMenuItem}>Refresh</button>
                  <button className={styles.optionsMenuItem}>Settings</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className={styles.tableWrapper}>
        <div className={styles.tableHeader}>
          <span className={styles.rankColumn}>Rank</span>
          <span className={styles.countryColumn}>Country</span>
          <span className={styles.visitsColumn}>Visits</span>
          <span className={styles.chartColumn}>Trend</span>
        </div>

        <motion.div
          className={styles.tableBody}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={selectedFilter} // Re-animate when filter changes
        >
          {currentData.map((item) => (
            <motion.div
              key={`${selectedFilter}-${item.rank}`}
              className={styles.tableRow}
              variants={rowVariants}
              whileHover={{ backgroundColor: 'var(--card-grad-start)' }}
            >
              <div className={styles.rankCell}>
                <span className={styles.rankNumber}>{item.rank}</span>
              </div>
              
              <div className={styles.countryCell}>
                <span className={styles.flag}>{item.flag}</span>
                <span className={styles.countryName}>{item.country}</span>
              </div>
              
              <div className={styles.visitsCell}>
                <span className={styles.visitsNumber}>{formatVisits(item.visits)}</span>
              </div>
              
              <div className={styles.chartCell}>
                <div className={styles.barContainer}>
                  <motion.div
                    className={styles.bar}
                    variants={barVariants}
                    custom={item.visits}
                    initial="hidden"
                    animate="visible"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <motion.button
          className={styles.viewAllButton}
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {/* Navigate to full destinations page */}}
        >
          View All Destinations
        </motion.button>
      </div>

      {/* Backdrop for dropdowns */}
      {(showDropdown || showOptionsMenu) && (
        <div 
          className={styles.backdrop}
          onClick={() => {
            setShowDropdown(false);
            setShowOptionsMenu(false);
          }}
        />
      )}
    </motion.div>
  );
};

export default TopDestinationsCard;