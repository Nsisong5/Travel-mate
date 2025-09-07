import React from "react";
import { motion } from "framer-motion";
import styles from "./MapWidget.module.css";
import { fadeInUp, hoverCard } from "../variants";

export default function MapWidget() {
  return (
    <motion.section
      className={styles.mapCard}
      variants={fadeInUp}
      whileHover="hoverCard"
      whileTap={{ scale: 0.99 }}
      tabIndex={0}
      aria-label="Map widget placeholder"
    >
      <h2 className={styles.title}>Map Placeholder</h2>
      <svg
        className={styles.mapSvg}
        width="100%"
        height="152"
        viewBox="0 0 300 152"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="300" height="152" fill="var(--card-grad-start)" />
        <g stroke="var(--primary)" strokeWidth="1">
          {[...Array(6)].map((_, i) => (
            <line key={`h-${i}`} x1="0" y1={i * 25.3} x2="300" y2={i * 25.3} />
          ))}
          {[...Array(11)].map((_, i) => (
            <line key={`v-${i}`} y1="0" x1={i * 30} y2="152" x2={i * 30} />
          ))}
        </g>
      </svg>
      <p className={styles.note}>Map integration coming soon</p>
    </motion.section>
  );
}
