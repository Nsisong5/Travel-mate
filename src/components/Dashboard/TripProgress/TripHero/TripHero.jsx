// src/components/TripProgress/TripHero.jsx
// Trip destination header with thumbnail, title, and dates
// TODO: Replace placeholder images with actual trip images from backend

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ExternalLink } from 'lucide-react';
import { fadeInUp } from '../variants';
import styles from './TripHero.module.css';

const TripHero = ({ trip = {}, tripDetailRoute, images}) => {
  const {
    id,
    destination = 'Destination coming soon',
    start_date,
    end_date,
    title = 'Trip Planning'
  } = trip;
  if (!images){
     images = []
  }
 
  const formatDateRange = (start, end) => {
    if (!start || !end) return 'Dates coming soon';
    
    try {
      const startDate = new Date(start);
      const endDate = new Date(end);
      
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        return 'Dates coming soon';
      }

      const formatOptions = { 
        month: 'short', 
        day: 'numeric',
        year: startDate.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
      };

      const startFormatted = startDate.toLocaleDateString('en-US', formatOptions);
      const endFormatted = endDate.toLocaleDateString('en-US', formatOptions);

      return `${startFormatted} — ${endFormatted}`;
    } catch (error) {
      return 'Dates coming soon';
    }
  };

  function getRandomArrayIndex(arrayLength) {
    if (arrayLength <= 0) {
        return 0;
    }
    return Math.floor(Math.random() * arrayLength);
    }


  const dateRange = formatDateRange(start_date, end_date);

  // Get primary image or show placeholder
  
  const primaryImage = images?.[getRandomArrayIndex(images.length)];
  const detailHref = tripDetailRoute ? 
    tripDetailRoute.replace(':id', id || 'new') : 
    `/trips/${id || 'new'}`;

  return (
    <motion.div 
      className={styles.container}
      variants={fadeInUp}
    >
      <div className={styles.thumbnail}>
        {primaryImage ? (
          <img 
            src={primaryImage} 
            alt={`${destination} thumbnail`}
            className={styles.image}
            loading="lazy"
          />
        ) : (
          <div className={styles.placeholder} aria-label="Trip destination placeholder">
            <div className={styles.placeholderIcon}>
              <MapPin size={32} />
            </div>
            <span className={styles.placeholderText}>Coming soon</span>
          </div>
        )}
        
        {images.length > 1 && (
          <div className={styles.imageCount} aria-label={`${images.length} photos available`}>
            +{images.length - 1}
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.destination}>
            <MapPin size={18} className={styles.icon} aria-hidden="true" />
            Trip to: {destination}
          </h3>
          
          <a 
            href={detailHref}
            className={styles.detailsLink}
            aria-label="View trip details"
          >
            <ExternalLink size={16} />
          </a>
        </div>

        <div className={styles.dates}>
          <Calendar size={16} className={styles.icon} aria-hidden="true" />
          <span>Dates: {dateRange}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default TripHero;