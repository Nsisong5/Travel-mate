import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ProgressBar from "../ProgressBar/ProgressBar";
import { fadeInUp, staggerContainer } from "../variants";
import styles from "./PersonalizationStep.module.css";

// Pill button options
const travelStyles = ["Adventure", "Luxury", "Budget"];

export default function PersonalizationStep({ formData, setFormData }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const totalSteps = 3;
  const currentStep = 2;

  // Controlled inputs from props `formData` and `setFormData`
  const { destination, startDate, endDate, travelStyle } = formData;

  // Validation function
  const validate = () => {
    let newErrors = {};
    if (!destination.trim()) newErrors.destination = "Please enter a destination";
    if (!startDate) newErrors.startDate = "Please enter a start date";
    if (!endDate) newErrors.endDate = "Please enter an end date";
    else if (startDate && endDate && new Date(endDate) < new Date(startDate))
      newErrors.endDate = "End date must be after start date";
    if (!travelStyle) newErrors.travelStyle = "Please select a travel style";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate("/onboarding/account");
    }
  };

  // For accessibility: error aria-live reader
  useEffect(() => {
    if (Object.keys(errors).length) {
      const firstErrorField = Object.keys(errors)[0];
      const el = document.getElementById(`error-${firstErrorField}`);
      if (el) el.focus();
    }
  }, [errors]);

  return (
    <motion.form
      className={styles.container}
      onSubmit={handleContinue}
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      noValidate
      aria-label="Personalization Form"
    >
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      <motion.div variants={fadeInUp} className={styles.fieldGroup}>
        <label htmlFor="destination" className={styles.label}>
          Destination or Dream City <span aria-hidden="true">*</span>
        </label>
        <input
          id="destination"
          type="text"
          className={`${styles.input} ${errors.destination ? styles.inputError : ""}`}
          placeholder="e.g. Paris"
          value={destination}
          onChange={(e) => setFormData((f) => ({ ...f, destination: e.target.value }))}
          aria-describedby={errors.destination ? "error-destination" : undefined}
          aria-invalid={!!errors.destination}
          required
        />
        {errors.destination && (
          <span id="error-destination" className={styles.errorMessage} tabIndex={-1} role="alert">
            {errors.destination}
          </span>
        )}
      </motion.div>

      <motion.div variants={fadeInUp} className={styles.datesGroup}>
        <div className={styles.startDateWrapper}>
          <label htmlFor="startDate" className={styles.label}>
            Start Date <span aria-hidden="true">*</span>
          </label>
          <input
            id="startDate"
            type="date"
            className={`${styles.input} ${errors.startDate ? styles.inputError : ""}`}
            value={startDate}
            onChange={(e) => setFormData((f) => ({ ...f, startDate: e.target.value }))}
            aria-describedby={errors.startDate ? "error-startDate" : undefined}
            aria-invalid={!!errors.startDate}
            required
          />
          {errors.startDate && (
            <span id="error-startDate" className={styles.errorMessage} tabIndex={-1} role="alert">
              {errors.startDate}
            </span>
          )}
        </div>

        <div className={styles.endDateWrapper}>
          <label htmlFor="endDate" className={styles.label}>
            End Date <span aria-hidden="true">*</span>
          </label>
          <input
            id="endDate"
            type="date"
            className={`${styles.input} ${errors.endDate ? styles.inputError : ""}`}
            value={endDate}
            onChange={(e) => setFormData((f) => ({ ...f, endDate: e.target.value }))}
            aria-describedby={errors.endDate ? "error-endDate" : undefined}
            aria-invalid={!!errors.endDate}
            required
          />
          {errors.endDate && (
            <span id="error-endDate" className={styles.errorMessage} tabIndex={-1} role="alert">
              {errors.endDate}
            </span>
          )}
        </div>
      </motion.div>

      <motion.fieldset variants={fadeInUp} className={styles.travelStyleGroup}>
        <legend className={styles.label}>
          Travel Style <span aria-hidden="true">*</span>
        </legend>
        <div className={styles.pillContainer} role="radiogroup" aria-required="true">
          {travelStyles.map((style) => (
            <button
              type="button"
              key={style}
              className={`${styles.pill} ${travelStyle === style ? styles.pillSelected : ""}`}
              aria-checked={travelStyle === style}
              role="radio"
              onClick={() => setFormData((f) => ({ ...f, travelStyle: style }))}
            >
              {style}
            </button>
          ))}
        </div>
        {errors.travelStyle && (
          <span id="error-travelStyle" className={styles.errorMessage} tabIndex={-1} role="alert">
            {errors.travelStyle}
          </span>
        )}
      </motion.fieldset>

      <motion.button
        type="submit"
        variants={fadeInUp}
        className={styles.continueBtn}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Continue to Account Setup"
      >
        Continue
      </motion.button>
    </motion.form>
  );
}
