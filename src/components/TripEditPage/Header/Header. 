import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Loader } from 'lucide-react';
import styles from '../TripEditPage.module.css';

const Header = ({ onBack, onSave, saving, hasChanges }) => {
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
        <ArrowLeft size={20} />
      </motion.button>
      
      <h1 className={styles.headerTitle}>Edit Trip</h1>
      
      <motion.button
        onClick={onSave}
        className={`${styles.saveButton} ${hasChanges ? styles.hasChanges : ''}`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={saving}
        aria-label="Save changes"
      >
        {saving ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <Loader size={20} />
          </motion.div>
        ) : (
          <Check size={20} />
        )}
      </motion.button>
    </motion.header>
  );
};

export default Header;