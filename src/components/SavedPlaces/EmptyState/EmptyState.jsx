import React from "react";
import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";
import styles from "./EmptyState.module.css";

export default function EmptyState({ onExplore }) {
  return (
    <motion.section
      className={styles.emptyState}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Bookmark size={56} className={styles.emptyIcon} />
      <p>You haven’t saved any places yet.</p>
      <button onClick={onExplore} className={styles.exploreBtn} type="button">
        Explore Destinations
      </button>
    </motion.section>
  );
}
