import React from "react";
import { motion } from "framer-motion";
import { useOutletContext, useNavigate } from "react-router-dom";
import styles from "./WelcomeStep.module.css";
import { fadeInUp, staggerContainer } from "../motion";

export default function WelcomeStep() {
  const { allowSkip } = useOutletContext();
  const navigate = useNavigate();

  return (
    <motion.div
      className={styles.welcomePage}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      exit="exit"
      aria-label="Welcome step"
    >
      <motion.div variants={fadeInUp} className={styles.logoCircle} aria-hidden="true">
        TM
      </motion.div>
      <motion.h1 variants={fadeInUp} className={styles.title}>
        Welcome to Your Travel Buddy
      </motion.h1>
      <motion.p variants={fadeInUp} className={styles.subtitle}>
        Plan your next adventure effortlessly
      </motion.p>
      <motion.div variants={fadeInUp} className={styles.buttonGroup}>
        <button
          type="button"
          className={styles.primaryBtn}
          onClick={() => navigate("/onboarding/destination")}
          aria-label="Plan a Trip"
        >
          Plan a Trip
        </button>
        {allowSkip && (
          <button
            type="button"
            className={styles.skipBtn}
            onClick={() => navigate("/auth/signup")}
            aria-label="Skip for now"
          >
            Skip for now
          </button>
        )}
      </motion.div>
    </motion.div>
  );
}
