import React from "react";
import { motion } from "framer-motion";
import styles from "./PopularDestinations.module.css";

const POPULAR = [
  { id: 1, name: "Paris" },
  { id: 2, name: "Tokyo" },
  { id: 3, name: "New York" },
  { id: 4, name: "London" },
  { id: 5, name: "Rome" },
  { id: 6, name: "Lisbon" },
];

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function PopularDestinations({ onSelect }) {
  return (
    <section aria-label="Popular destinations" className={styles.popularSection}>
      <div className={styles.grid}>
        {POPULAR.map(({ id, name }) => (
          <motion.button
            key={id}
            type="button"
            className={styles.card}
            variants={cardVariant}
            initial="hidden"
            animate="visible"
            whileHover={{ scale: 1.03 }}
            onClick={() => onSelect(name)}
            aria-label={`Select ${name} destination`}
          >
            <div className={styles.imagePlaceholder} aria-hidden="true" />
            <span className={styles.name}>{name}</span>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
