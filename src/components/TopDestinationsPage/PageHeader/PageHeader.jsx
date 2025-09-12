import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Info } from 'lucide-react';
import styles from '../TopDestinationsPage.module.css';

const PageHeader = ({ title, onBack, showInfo = false, onInfoClick }) => {
  return (
    <motion.header 
      className={styles.header}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.button
        onClick={onBack}
        className={styles.backButton}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Go back"
      >
        <ChevronLeft size={20} />
      </motion.button>
      
      <h1 className={styles.pageTitle}>{title}</h1>
      
      {showInfo ? (
        <motion.button
          onClick={onInfoClick}
          className={styles.infoButton}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="More information"
        >
          <Info size={20} />
        </motion.button>
      ) : (
        <div className={styles.headerSpacer} />
      )}
    </motion.header>
  );
};

export default PageHeader;