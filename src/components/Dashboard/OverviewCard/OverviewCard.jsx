import React from "react";
import { motion } from "framer-motion";
import styles from "./OverviewCard.module.css";
import { fadeInUp, hoverCard } from "../variants";

export default function OverviewCard({ icon, title, value, index }) {
  return (
    <motion.article
      className={styles.card}
      variants={fadeInUp}
      whileHover="hoverCard"
      whileTap={{ scale: 0.99 }}
      tabIndex={0}
      aria-label={`${title}: ${value}`}
      style={{ animationDelay: `${index * 0.14}s` }}
    >
      <div className={styles.icon}>{typeof icon === 'string' ? <span aria-hidden="true">{icon}</span> : icon}</div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.value}>{value}</p>
      </div>
    </motion.article>
  );
}
