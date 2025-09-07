// src/pages/TripDetailPage/Header/Header.jsx
// Trip detail page header with back navigation and share functionality

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2 } from 'lucide-react';
import { fadeInUp } from '../variants';
import styles from './Header.module.css';

const Header = ({ trip, onShare }) => {
  const navigate = useNavigate();

  const formatDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) return '';
    
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      if (isNaN(start.getTime()) || isNaN(end.getTime())) return '';

      const formatOptions = { 
        month: 'short', 
        day: 'numeric',
        year: start.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
      };

      return `${start.toLocaleDateString('en-US', formatOptions)} — ${end.toLocaleDateString('en-US', formatOptions)}`;
    } catch {
      return '';
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <motion.header 
      className={styles.container}
      variants={fadeInUp}
    >
      <div className={styles.content}>
        <div className={styles.left}>
          <button
            onClick={handleBack}
            className={styles.backButton}
            aria-label="Go back"
            type="button"
          >
            <ArrowLeft size={20} />
          </button>
          
          <div className={styles.tripInfo}>
            <h1 className={styles.title}>{trip.title}</h1>
            <p className={styles.dates}>
              {formatDateRange(trip.start_date, trip.end_date)}
            </p>
          </div>
        </div>

        <button
          onClick={onShare}
          className={styles.shareButton}
          aria-label="Share trip"
          type="button"
        >
          <Share2 size={18} />
        </button>
      </div>
    </motion.header>
  );
};

export default Header;