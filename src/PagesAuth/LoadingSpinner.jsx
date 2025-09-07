// src/components/LoadingScreen/LoadingScreen.jsx
// Brand-oriented loading screen with smooth pulse animation
// TODO: Show/hide this component based on app loading state (e.g., {isLoading && <LoadingScreen />})

import React from 'react';
import { motion } from 'framer-motion';
import styles from './LoadingSpinner.module.css';

const LoadingSpinner = ({ 
  isVisible = true, 
  message = "Loading your travel experience...", 
  className = "" 
}) => {
  
  // Framer Motion variants for the pulsing text animation
  const textVariants = {
    initial: { 
      scale: 1,
      opacity: 1
    },
    animate: {
      scale: [1, 0.95, 1], // Shrink slightly then expand back
      opacity: [1, 0.8, 1], // Dim slightly then brighten
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.5, 1] // Control timing of each keyframe
      }
    }
  };

  // Background overlay animation - synced with text pulse
  const backgroundVariants = {
    initial: { 
      opacity: 0.9
    },
    animate: {
      opacity: [0.9, 0.7, 0.9], // Dim when text shrinks, brighten when expands
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.5, 1]
      }
    }
  };

  // Subtle floating dots animation for extra polish
  const dotVariants = {
    initial: { y: 0 },
    animate: {
      y: [-4, 4, -4],
      transition: {
        duration: 1.8,
        repeat: Infinity,
        ease: "easeInOut",
        staggerChildren: 0.2
      }
    }
  };

  if (!isVisible) return null;

  return (
    <motion.div 
      className={`${styles.container} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Animated background overlay */}
      <motion.div 
        className={styles.backgroundOverlay}
        variants={backgroundVariants}
        initial="initial"
        animate="animate"
      />
      
      {/* Main content container */}
      <div className={styles.content}>
        {/* Brand name with pulse animation */}
        <motion.h1 
          className={styles.brandText}
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          Travel<span className={styles.brandAccent}>Mate</span>
        </motion.h1>
        
        {/* Loading message */}
        {message && (
          <motion.p 
            className={styles.loadingMessage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            {message}
          </motion.p>
        )}
        
        {/* Animated dots indicator */}
        <motion.div 
          className={styles.dotsContainer}
          variants={dotVariants}
          initial="initial"
          animate="animate"
        >
          <motion.span className={styles.dot} variants={dotVariants} />
          <motion.span className={styles.dot} variants={dotVariants} />
          <motion.span className={styles.dot} variants={dotVariants} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingSpinner;

// Usage examples:
// Basic usage: <LoadingScreen />
// Conditional rendering: {isLoading && <LoadingScreen />}
// Custom message: <LoadingScreen message="Preparing your trip..." />
// TODO: Connect to global loading state from context or store