import React from "react";
import { motion } from "framer-motion";
import { useOutletContext, useNavigate } from "react-router-dom";
import styles from "./SummaryStep.module.css";
import { fadeInUp, staggerContainer } from "../motion";
import { useTripServices } from "../../../services/TripServices/TripServices"


export default function SummaryStep() {
  const { state, allowSkip } = useOutletContext();
  const navigate = useNavigate();
  const { createTrip } = useTripServices()
  
  const handleConfirm = async() => {
    if (allowSkip) {
      navigate("/auth/signup");
    } else {
        try {
      console.log("state:",state)
      const result = await createTrip(state);
      console.log("Trip created successfully:", result);
      navigate("/dashboard");
      } catch (error) {
      console.error("Trip creation failed:", error);
    }
      console.log("Trip Confirmed:", state);
    }
  };

  return (
    <motion.div
      className={styles.summaryPage}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      exit="exit"
      aria-label="Trip summary"
    >
      <motion.h1 variants={fadeInUp} className={styles.title}>
        Trip Summary
      </motion.h1>
      <motion.div variants={fadeInUp} className={styles.summaryCard}>
        <div className={styles.item}>
          <span className={styles.label}>Destination:</span>
          <span className={styles.value}>{state.destination}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Dates:</span>
          <span className={styles.value}>
            {state.startDate} – {state.endDate}
          </span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Style:</span>
          <span className={styles.value}>{state.style}</span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Budget:</span>
          <span className={styles.value}>{state.budget}</span>
        </div>
      </motion.div>
      <motion.div variants={fadeInUp} className={styles.confirmNav}>
        <button
          className={styles.confirmBtn}
          type="button"
          onClick={handleConfirm}
        >
          Confirm & Continue
        </button>
      </motion.div>
    </motion.div>
  );
}
