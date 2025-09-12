import React from 'react';
import { motion } from 'framer-motion';
import { Tag, DollarSign, Calendar, TrendingUp, Star } from 'lucide-react';
import styles from '../DestinationDetailPage.module.css';

const QuickInfo = ({ 
  category, 
  budget, 
  bestTime, 
  popularity, 
  rating, 
  reviewCount 
}) => {
  const infoCards = [
    {
      icon: Tag,
      label: 'Category',
      value: category,
      color: 'var(--primary)'
    },
    {
      icon: DollarSign,
      label: 'Budget Level',
      value: budget,
      color: '#10b981'
    },
    {
      icon: Calendar,
      label: 'Best Time',
      value: bestTime,
      color: '#f59e0b'
    },
    {
      icon: TrendingUp,
      label: 'Popularity',
      value: popularity,
      color: '#8b5cf6'
    }
  ];

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
      x: -20,
      scale: 0.95
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

  return (
    <div className={styles.quickInfoSection}>
      {/* Rating Section */}
      <motion.div
        className={styles.ratingSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.ratingContent}>
          <Star className={styles.starIcon} size={24} />
          <span className={styles.ratingValue}>{rating}</span>
          <span className={styles.ratingText}>
            ({reviewCount.toLocaleString()} reviews)
          </span>
        </div>
      </motion.div>

      {/* Info Cards */}
      <motion.div
        className={styles.infoCardsContainer}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className={styles.infoCards}>
          {infoCards.map((card, index) => {
            const IconComponent = card.icon;
            
            return (
              <motion.div
                key={card.label}
                className={styles.infoCard}
                variants={cardVariants}
                whileHover={{ 
                  y: -4,
                  transition: { duration: 0.2 }
                }}
              >
                <div 
                  className={styles.infoCardIcon}
                  style={{ backgroundColor: card.color }}
                >
                  <IconComponent size={18} />
                </div>
                <div className={styles.infoCardContent}>
                  <span className={styles.infoCardLabel}>{card.label}</span>
                  <span className={styles.infoCardValue}>{card.value}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default QuickInfo;