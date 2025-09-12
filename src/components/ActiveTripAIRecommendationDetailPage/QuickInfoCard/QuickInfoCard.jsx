// src/pages/AIRecommendationDetailPage/QuickInfoCard/QuickInfoCard.jsx
// Quick information card showing time, cost, and location

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, DollarSign, MapPin } from 'lucide-react';
import { fadeInUp } from '../../ActiveTrip/variants';
import styles from './QuickInfoCard.module.css';

const QuickInfoCard = ({ 
  bestTime = "Coming Soon", 
  estimatedCost = "TBD", 
  location = {} 
}) => {
  const quickInfoItems = [
    {
      icon: Clock,
      label: "Best Time to Visit",
      value: bestTime,
      color: "var(--primary)"
    },
    {
      icon: DollarSign,
      label: "Estimated Cost",
      value: estimatedCost,
      color: "#10b981"
    },
    {
      icon: MapPin,
      label: "Location",
      value: location.name || "Location coming soon",
      color: "#f59e0b"
    }
  ];

  return (
    <motion.div 
      className={styles.container}
      variants={fadeInUp}
    >
      <h3 className={styles.title}>Quick Info</h3>
      
      <div className={styles.infoGrid}>
        {quickInfoItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              className={styles.infoItem}
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
            >
              <div 
                className={styles.iconContainer}
                style={{ backgroundColor: item.color }}
              >
                <Icon size={20} />
              </div>
              <div className={styles.infoContent}>
                <span className={styles.label}>{item.label}</span>
                <span className={styles.value}>{item.value}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default QuickInfoCard;