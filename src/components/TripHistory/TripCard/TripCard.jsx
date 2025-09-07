import React, { useState } from "react";
import { Car, Bus, Plane, ChevronRight, Trash2, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ConfirmationPopup from "../../../utils/ConfirmationPopup";
import styles from "./TripCard.module.css";

const typeIcon = {
  car: <Car size={26} />,
  bus: <Bus size={26} />,
  plane: <Plane size={26} />
};

export default function TripCard({ trip, onClick, deleteTrip,trips, setTrips}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      await deleteTrip(trip.id);
      setTrips(prevTrips => prevTrips.filter(currentTrip=>
      currentTrip.id != trip.id))
      setShowConfirm(false);
    } catch (err) {
      setError("Failed to delete trip. Please try again.");
      console.error(err);
    }
  };

  return (
    <>
      <div className={styles.card} tabIndex={0} role="region" aria-label={`Trip from ${trip.origin} to ${trip.destination} status ${trip.status}`}>
        <div className={styles.iconBox}>{typeIcon[trip.type] || <Plane size={26} />}</div>
        <div className={styles.info}>
          <div className={styles.route}>
            <span className={styles.origin}>{trip.origin}</span>
            <span className={styles.arrow}>→</span>
            <span className={styles.destination}>{trip.destination}</span>
          </div>
          <div className={styles.meta}>
            <span className={styles.date}>{trip.date}</span>
            <span className={`${styles.status} ${styles[trip.status.toLowerCase()]}`}>
              {trip.status}
            </span>
          </div>
        </div>
        <div className={styles.side}>
          <span className={styles.cost}>
            ${trip.cost} {trip.cost_estimated ? <small className={styles.estimateLabel}>AI estimate</small> : null}
          </span>
          <div className={styles.buttons}>
            <button
              aria-label="View trip details"
              className={styles.iconButton}
              type="button"
              onClick={onClick}
            >
              <Eye size={20} />
            </button>
            <button
              aria-label="Delete trip"
              className={styles.iconButton}
              type="button"
              onClick={() => setShowConfirm(true)}
            >
              <Trash2 size={20} />
            </button>
            <ChevronRight size={22} className={styles.chevron} aria-hidden="true" />
          </div>
        </div>
      </div>

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
