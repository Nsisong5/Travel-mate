import React, { useState } from "react";
import styles from "./HeroSection.module.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Plane } from "lucide-react";
import heroImg from "../../../../public/image-11.png";
import { pageVariants } from "../../../motionVariants"; // Adjust path accordingly
import { useTheme } from "../../../ThemeContext";

export default function HeroSection() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);

  // Trigger exit animation, then navigate
  const handleGetStarted = () => {
    setIsExiting(true);
  };

  // After exit animation completes
  const onExitComplete = () => {
    if (isExiting) {
      navigate("/onboarding");
    }
  };

  return (
    <motion.section
      className={`${styles.hero} ${theme === "dark" ? styles.dark : ""}`}
      role="banner"
      aria-label="Hero Section"
      variants={pageVariants}
      initial="initial"
      animate={isExiting ? "exit" : "animate"}
      exit="exit"
      onAnimationComplete={() => {
        if (isExiting) onExitComplete();
      }}
    >
      <motion.div className={styles.content}>
        <h1 className={styles.headline}>
          Your Ultimate Travel Companion, <br />
          Wherever You Go.
        </h1>
        <p className={styles.subheadline}>
          Flight bookings, weather updates, and your personal checklist—all in
          one place.
        </p>
        <motion.button
          className={styles.ctaButton}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Get Started"
          onClick={handleGetStarted}
          disabled={isExiting} // Prevent multiple clicks during animation
        >
          <Plane size={18} style={{ marginRight: "0.5rem" }} />
          Get Started
        </motion.button>
      </motion.div>

      <motion.div className={styles.heroImageWrapper}>
        <motion.img
          src={heroImg}
          alt="TravelMate hero illustration"
          className={styles.heroImage}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          loading="lazy"
        />
        <div className={styles.blueAccent} aria-hidden="true" />
      </motion.div>
    </motion.section>
  );
}
