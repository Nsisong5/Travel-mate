import React from 'react';
import { motion } from 'framer-motion';
import styles from '../DestinationDetailPage.module.css';

const HeroImage = ({ destination, imageUrl, name, country, countryCode }) => {
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

  return (
    <div className={styles.heroSection}>
      <motion.div
        className={styles.heroImageWrapper}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div 
          className={styles.heroImage}
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        
        <div className={styles.heroOverlay} />
        
        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h1 className={styles.destinationName}>{name}</h1>
          <div className={styles.locationInfo}>
            <span className={styles.countryFlag}>{getCountryFlag(countryCode)}</span>
            <span className={styles.countryName}>{country}</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
export default HeroImage;