// src/pages/TripDetailPage/Itinerary/ItineraryList.jsx
// Enhanced itinerary list with edit/delete functionality and form integration

import React, { useState, useEffect} from 'react';
import { motion } from 'framer-motion';
import { Calendar, Plus, Edit, Trash2 } from 'lucide-react';
import ItineraryDayCard from './ItineraryDayCard/ItineraryDayCard';
import ItineraryForm from '../forms/ItineraryForm/ItineraryForm';
import ConfirmModal from '../ConfirmModal';
import { fadeInUp, staggerContainer,fadeInUpCustom } from '../variants';
import styles from './ItineraryList.module.css';

const ItineraryList = ({ trip,
      createItinerary,getTripItineraries,
      deleteItinerary
  }) => {
  const [itinerary, setItinerary] = useState([]);
  const [showItineraryForm, setShowItineraryForm] = useState(false);
  const [editingItinerary, setEditingItinerary] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingItinerary, setDeletingItinerary] = useState(null);
  
useEffect(() => {
  const fetchAll = async () => {
    if (!trip?.id) {
     return <div>Loading trip details...</div>;
   };
    const itineraries = await getTripItineraries(trip.id);
    setItinerary(itineraries);
     };
    fetchAll();
 }, [trip?.id,getTripItineraries]);

  const handleAddDay = () => {
    setEditingItinerary(null);
    setShowItineraryForm(true);
  };

  const handleEditItinerary = async (dayData) => {
    console.log("edit data: ",dayData)
    setEditingItinerary(dayData);
    setShowItineraryForm(true);
  };

  const handleDeleteItinerary = async (dayData) => {
    setDeletingItinerary(dayData);
    setShowDeleteConfirm(true);
  };

  const handleSaveItinerary = async (formData) => {
    // TODO: API call to save itinerary
    formData["trip_id"] = trip.id;
    formData["items"] = [];
    const response = await createItinerary(formData)
    if (editingItinerary) {
      // Update existing
      setItinerary(prev =>
        prev.map(day =>
          day.day === editingItinerary.day
            ? { ...day, ...formData }
            : day
        )
      );
    } else {
      // Add new
      const newDay = {
        ...formData,
        day: parseInt(formData.day.replace('Day ', '')) || itinerary.length + 1,
        items: []
      };
      setItinerary(prev => [...prev, newDay]);
    }
    setShowItineraryForm(false);
    setEditingItinerary(null);
  };

  const handleConfirmDelete = async () => {
    const response = await deleteItinerary(deletingItinerary.id)
    setItinerary(prev =>
      prev.filter(day => day.day !== deletingItinerary.day)
    );
    setShowDeleteConfirm(false);
    setDeletingItinerary(null);
  };

  if (itinerary.length === 0) {
    return (
      <>
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

        <ItineraryForm
          isOpen={showItineraryForm}
          onClose={() => setShowItineraryForm(false)}
          onSave={handleSaveItinerary}
          tripId={trip.id}
          mode="create"
        />
      </>
    );
  }

  return (
    <>
     <motion.div 
     variants={fadeInUpCustom(0.3)}
      initial="initial"
      animate="animate" >  
          
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
            <div key={day.day || index} className={styles.dayContainer}>
              <div className={styles.dayHeader}>
                <div className={styles.dayInfo}>
                  <span className={styles.dayNumber}>Day {day.day}</span>
                  <span className={styles.dayTitle}>{day.title}</span>
                </div>
                <div className={styles.dayActions}>
                  <motion.button
                    onClick={() => handleEditItinerary(day)}
                    className={styles.iconButton}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Edit day"
                    type="button"
                  >
                    <Edit size={16} />
                  </motion.button>
                  <motion.button
                    onClick={() => handleDeleteItinerary(day)}
                    className={`${styles.iconButton} ${styles.deleteButton}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Delete day"
                    type="button"
                  >
                    <Trash2 size={16} />
                  </motion.button>
                </div>
              </div>
              
              <ItineraryDayCard
                day={day}
                tripId={trip.id}
                isLast={index === itinerary.length - 1}
                onUpdateDay={(updatedDay) => {
                  setItinerary(prev =>
                    prev.map(d => d.day === day.day ? updatedDay : d)
                  );
                }}
              />
            </div>
          ))}
        </div>
      </motion.div>

      <ItineraryForm
        isOpen={showItineraryForm}
        onClose={() => {
          setShowItineraryForm(false);
          setEditingItinerary(null);
        }}
        onSave={handleSaveItinerary}
        initialData={editingItinerary}
        tripId={trip.id}
        mode={editingItinerary ? 'edit' : 'create'}
      />

      <ConfirmModal
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setDeletingItinerary(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Day"
        message={`Are you sure you want to delete "${deletingItinerary?.title}"? This will remove all activities for this day.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
      />
    </>
  );
};

export default ItineraryList;