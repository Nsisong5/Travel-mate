import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import styles from '../TripEditPage.module.css';

const RatingField = ({ 
  label, 
  value = 0, 
  onChange,
  maxRating = 5 
}) => {
  return (
    <div className={styles.ratingField}>
      <label className={styles.fieldLabel}>
        <Star size={16} className={styles.fieldIcon} />
        <span className={styles.labelText}>{label}</span>
      </label>
      
      <div className={styles.ratingStars}>
        {Array.from({ length: maxRating }, (_, index) => {
          const starValue = index + 1;
          const isActive = starValue <= value;
          
          return (
            <motion.button
              key={starValue}
              type="button"
              className={`${styles.ratingStar} ${isActive ? styles.ratingStarActive : ''}`}
              onClick={() => onChange(starValue)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Rate ${starValue} out of ${maxRating} stars`}
            >
              <Star 
                size={24} 
                fill={isActive ? '#f59e0b' : 'transparent'}
                color={isActive ? '#f59e0b' : 'var(--muted)'}
              />
            </motion.button>
          );
        })}
      </div>
      
      <span className={styles.ratingText}>
        {value > 0 ? `${value} out of ${maxRating} stars` : 'Tap to rate'}
      </span>
    </div>
  );
};

export default RatingField;