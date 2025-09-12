import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star } from 'lucide-react';
import styles from '../TopDestinationsPage.module.css';

const DestinationCard = ({ 
  destination, 
  onPlanTrip, 
  onViewMore,
  index = 0 
}) => {
  const { 
    id, 
    name, 
    country, 
    countryCode, 
    category, 
    budget, 
    imageUrl, 
    description 
  } = destination;

  // Animation variants for the card
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  // Get budget badge styling
  const getBudgetBadgeClass = (budgetLevel) => {
    const budgetClasses = {
      'Low': styles.budgetLow,
      'Medium': styles.budgetMedium, 
      'High': styles.budgetHigh,
      'Luxury': styles.budgetLuxury
    };
    return budgetClasses[budgetLevel] || styles.budgetMedium;
  };

  // Get category badge styling
  const getCategoryBadgeClass = (categoryType) => {
    const categoryClasses = {
      'Historical': styles.categoryHistorical,
      'Adventure': styles.categoryAdventure,
      'Nature': styles.categoryNature,
      'Luxury': styles.categoryLuxury
    };
    return categoryClasses[categoryType] || styles.categoryDefault;
  };

  // Get country flag emoji (basic implementation)
  const getCountryFlag = (countryCode) => {
    if (!countryCode || countryCode.length !== 2) return '🌍';
    
    const flagEmojis = {
      'FR': '🇫🇷',
      'JP': '🇯🇵', 
      'ID': '🇮🇩',
      'US': '🇺🇸',
      'GR': '🇬🇷',
      'PE': '🇵🇪',
      'IT': '🇮🇹',
      'ES': '🇪🇸',
      'TH': '🇹🇭',
      'GB': '🇬🇧'
    };
    
    return flagEmojis[countryCode.toUpperCase()] || '🌍';
  };

  return (
    <motion.article
      className={styles.destinationCard}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      layout
    >
      {/* Card Image */}
      <div className={styles.cardImageWrapper}>
        <motion.div
          className={styles.cardImage}
          variants={imageVariants}
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
        
        {/* Image Overlay with Badges */}
        <div className={styles.cardImageOverlay}>
          <div className={styles.badges}>
            <span className={`${styles.categoryBadge} ${getCategoryBadgeClass(category)}`}>
              {category}
            </span>
            <span className={`${styles.budgetBadge} ${getBudgetBadgeClass(budget)}`}>
              {budget}
            </span>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3 className={styles.destinationName}>{name}</h3>
          <div className={styles.locationInfo}>
            <span className={styles.countryFlag}>{getCountryFlag(countryCode)}</span>
            <span className={styles.countryName}>{country}</span>
          </div>
        </div>

        <p className={styles.destinationDescription}>{description}</p>

        {/* Rating (optional - can be added later) */}
        <div className={styles.rating}>
          <Star size={14} className={styles.starIcon} />
          <span className={styles.ratingValue}>4.8</span>
          <span className={styles.ratingCount}>(234 reviews)</span>
        </div>

        {/* Action Buttons */}
        <div className={styles.cardActions}>
          <motion.button
            className={styles.primaryButton}
            onClick={() => onPlanTrip(destination)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Plan a Trip
          </motion.button>
          
          <motion.button
            className={styles.secondaryButton}
            onClick={() => onViewMore(destination)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View More
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
};

export default DestinationCard;