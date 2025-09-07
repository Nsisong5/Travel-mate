import React from "react";
import { motion } from "framer-motion";
import { RefreshCcw } from "lucide-react";
import styles from "./Header.module.css";

const fadeSlideIn = {
  hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 15 }
};

export default function Header({ loading, setLoading }) {
  return (
    <motion.header className={styles.header} initial="hidden" animate="visible" exit="exit" variants={fadeSlideIn}>
      <h1 className={styles.title}>AI Travel Recommendations</h1>
      <p className={styles.subtitle}>Smart suggestions tailored just for you.</p>
      <button className={styles.refreshBtn} aria-label="Refresh recommendations"
        onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 1000); }}
        disabled={loading}>
        <RefreshCcw size={24} />
      </button>
    </motion.header>
  );
}
