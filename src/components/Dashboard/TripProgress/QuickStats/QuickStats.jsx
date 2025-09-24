// src/components/TripProgress/QuickStats.jsx
// Quick status chips showing travelers, flight status, hotel status
// TODO: Connect to real booking status from backend APIs

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Plane, Hotel, CheckCircle, Clock, XCircle } from 'lucide-react';
import { fadeInUp } from '../variants';
import styles from './QuickStats.module.css';

const QuickStats = ({ trip = {} }) => {
  const {
    travelers = 1,
    flight_status = 'coming soon',
    hotel_status = 'coming soon'
  
  } = trip;
  

  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
        return {
          icon: CheckCircle,
          color: '#10b981', // green
          bgColor: 'rgba(16, 185, 129, 0.1)',
          label: 'Confirmed'
        };
      case 'pending':
        return {
          icon: Clock,
          color: '#f59e0b', // amber
          bgColor: 'rgba(245, 158, 11, 0.1)',
          label: 'Pending'
        };
      case 'comming soon':
      case 'comming soon':
        return {
          icon: XCircle,
          color: '#ef4444', // red
          bgColor: 'rgba(239, 68, 68, 0.1)',
          label: 'Issue'
        };
      default:
        return {
          icon: Clock,
          color: 'var(--muted)',
          bgColor: 'rgba(100, 116, 139, 0.1)',
          label: 'N/A'
        };
    }
  };

  const formatTravelers = (count) => {
    if (!count || count <= 1) return 'You';
    if (count === 2) return 'You + 1';
    return `You + ${count - 1}`;
  };

  const stats = [
    {
      id: 'travelers',
      icon: Users,
      label: 'Travelers',
      value: formatTravelers(travelers),
      color: 'var(--primary)',
      bgColor: 'rgba(37, 99, 235, 0.1)'
    },
    {
      id: 'flight',
      icon: Plane,
      label: 'Flight',
      value: getStatusConfig(flight_status).label,
      color: getStatusConfig(flight_status).color,
      bgColor: getStatusConfig(flight_status).bgColor
    },
    {
      id: 'hotel',
      icon: Hotel,
      label: 'Hotel',
      value: getStatusConfig(hotel_status).label,
      color: getStatusConfig(hotel_status).color,
      bgColor: getStatusConfig(hotel_status).bgColor
    }
  ];

  return (
    <motion.div 
      className={styles.container}
      variants={fadeInUp}
    >
      <h4 className={styles.title}>Quick Stats:</h4>
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.id}
              className={styles.statChip}
              style={{ 
                backgroundColor: stat.bgColor,
                borderColor: stat.color + '40'
              }}
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -2 }}
              role="status"
              aria-label={`${stat.label}: ${stat.value}`}
            >
              <Icon 
                size={16} 
                className={styles.statIcon}
                style={{ color: stat.color }}
                aria-hidden="true"
              />
              <div className={styles.statContent}>
                <div className={styles.statLabel}>{stat.label}</div>
                <div 
                  className={styles.statValue}
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default QuickStats;