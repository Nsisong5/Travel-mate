// src/pages/AIRecommendationDetailPage/StickyFooterCTA/StickyFooterCTA.jsx
// Sticky footer with call-to-action buttons for adding to itinerary or removing recommendation

import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { fadeInUp } from '../../ActiveTrip/variants';
import styles from './StickyFooterCTA.module.css';

const StickyFooterCTA = ({ 
  isInItinerary = false,
  onAddToItinerary,
  onRemoveRecommendation 
}) => {
  return (
    <motion.div 
      className={styles.container}
      variants={fadeInUp}
      initial="initial"
      animate="animate"
    >
      <div className={styles.content}>
        <motion.button
          onClick={onAddToItinerary}
          className={`${styles.button} ${styles.primary} ${isInItinerary ? styles.added : ''}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isInItinerary}
          type="button"
        >
          <Plus size={18} />
          <span>
            {isInItinerary ? 'Added to Itinerary' : 'Add to My Itinerary'}
          </span>
        </motion.button>

        <motion.button
          onClick={onRemoveRecommendation}
          className={`${styles.button} ${styles.secondary}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
        >
          <Trash2 size={18} />
          <span>Remove Recommendation</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default StickyFooterCTA;