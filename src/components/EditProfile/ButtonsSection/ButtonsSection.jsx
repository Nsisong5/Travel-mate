import React from "react";
import { motion } from "framer-motion";
import styles from "./ButtonsSection.module.css";
import { useNavigate } from "react-router-dom";

export default function ButtonsSection({ onSave, onCancel }) {
  return (
    <section className={styles.buttons}>
      <motion.button
        className={styles.saveBtn}
        onClick={onSave}
        whileTap={{ scale: 0.97 }}
        type="button"
      >
        Save Changes
      </motion.button>
      <motion.button
        className={styles.cancelBtn}
        onClick={onCancel}
        whileTap={{ scale: 0.97 }}
        type="button"
      >
        Cancel
      </motion.button>
    </section>
  );
}
