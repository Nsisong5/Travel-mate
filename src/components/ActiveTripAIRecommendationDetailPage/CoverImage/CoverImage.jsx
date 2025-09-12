// src/pages/AIRecommendationDetailPage/CoverImage/CoverImage.jsx
// Full-width cover image with title overlay and AI badge

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { fadeInUp } from '../../ActiveTrip/variants';
import styles from './CoverImage.module.css';

const CoverImage = ({ 
  image, 
  title = "Recommendation", 
  aiInsight = "AI Recommended" 
}) => {
  return (
    <motion.div 
      className={styles.container}
      variants={fadeInUp}
    >
      <div className={styles.imageContainer}>
        {image ? (
          <img 
            src={image}
            alt={title}
            className={styles.image}
            loading="eager"
          />
        ) : (
          <div className={styles.imagePlaceholder} aria-label="Recommendation image placeholder">
            <Sparkles size={48} />
            <span>Coming Soon</span>
          </div>
        )}
        
        <div className={styles.overlay}>
          <div className={styles.overlayContent}>
            <div className={styles.aiBadge}>
              <Sparkles size={16} />
              <span>{aiInsight}</span>
            </div>
            
            <h2 className={styles.title}>
              {title}
            </h2>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CoverImage;