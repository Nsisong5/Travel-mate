import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./HeroSection.module.css";
import heroImage from "../../../../public/image-11.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Button animation variants for enhanced interactions
const buttonVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  },
  hover: { 
    scale: 1.05, 
    transition: { duration: 0.2, ease: "easeInOut" } 
  },
  tap: { 
    scale: 0.98, 
    transition: { duration: 0.1 } 
  }
};

export default function HeroSection() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/onboarding');
  };

  const handleLearnMore = () => {
    // Scroll to features section or navigate to about page
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
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
      
      {/* Refactored buttons container with improved positioning and responsiveness */}
      <motion.div 
        className={styles.buttonsContainer}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.3, staggerChildren: 0.1 }}
      >
        <motion.button
          className={styles.getStartedBtn}
          onClick={handleGetStarted}
          type="button"
          aria-label="Get Started with TravelMate"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Get Started
        </motion.button>
        
        <motion.button
          className={styles.learnMoreBtn}
          onClick={handleLearnMore}
          type="button"
          aria-label="Learn More about TravelMate"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          Learn More
        </motion.button>
      </motion.div>
    </motion.section>
  );
}