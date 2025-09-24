// src/pages/TripDetailPage/Progress/TripProgressPanel.jsx
// Trip progress panel showing countdown, progress bar, and budget info

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, DollarSign, TrendingUp } from 'lucide-react';
import { fadeInUp } from '../variants';
import styles from './TripProgressPanel.module.css';

const TripProgressPanel = ({ trip,budget }) => {
   const calculateDaysLeft = () => {
    if (!trip.start_date) return null;
    
    try {
      const startDate = new Date(trip.start_date);
      const now = new Date();
      const diffTime = startDate - now;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays < 0) return null; // Trip has started
      return diffDays;
    } catch {
      return null;
    }
  };

  const formatBudget = (amount) => {
    if (!amount) return 'TBD';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const daysLeft = calculateDaysLeft();
  const progressPercent = trip.progress_percent || 0;

  const getProgressColor = () => {
    if (progressPercent >= 80) return '#10b981'; // green
    if (progressPercent >= 50) return '#f59e0b'; // amber
    return '#ef4444'; // red
  };

  return (
    <motion.div 
      className={styles.container}
      variants={fadeInUp}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>Trip Progress</h3>
      </div>

      <div className={styles.progressSection}>
        <div className={styles.progressHeader}>
          <div className={styles.progressInfo}>
            <span className={styles.progressPercent}>{progressPercent}%</span>
            <span className={styles.progressLabel}>Complete</span>
          </div>
          {daysLeft !== null && (
            <div className={styles.countdown}>
              <Clock size={16} />
              <span>{daysLeft} days left</span>
            </div>
          )}
        </div>
        
        <div className={styles.progressBar}>
          <motion.div 
            className={styles.progressFill}
            style={{ backgroundColor: getProgressColor() }}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <div className={styles.statIcon}>
            <Calendar size={20} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Duration</span>
            <span className={styles.statValue}>
              {trip.start_date && trip.end_date ? 
                `${Math.ceil((new Date(trip.end_date) - new Date(trip.start_date)) / (1000 * 60 * 60 * 24)) + 1} days` :
                'TBD'
              }
            </span>
          </div>
        </div>

        <div className={styles.stat}>
          <div className={styles.statIcon}>
            <DollarSign size={20} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Budget</span>
            <span className={styles.statValue}>
              {formatBudget(budget.amount) || 0}
              {trip.cost_estimated && (
                <span className={styles.estimated}>est.</span>
              )}
            </span>
          </div>
        </div>

        <div className={styles.stat}>
          <div className={styles.statIcon}>
            <TrendingUp size={20} />
          </div>
          <div className={styles.statContent}>
            <span className={styles.statLabel}>Status</span>
            <span className={styles.statValue}>
              {trip.status === 'active' ? 'In Progress' : 
               trip.status === 'completed' ? 'Completed' : 'Planning'}
            </span>
          </div>
        </div>
      </div>

      <button className={styles.viewItineraryButton} type="button">
        <Calendar size={18} />
        View Full Itinerary
      </button>
    </motion.div>
  );
};

export default TripProgressPanel;