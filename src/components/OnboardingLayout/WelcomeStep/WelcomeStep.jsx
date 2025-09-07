import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "../variants";
import styles from "./WelcomeStep.module.css";

export default function WelcomeStep({darkMode}) {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/onboarding/personalization");
  };

  return (
    <motion.div
      className={styles.container}
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <motion.div
        variants={fadeInUp}
        className={styles.logoPlaceholder}
        aria-label="TravelMate logo placeholder"
      >
        TM
      </motion.div>

      <motion.div
        variants={fadeInUp}
        className={styles.illustrationPlaceholder}
        aria-hidden="true"
      >
        <svg
          width="160"
          height="160"
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="80"
            cy="80"
            r="80"
            className={styles.illustrationCircle}
          />
          <text
            x="80"
            y="90"
            textAnchor="middle"
            className={styles.illustrationText}
          >
            Illustration
          </text>
        </svg>
      </motion.div>

      <motion.h1 variants={fadeInUp} className={styles.headline}>
        Welcome to TravelMate – Your AI-powered travel buddy!
      </motion.h1>

      <motion.p variants={fadeInUp} className={styles.subtext}>
        Let’s plan your next adventure in minutes
      </motion.p>

      <motion.button
        variants={fadeInUp}
        className={styles.ctaButton}
        onClick={handleNext}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Let's Go to Personalization Step"
      >
        Let’s Go
      </motion.button>
    </motion.div>
  );
}