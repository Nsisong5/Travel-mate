import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./TripProgress.module.css";
import { fadeInUp, hoverCard } from "../variants";

export default function TripProgress({ progress }) {
  const [fillWidth, setFillWidth] = useState(0);
  useEffect(() => { setFillWidth(progress); }, [progress]);
  return (
    <motion.section
      className={styles.progressCard}
      variants={fadeInUp}
      whileHover="hoverCard"
      whileTap={{ scale: 0.99 }}
      tabIndex={0}
      aria-label={`Trip progress: ${progress}% completed`}
    >
      <h2 className={styles.title}>Trip Progress</h2>
      <div className={styles.progressBar} role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={progress}>
        <motion.div
          className={styles.progressFill}
          style={{ width: `${fillWidth}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      <p className={styles.percentText}>{progress}% Completed</p>
    </motion.section>
  );
}
