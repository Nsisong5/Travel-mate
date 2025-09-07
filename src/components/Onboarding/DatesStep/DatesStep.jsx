import React, { useState } from "react";
import { motion } from "framer-motion";
import { useOutletContext, useNavigate } from "react-router-dom";
import styles from "./DatesStep.module.css";
import { fadeInUp, staggerContainer } from "../motion";

export default function DatesStep() {
  const { state, dispatch } = useOutletContext();
  const navigate = useNavigate();

  const [touched, setTouched] = useState(false);

  const startDate = state.startDate;
  const endDate = state.endDate;
  const valid = startDate && endDate && endDate >= startDate;

  const handleDateChange = (field, value) => {
    dispatch({ type: "setField", field, value });
    setTouched(true);
  };

  return (
    <motion.div
      className={styles.datesPage}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      exit="exit"
      aria-label="Choose travel dates"
    >
      <motion.h1 variants={fadeInUp} className={styles.title}>
        When are you traveling?
      </motion.h1>
      <motion.div variants={fadeInUp} className={styles.inputs}>
        <div>
          <label htmlFor="startDate" className={styles.label}>Start Date</label>
          <input
            type="date"
            id="startDate"
            className={styles.input}
            value={startDate}
            onChange={e => handleDateChange("startDate", e.target.value)}
            aria-label="Start Date"
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
        <div>
          <label htmlFor="endDate" className={styles.label}>End Date</label>
          <input
            type="date"
            id="endDate"
            className={styles.input}
            value={endDate}
            onChange={e => handleDateChange("endDate", e.target.value)}
            aria-label="End Date"
            min={startDate || new Date().toISOString().split("T")[0]}
          />
        </div>
      </motion.div>
      {(!valid && touched && startDate && endDate) && (
        <motion.p variants={fadeInUp} className={styles.error}>
          End date must be on or after start date.
        </motion.p>
      )}
      <motion.div variants={fadeInUp} className={styles.nextNav}>
        <button
          className={styles.nextBtn}
          type="button"
          onClick={() => valid && navigate("/onboarding/preferences")}
          disabled={!valid}
        >
          Next
        </button>
      </motion.div>
    </motion.div>
  );
}
