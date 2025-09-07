import React from "react";
import styles from "./ProgressBar.module.css";

export default function ProgressBar({ totalSteps, currentStep }) {
  return (
    <div className={styles.progressBar} role="progressbar" aria-valuemin={1} aria-valuemax={totalSteps} aria-valuenow={currentStep} aria-label={`Step ${currentStep} of ${totalSteps}`}>
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          className={`${styles.segment} ${i < currentStep ? styles.filled : ""}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
