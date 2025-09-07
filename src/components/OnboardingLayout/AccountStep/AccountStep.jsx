// src/components/AccountStep.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ProgressBar from "../ProgressBar/ProgressBar";
import { fadeInUp, staggerContainer } from "../variants";
import styles from "./AccountStep.module.css";

export default function AccountStep({ darkMode,formData, setFormData, onboardingComplete, setOnboardingComplete }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const totalSteps = 3;
  const currentStep = 3;

  const { name, email, password } = formData;

  const validate = () => {
    let newErrors = {};
    if (!name.trim()) newErrors.name = "Please enter your name";
    if (!email.trim()) newErrors.email = "Please enter your email";
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Please enter a valid email";
    if (!password.trim()) newErrors.password = "Please enter your password";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFinish = (e) => {
    e.preventDefault();
    if (validate()) {
      // Mark onboarding complete
      setOnboardingComplete(true);
      // Navigate to dashboard
      navigate("/dashboard");
    }
  };

  const handleSkip = () => {
    setOnboardingComplete(true);
    navigate("/dashboard");
  };

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
      onSubmit={handleFinish}
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      noValidate
      aria-label="Account Setup Form"
    >
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      <motion.div variants={fadeInUp} className={styles.fieldGroup}>
        <label htmlFor="name" className={styles.label}>
          Name <span aria-hidden="true">*</span>
        </label>
        <input
          id="name"
          className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
          aria-describedby={errors.name ? "error-name" : undefined}
          aria-invalid={!!errors.name}
          required
        />
        {errors.name && (
          <span id="error-name" className={styles.errorMessage} tabIndex={-1} role="alert">
            {errors.name}
          </span>
        )}
      </motion.div>

      <motion.div variants={fadeInUp} className={styles.fieldGroup}>
        <label htmlFor="email" className={styles.label}>
          Email <span aria-hidden="true">*</span>
        </label>
        <input
          id="email"
          className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
          aria-describedby={errors.email ? "error-email" : undefined}
          aria-invalid={!!errors.email}
          required
        />
        {errors.email && (
          <span id="error-email" className={styles.errorMessage} tabIndex={-1} role="alert">
            {errors.email}
          </span>
        )}
      </motion.div>

      <motion.div variants={fadeInUp} className={styles.fieldGroup}>
        <label htmlFor="password" className={styles.label}>
          Password <span aria-hidden="true">*</span>
        </label>
        <input
          id="password"
          className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setFormData((f) => ({ ...f, password: e.target.value }))}
          aria-describedby={errors.password ? "error-password" : undefined}
          aria-invalid={!!errors.password}
          required
          autoComplete="new-password"
        />
        {errors.password && (
          <span id="error-password" className={styles.errorMessage} tabIndex={-1} role="alert">
            {errors.password}
          </span>
        )}
      </motion.div>

      <motion.div variants={fadeInUp} className={styles.actions}>
        <button
          type="button"
          className={styles.skipBtn}
          onClick={handleSkip}
          aria-label="Skip account setup"
        >
          Skip for Now
        </button>

        <button
          type="submit"
          className={styles.finishBtn}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Finish onboarding and see my plan"
        >
          Finish &amp; See My Plan
        </button>
      </motion.div>
    </motion.form>
  );
}
