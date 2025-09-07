// src/pages/TripDetailPage/Hero/Hero.jsx
// Hero section with cover image, trip title, status badge, and quick actions

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Heart, Share2 } from 'lucide-react';
import { fadeInUp } from '../variants';
import styles from './Hero.module.css';

const Hero = ({ trip }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return '#10b981'; // green
      case 'completed':
        return '#6b7280'; // gray
      case 'planned':
      default:
        return '#f59e0b'; // amber
    }
  };

  const getStatusLabel = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'planned':
      default:
        return 'Planned';
    }
  };

  const formatDateRange = (startDate, endDate) => {
    if (!startDate || !endDate) return 'Dates TBD';
    
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      if (isNaN(start.getTime()) || isNaN(end.getTime())) return 'Dates TBD';

      const formatOptions = { 
        month: 'long', 
        day: 'numeric',
        year: start.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
      };

      return `${start.toLocaleDateString('en-US', formatOptions)} — ${end.toLocaleDateString('en-US', formatOptions)}`;
    } catch {
      return 'Dates TBD';
    }
  };

  const handleSave = () => {
    // TODO: Implement save/favorite functionality
    // POST /trips/${trip.id}/favorite
  };

  const handleShare = () => {
    // TODO: Implement share functionality - same as header
    if (navigator.share) {
      navigator.share({
        title: trip.title,
        text: `Check out my trip to ${trip.destination}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <motion.section 
      className={styles.container}
      variants={fadeInUp}
    >
      <div className={styles.imageContainer}>
        {trip.cover_image ? (
          <img 
            src={trip.cover_image}
            alt={`${trip.destination} trip cover`}
            className={styles.coverImage}
            loading="eager"
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            <MapPin size={48} />
            <span>No cover image</span>
          </div>
        )}
        
        <div className={styles.overlay}>
          <div className={styles.overlayContent}>
            <div className={styles.badges}>
              <div 
                className={styles.statusBadge}
                style={{ backgroundColor: getStatusColor(trip.status) }}
              >
                {getStatusLabel(trip.status)}
              </div>
            </div>

            <div className={styles.actions}>
              <button
                onClick={handleSave}
                className={styles.actionButton}
                aria-label="Save trip"
                type="button"
              >
                <Heart size={18} />
              </button>
              <button
                onClick={handleShare}
                className={styles.actionButton}
                aria-label="Share trip"
                type="button"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.info}>
        <div className={styles.location}>
          <MapPin size={20} className={styles.icon} />
          <span>{trip.destination}</span>
        </div>
        <div className={styles.dates}>
          <Calendar size={18} className={styles.icon} />
          <span>{formatDateRange(trip.start_date, trip.end_date)}</span>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;