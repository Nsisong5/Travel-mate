// src/pages/TripDetailPage/Itinerary/ItineraryList.jsx
// Itinerary list with expandable day cards showing schedule items

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Plus } from 'lucide-react';
import ItineraryDayCard from './ItineraryDayCard/ItineraryDayCard';
import { fadeInUp, staggerContainer } from '../variants';
import styles from './ItineraryList.module.css';

const ItineraryList = ({ trip }) => {
  const itinerary = trip.itinerary || [];

  const handleAddDay = () => {
    // TODO: Implement add new day functionality
    // POST /trips/${trip.id}/itinerary
    console.log('Add new day');
  };

  if (itinerary.length === 0) {
    return (
      <motion.div 
        className={styles.emptyState}
        variants={fadeInUp}
      >
        <div className={styles.emptyIcon}>
          <Calendar size={48} />
        </div>
        <h3 className={styles.emptyTitle}>No itinerary yet</h3>
        <p className={styles.emptyDescription}>
          Start planning your trip by adding activities and events.
        </p>
        <button 
          onClick={handleAddDay}
          className={styles.addButton}
          type="button"
        >
          <Plus size={18} />
          Add First Day
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={styles.container}
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <div className={styles.header}>
        <h3 className={styles.title}>
          <Calendar size={20} />
          Itinerary
        </h3>
        <button
          onClick={handleAddDay}
          className={styles.addDayButton}
          aria-label="Add new day"
          type="button"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className={styles.daysList}>
        {itinerary.map((day, index) => (
          <ItineraryDayCard
            key={day.day || index}
            day={day}
            tripId={trip.id}
            isLast={index === itinerary.length - 1}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ItineraryList;