import React from "react";
import { motion } from "framer-motion";
import styles from "./PageHeader.module.css";

export default function PageHeader() {
  return (
    <motion.header
      className={styles.header}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className={styles.title}>Edit Profile</h1>
      <p className={styles.subtext}>
        Update your personal information to keep your profile up to date.
      </p>
    </motion.header>
  );
}
