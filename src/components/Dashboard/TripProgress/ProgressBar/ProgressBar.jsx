// src/components/TripProgress/ProgressBar.jsx
// Animated progress bar with countdown text - supports pre-trip and during-trip modes
// TODO: Connect to real trip planning metrics from backend

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar } from 'lucide-react';
import { progressFill, fadeInUp } from '../variants';
import styles from './ProgressBar.module.css';

const ProgressBar = ({ trip = {} }) => {
  const {
    start_date,
    end_date,
    progress_planned
  } = trip;

  const progressData = useMemo(() => {
    const now = new Date();
    
    if (!start_date || !end_date) {
      return {
        percentage: progress_planned || 0,
        label: 'Planning in progress',
        sublabel: 'Dates coming soon',
        mode: 'planning'
      };
    }

    try {
      const startDate = new Date(start_date);
      const endDate = new Date(end_date);

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return {
          percentage: progress_planned || 0,
          label: 'Planning in progress',
          sublabel: 'Invalid dates',
          mode: 'planning'
        };
      }

      const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
      
      // Pre-trip: show countdown to departure
      if (now < startDate) {
        const daysUntilTrip = Math.ceil((startDate - now) / (1000 * 60 * 60 * 24));
        const percentage = progress_planned || Math.max(0, Math.min(100, (30 - daysUntilTrip) / 30 * 100));
        
        const dayWord = daysUntilTrip === 1 ? 'day' : 'days';
        const sublabel = daysUntilTrip > 0 
          ? `${daysUntilTrip} ${dayWord} left before trip`
          : 'Trip starts today!';

        return {
          percentage: Math.round(percentage),
          label: 'Trip Planning',
          sublabel,
          mode: 'pre-trip'
        };
      }
      
      // During trip: show progress through trip
      else if (now >= startDate && now <= endDate) {
        const daysSinceStart = Math.ceil((now - startDate) / (1000 * 60 * 60 * 24));
        const currentDay = Math.min(daysSinceStart + 1, totalDays);
        const percentage = (currentDay / totalDays) * 100;

        return {
          percentage: Math.round(percentage),
          label: `In progress — Day ${currentDay} of ${totalDays}`,
          sublabel: 'Enjoy your trip!',
          mode: 'active'
        };
      }
      
      // Post-trip: completed
      else {
        return {
          percentage: 100,
          label: 'Trip completed',
          sublabel: `${totalDays} days well spent`,
          mode: 'completed'
        };
      }
    } catch (error) {
      console.warn('Error calculating trip progress:', error);
      return {
        percentage: progress_planned || 0,
        label: 'Planning in progress',
        sublabel: 'Unable to calculate dates',
        mode: 'planning'
      };
    }
  }, [start_date, end_date, progress_planned]);

  const { percentage, label, sublabel, mode } = progressData;

  const getProgressColor = () => {
    switch (mode) {
      case 'completed': return '#10b981'; // green
      case 'active': return '#f59e0b'; // amber
      default: return 'var(--primary)'; // primary blue
    }
  };

  const getIcon = () => {
    switch (mode) {
      case 'active':
      case 'completed':
        return <Calendar size={18} />;
      default:
        return <Clock size={18} />;
    }
  };

  return (
    <motion.div 
      className={styles.container}
      variants={fadeInUp}
    >
      <div className={styles.header}>
        <div className={styles.iconLabel}>
          <span className={styles.icon} style={{ color: getProgressColor() }}>
            {getIcon()}
          </span>
          <span className={styles.percentage}>{percentage}%</span>
        </div>
      </div>

      <div className={styles.progressTrack} role="progressbar" aria-valuenow={percentage} aria-valuemin="0" aria-valuemax="100" aria-label={`Trip progress: ${percentage}%`}>
        <motion.div 
          className={styles.progressFill}
          style={{ backgroundColor: getProgressColor() }}
          variants={progressFill(percentage)}
          initial="hidden"
          animate="show"
        />
      </div>

      <div className={styles.labels}>
        <div className={styles.mainLabel}>{label}</div>
        <div className={styles.sublabel}>{sublabel}</div>
      </div>
    </motion.div>
  );
};

export default ProgressBar;