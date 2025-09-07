import React from "react";
import { motion } from "framer-motion";
import { useOutletContext, useNavigate } from "react-router-dom";
import styles from "./PreferencesStep.module.css";
import { fadeInUp, staggerContainer } from "../motion";

const BUDGETS = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

const STYLES = [
  { value: "leisure", label: "Leisure" },
  { value: "adventure", label: "Adventure" },
  { value: "cultural", label: "Cultural" },
];

export default function PreferencesStep() {
  const { state, dispatch } = useOutletContext();
  const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    dispatch({ type: "setField", field, value: e.target.value });
  };

  return (
    <motion.div
      className={styles.preferencesPage}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      exit="exit"
      aria-label="Select trip preferences"
    >
      <motion.h1 variants={fadeInUp} className={styles.title}>
        What kind of trip do you prefer?
      </motion.h1>
      <motion.div variants={fadeInUp} className={styles.selectSection}>
        <label htmlFor="budget" className={styles.label}>Budget Range</label>
        <select
          id="budget"
          className={styles.select}
          value={state.budget}
          onChange={handleChange("budget")}
        >
          {BUDGETS.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>

        <label htmlFor="style" className={styles.label}>Travel Style</label>
        <select
          id="style"
          className={styles.select}
          value={state.style}
          onChange={handleChange("style")}
        >
          {STYLES.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </motion.div>

      <motion.div variants={fadeInUp} className={styles.nextNav}>
        <button
          className={styles.nextBtn}
          type="button"
          onClick={() => navigate("/onboarding/summary")}
        >
          Next
        </button>
      </motion.div>
    </motion.div>
  );
}
