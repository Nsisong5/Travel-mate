import React from 'react';
import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';
import styles from '../TripEditPage.module.css';

const Footer = ({ 
  onCancel, 
  onSave, 
  saving = false, 
  hasChanges = false 
}) => {
  return (
    <motion.footer 
      className={styles.footer}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className={styles.footerActions}>
        <motion.button
          type="button"
          onClick={onCancel}
          className={styles.cancelButton}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={saving}
        >
          Cancel
        </motion.button>
        
        <motion.button
          type="button"
          onClick={onSave}
          className={`${styles.saveChangesButton} ${hasChanges ? styles.hasChanges : ''}`}
          whileHover={!saving ? { scale: 1.02, y: -1 } : {}}
          whileTap={!saving ? { scale: 0.98 } : {}}
          disabled={saving}
        >
          {saving ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Loader size={18} />
              </motion.div>
              <span>Saving...</span>
            </>
          ) : (
            <span>Save Changes</span>
          )}
        </motion.button>
      </div>
    </motion.footer>
  );
};

export default Footer;