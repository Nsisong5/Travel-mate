import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./HeroSection.module.css";
import heroImage from "../../../../public/hero2.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function HeroSection() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/onboarding');
  };

  return (
    <motion.section
      className={styles.heroSection}
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      aria-label="Hero Section"
    >
      <img
        src={heroImage}
        alt="Scenic travel destination"
        className={styles.heroImage}
      />
      <div className={styles.buttonsContainer}>
        <button
          className={styles.getStartedBtn}
          onClick={handleGetStarted}
          type="button"
          aria-label="Get Started"
        >
          Get Started
        </button>
        <button
          className={styles.learnMoreBtn}
          type="button"
          aria-label="Learn More"
        >
          Learn More
        </button>
      </div>
    </motion.section>
  );
}
