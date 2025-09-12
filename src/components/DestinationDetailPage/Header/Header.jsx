import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Share, Plane } from 'lucide-react';
import styles from '../DestinationDetailPage.module.css';

const Header = ({ onBack, onShare, onPlanTrip }) => {
  return (
    <motion.header 
      className={styles.header}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.button
        onClick={onBack}
        className={styles.headerButton}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Go back"
      >
        <ArrowLeft size={20} />
      </motion.button>
      
      <h1 className={styles.headerTitle}>Destination Details</h1>
      
      <div className={styles.headerActions}>
        <motion.button
          onClick={onShare}
          className={styles.headerButton}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Share destination"
        >
          <Share size={20} />
        </motion.button>
        
        <motion.button
          onClick={onPlanTrip}
          className={styles.planTripButton}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plane size={18} />
          <span className={styles.planTripText}>Plan Trip</span>
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header;