// src/pages/TripDetailPage/Itinerary/ItineraryDayCard.jsx
// Individual day card with expandable items and edit functionality

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Clock, MapPin, Edit, Plus } from 'lucide-react';
import { fadeInUp, accordion } from '../../variants';
import styles from './ItineraryDayCard.module.css';

const ItineraryDayCard = ({ day, tripId, isLast }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const items = day.items || [];

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleEditItem = (item, index) => {
    // TODO: Implement edit item functionality
    // PATCH /trips/${tripId}/itinerary/${day.day}/items/${index}
    console.log('Edit item:', item);
  };

  const handleAddItem = () => {
    // TODO: Implement add item functionality
    // POST /trips/${tripId}/itinerary/${day.day}/items
    console.log('Add item to day', day.day);
  };

  return (
    <motion.div 
      className={styles.container}
      variants={fadeInUp}
    >
      <button
        className={styles.header}
        onClick={handleToggle}
        aria-expanded={isExpanded}
        aria-controls={`day-${day.day}-content`}
        type="button"
      >
        <div className={styles.dayInfo}>
          <div className={styles.dayNumber}>
            Day {day.day}
          </div>
          <div className={styles.dayTitle}>
            {day.title}
          </div>
        </div>
        
        <div className={styles.headerRight}>
          <div className={styles.itemCount}>
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </div>
          <div className={styles.expandIcon}>
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id={`day-${day.day}-content`}
            className={styles.content}
            variants={accordion}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {items.length > 0 ? (
              <div className={styles.itemsList}>
                {items.map((item, index) => (
                  <div key={index} className={styles.item}>
                    <div className={styles.timeSlot}>
                      <Clock size={14} />
                      <span>{item.time}</span>
                    </div>
                    
                    <div className={styles.itemContent}>
                      <div className={styles.itemTitle}>{item.title}</div>
                      {item.location && (
                        <div className={styles.itemLocation}>
                          <MapPin size={12} />
                          <span>{item.location}</span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleEditItem(item, index)}
                      className={styles.editButton}
                      aria-label={`Edit ${item.title}`}
                      type="button"
                    >
                      <Edit size={14} />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyItems}>
                <p>No activities planned for this day</p>
              </div>
            )}

            <button
              onClick={handleAddItem}
              className={styles.addItemButton}
              type="button"
            >
              <Plus size={16} />
              Add Activity
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ItineraryDayCard;