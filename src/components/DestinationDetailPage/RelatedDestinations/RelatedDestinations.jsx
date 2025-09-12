import React from 'react';
import { motion } from 'framer-motion';
import styles from '../DestinationDetailPage.module.css';

const RelatedDestinations = ({ destinations = [], onDestinationClick }) => {
  // Get country flag emoji
  const getCountryFlag = (countryCode) => {
    if (!countryCode || countryCode.length !== 2) return '🌍';
    
    const flagEmojis = {
      'FR': '🇫🇷', 'JP': '🇯🇵', 'ID': '🇮🇩', 'US': '🇺🇸',
      'GR': '🇬🇷', 'PE': '🇵🇪', 'IT': '🇮🇹', 'ES': '🇪🇸',
      'TH': '🇹🇭', 'GB': '🇬🇧', 'DE': '🇩🇪', 'CH': '🇨🇭'
    };
    
    return flagEmojis[countryCode.toUpperCase()] || '🌍';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      x: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  // Hide section if less than or equal to 2 destinations (as per requirements)
  if (!destinations || destinations.length <= 2) {
    return null;
  }

  return (
    <div className={styles.relatedSection}>
      <motion.h2 
        className={styles.sectionTitle}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        You May Also Like
      </motion.h2>

      <motion.div
        className={styles.relatedContainer}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className={styles.relatedScroll}>
          {destinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              className={styles.relatedCard}
              variants={cardVariants}
              whileHover={{ 
                y: -4,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onDestinationClick(destination)}
            >
              <div 
                className={styles.relatedImage}
                style={{ backgroundImage: `url(${destination.imageUrl})` }}
              />
              <div className={styles.relatedContent}>
                <h3 className={styles.relatedName}>{destination.name}</h3>
                <div className={styles.relatedLocation}>
                  <span className={styles.relatedFlag}>
                    {getCountryFlag(destination.countryCode)}
                  </span>
                  <span className={styles.relatedCountry}>{destination.country}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default RelatedDestinations;