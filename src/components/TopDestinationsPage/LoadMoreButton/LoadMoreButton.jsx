import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import styles from '../TopDestinationsPage.module.css';

const LoadMoreButton = ({ onClick, remainingCount }) => {
  // Only show if there are more than 2 destinations remaining (as per requirements)
  if (remainingCount <= 2) return null;

  return (
    <motion.div
      className={styles.loadMoreSection}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <motion.button
        className={styles.loadMoreButton}
        onClick={onClick}
        whileHover={{ 
          scale: 1.05,
          boxShadow: '0 8px 25px rgba(37, 99, 235, 0.3)'
        }}
        whileTap={{ scale: 0.95 }}
      >
        <Plus size={20} />
        <span>Load More Destinations</span>
        <span className={styles.remainingCount}>
          ({remainingCount} more)
        </span>
      </motion.button>
    </motion.div>
  );
};

export default LoadMoreButton;