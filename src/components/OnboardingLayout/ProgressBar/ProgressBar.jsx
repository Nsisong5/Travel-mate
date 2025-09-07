// src/components/ProgressBar.jsx
import React from "react";
import { motion } from "framer-motion";
import styles from "./ProgressBar.module.css";

export default function ProgressBar({ currentStep, totalSteps }) {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className={styles.progressBar} aria-label={`Step ${currentStep} of ${totalSteps}`}>
      <motion.div
        className={styles.progressFill}
        initial={{ width: 0 }}
        animate={{ width: `${progressPercentage}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <div className={styles.stepText}>
        Step {currentStep} of {totalSteps}
      </div>
    </div>
  );
}
