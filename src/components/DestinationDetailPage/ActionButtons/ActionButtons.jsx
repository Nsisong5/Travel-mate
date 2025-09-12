import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Heart, BookmarkPlus } from 'lucide-react';
import styles from '../DestinationDetailPage.module.css';

const ActionButtons = ({ onPlanTrip, onAddToWishlist, isWishlisted }) => {
  return (
    <div className={styles.actionSection}>
      <div className={styles.actionButtons}>
        <motion.button
          className={styles.primaryAction}
          onClick={onPlanTrip}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plane size={20} />
          <span>Plan a Trip</span>
        </motion.button>
        
        <motion.button
          className={`${styles.secondaryAction} ${isWishlisted ? styles.wishlisted : ''}`}
          onClick={onAddToWishlist}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          {isWishlisted ? (
            <>
              <Heart size={20} fill="currentColor" />
              <span>Added to Wishlist</span>
            </>
          ) : (
            <>
              <BookmarkPlus size={20} />
              <span>Add to Wishlist</span>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default ActionButtons;