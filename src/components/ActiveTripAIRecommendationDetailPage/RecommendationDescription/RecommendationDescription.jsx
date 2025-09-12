// src/pages/AIRecommendationDetailPage/RecommendationDescription/RecommendationDescription.jsx
// AI-generated recommendation description with engaging text

import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import { fadeInUp } from '../../ActiveTrip/variants';
import styles from './RecommendationDescription.module.css';

const RecommendationDescription = ({ 
  description = "Coming soon - AI will provide personalized insights about this recommendation." 
}) => {
  return (
    <motion.div 
      className={styles.container}
      variants={fadeInUp}
    >
      <div className={styles.header}>
        <div className={styles.iconContainer}>
          <Lightbulb size={20} />
        </div>
        <h3 className={styles.title}>Why We Recommend This</h3>
      </div>
      
      <div className={styles.content}>
        <p className={styles.description}>
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default RecommendationDescription;