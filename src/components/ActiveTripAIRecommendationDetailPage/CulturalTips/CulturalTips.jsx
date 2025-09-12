// src/pages/AIRecommendationDetailPage/CulturalTips/CulturalTips.jsx
// Cultural and local tips section with helpful advice

import React from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../../ActiveTrip/variants';
import styles from './CulturalTips.module.css';

const CulturalTips = ({ 
  tips = [], 
  destination = "this destination" 
}) => {
  const fallbackTips = [
    "Local customs and etiquette coming soon",
    "Language tips will be provided",
    "Dress code recommendations available soon"
  ];

  const displayTips = tips.length > 0 ? tips : fallbackTips;

  return (
    <motion.div 
      className={styles.container}
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <motion.div 
        className={styles.header}
        variants={fadeInUp}
      >
        <div className={styles.iconContainer}>
          <Globe size={20} />
        </div>
        <h3 className={styles.title}>Cultural/Local Tips</h3>
      </motion.div>

      <motion.p 
        className={styles.subtitle}
        variants={fadeInUp}
      >
        Essential local insights for {destination}
      </motion.p>
      
      <div className={styles.tipsList}>
        {displayTips.map((tip, index) => (
          <motion.div
            key={index}
            className={styles.tipItem}
            variants={fadeInUp}
            transition={{ delay: index * 0.1 }}
          >
            <div className={styles.tipBullet} />
            <span className={styles.tipText}>{tip}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CulturalTips;