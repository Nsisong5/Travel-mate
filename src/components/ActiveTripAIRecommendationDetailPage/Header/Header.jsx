// src/pages/AIRecommendationDetailPage/Header/Header.jsx
// Navigation header with back button and page title

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { fadeInUp } from '../../ActiveTrip/variants';
import styles from './Header.module.css';

const Header = ({ onBack }) => {
  return (
    <motion.header 
      className={styles.container}
      variants={fadeInUp}
    >
      <div className={styles.content}>
        <button
          onClick={onBack}
          className={styles.backButton}
          aria-label="Go back"
          type="button"
        >
          <ArrowLeft size={20} />
        </button>
        
        <h1 className={styles.title}>AI Recommendation Detail</h1>
      </div>
    </motion.header>
  );
};

export default Header;