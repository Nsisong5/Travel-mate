// src/pages/TripDetailPage/Itinerary/ItineraryDayCard.jsx
// Enhanced day card with activity edit/delete functionality and form integration

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Clock, MapPin, Edit, Plus, Trash2 } from 'lucide-react';
import ActivityForm from '../../forms/activityForm/ActivityForm';
import ConfirmModal from '../../ConfirmModal';
import { fadeInUp, accordion } from '../../variants';
import styles from './ItineraryDayCard.module.css';

const ItineraryDayCard = ({ day, tripId, isLast, onUpdateDay }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [items, setItems] = useState(day.items || []);
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingActivity, setDeletingActivity] = useState(null);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAddActivity = () => {
    setEditingActivity(null);
    setShowActivityForm(true);
  };

  const handleEditActivity = (activity, index) => {
    setEditingActivity({ ...activity, index });
    setShowActivityForm(true);
  };

  const handleDeleteActivity = (activity, index) => {
    setDeletingActivity({ ...activity, index });
    setShowDeleteConfirm(true);
  };

  const handleSaveActivity = (formData) => {
    // TODO: API call to save activity
    if (editingActivity && editingActivity.index !== undefined) {
      // Update existing activity
      const updatedItems = [...items];
      updatedItems[editingActivity.index] = formData;
      setItems(updatedItems);
    } else {
      // Add new activity
      setItems(prev => [...prev, formData]);
    }
    
    // Update parent component
    onUpdateDay?.({ ...day, items: editingActivity ? 
      items.map((item, idx) => idx === editingActivity.index ? formData : item) :
      [...items, formData]
    });

    setShowActivityForm(false);
    setEditingActivity(null);
  };

  const handleConfirmDelete = () => {
    // TODO: API call to delete activity
    // DELETE /trips/${tripId}/itinerary/${day.day}/activities/${deletingActivity.index}
    
    const updatedItems = items.filter((_, index) => index !== deletingActivity.index);
    setItems(updatedItems);
    onUpdateDay?.({ ...day, items: updatedItems });
    
    setShowDeleteConfirm(false);
    setDeletingActivity(null);
  };

  return (
    <>
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

                      <div className={styles.itemActions}>
                        <motion.button
                          onClick={() => handleEditActivity(item, index)}
                          className={styles.editButton}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={`Edit ${item.title}`}
                          type="button"
                        >
                          <Edit size={14} />
                        </motion.button>
                        
                        <motion.button
                          onClick={() => handleDeleteActivity(item, index)}
                          className={`${styles.editButton} ${styles.deleteButton}`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={`Delete ${item.title}`}
                          type="button"
                        >
                          <Trash2 size={14} />
                        </motion.button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyItems}>
                  <p>No activities planned for this day</p>
                </div>
              )}

              <button
                onClick={handleAddActivity}
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

      <ActivityForm
        isOpen={showActivityForm}
        onClose={() => {
          setShowActivityForm(false);
          setEditingActivity(null);
        }}
        onSave={handleSaveActivity}
        initialData={editingActivity}
        tripId={tripId}
        dayId={day.day}
        mode={editingActivity ? 'edit' : 'create'}
      />

      <ConfirmModal
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setDeletingActivity(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Activity"
        message={`Are you sure you want to delete "${deletingActivity?.title}"?`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
      />
    </>
  );
};

export default ItineraryDayCard;