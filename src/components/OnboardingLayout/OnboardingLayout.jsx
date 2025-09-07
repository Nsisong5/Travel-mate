// src/components/OnboardingLayout.jsx
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import styles from "./OnboardingLayout.module.css";
import { pageVariants } from "./variants";

export default function OnboardingLayout({ children }) {
  const location = useLocation();

  return (
    <div className={styles.wrapper}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className={styles.content}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
