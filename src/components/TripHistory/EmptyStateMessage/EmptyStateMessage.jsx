import React from "react";
import styles from "./EmptyStateMessage.module.css";

export default function EmptyStateMessage({ onCreateNewTrip }) {
  return (
    <div className={styles.emptyState} role="region" aria-live="polite">
      <p className={styles.message}>No trips found for your current filter.</p>
      <button
        type="button"
        onClick={onCreateNewTrip}
        className={styles.ctaButton}
        aria-label="Create new trip"
      >
        Create New Trip
      </button>
    </div>
  );
}
