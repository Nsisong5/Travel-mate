import React from "react";
import { motion } from "framer-motion";
import { Plane } from "lucide-react";
import styles from "./CTABanner.module.css";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function CTABanner() {
  return (
    <motion.section
      className={styles.ctaBanner}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      aria-label="Call to action banner"
    >
      <h2 className={styles.heading}>Ready to plan your next adventure?</h2>
      <button className={styles.ctaButton} type="button" aria-label="Join TravelMate Today" onClick={() => window.location.href = '/onboarding'}>
        Join TravelMate Today <Plane size={20} />
      </button>
    </motion.section>
  );
}
