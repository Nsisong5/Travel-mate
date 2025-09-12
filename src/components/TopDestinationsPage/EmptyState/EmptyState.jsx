import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search } from 'lucide-react';
import styles from '../TopDestinationsPage.module.css';

const EmptyState = () => {
  return (
    <motion.div
      className={styles.emptyState}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.emptyStateIcon}>
        <MapPin size={48} />
        <Search size={24} className={styles.searchOverlay} />
      </div>
      
      <h3 className={styles.emptyStateTitle}>No destinations found</h3>
      <p className={styles.emptyStateDescription}>
        Try adjusting your filters or search for a different destination.
      </p>
    </motion.div>
  );
};

export default EmptyState;