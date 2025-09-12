import React, { useState } from "react";
import { ArrowRight, Trash2, Eye, Calendar } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ConfirmationPopup from "../../../utils/ConfirmationPopup";
import styles from "./TripCard.module.css";

// Helper function to format currency with color coding
const getCostColor = (cost) => {
  if (cost < 1000) return 'budget-friendly';
  if (cost < 3000) return 'mid-range';
  return 'luxury';
};

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: { duration: 0.3 }
  }
};

export default function TripCard({ trip, onClick, deleteTrip, trips, setTrips }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState(null);

  // Preserve existing delete functionality
  const handleDelete = async () => {
    try {
      await deleteTrip(trip.id);
      setTrips(prevTrips => prevTrips.filter(currentTrip => 
        currentTrip.id !== trip.id
      ));
      setShowConfirm(false);
    } catch (err) {
      setError("Failed to delete trip. Please try again.");
      console.error(err);
    }
  };

  const handleCardClick = (e) => {
    // Prevent card click when clicking on action buttons
    if (e.target.closest(`.${styles.actionButton}`)) {
      return;
    }
    onClick();
  };

  const costColor = getCostColor(trip.cost);

  return (
    <>
      <motion.div 
        className={styles.card}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        whileHover={{ 
          y: -4,
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
          transition: { duration: 0.2 }
        }}
        onClick={handleCardClick}
        tabIndex={0}
        role="button"
        aria-label={`Trip from ${trip.origin} to ${trip.destination}, status: ${trip.status}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
      >
        {/* Header Row: Route and Status */}
        <div className={styles.headerRow}>
          <div className={styles.route}>
            <span className={styles.origin}>{trip.origin}</span>
            <ArrowRight size={18} className={styles.arrow} />
            <span className={styles.destination}>{trip.destination}</span>
          </div>
          
          <div className={`${styles.statusBadge} ${styles[trip.status?.toLowerCase() || 'planned']}`}>
            {trip.status || 'Planned'}
          </div>
        </div>

        {/* Middle Section: Cost Information */}
        <div className={styles.middleSection}>
          <div className={styles.costContainer}>
            <span className={styles.costLabel}>Estimated Cost:</span>
            <span className={`${styles.costAmount} ${styles[costColor]}`}>
              ${trip.cost?.toLocaleString() || '0'}
            </span>
            {trip.cost_estimated && (
              <span className={styles.aiEstimateLabel}>AI Estimated</span>
            )}
          </div>
        </div>

        {/* Footer Row: Date and Actions */}
        <div className={styles.footerRow}>
          <div className={styles.dateContainer}>
            <Calendar size={14} className={styles.calendarIcon} />
            <span className={styles.createdDate}>
              Created: {formatDate(trip.date || trip.created_at || new Date())}
            </span>
          </div>
          
          <div className={styles.actionsContainer}>
            <button
              className={`${styles.actionButton} ${styles.viewButton}`}
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              aria-label="View trip details"
              title="View Details"
              type="button"
            >
              <Eye size={16} />
            </button>
            
            <button
              className={`${styles.actionButton} ${styles.deleteButton}`}
              onClick={(e) => {
                e.stopPropagation();
                setShowConfirm(true);
              }}
              aria-label="Delete trip"
              title="Delete Trip"
              type="button"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Preserve existing confirmation popup functionality */}
      <AnimatePresence>
        {showConfirm && (
          <ConfirmationPopup
            isOpen={showConfirm}
            message="Are you sure you want to delete this trip?"
            confirmText="Delete"
            cancelText="Cancel"
            onConfirm={handleDelete}
            onCancel={() => {
              setShowConfirm(false);
              setError(null);
            }}
            error={error}
          />
        )}
      </AnimatePresence>
    </>
  );
}