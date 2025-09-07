import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XCircle } from "lucide-react";
import styles from "./ConfirmationPopup.module.css";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const popupVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: { opacity: 0, y: 20, scale: 0.85, transition: { duration: 0.2, ease: "easeIn" } },
};

export default function ConfirmationPopup({
  isOpen,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  error,
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={styles.backdrop}
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        aria-modal="true"
        role="dialog"
        tabIndex={-1}
        onClick={onCancel}
      >
        <motion.div
          className={styles.popup}
          variants={popupVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
          role="document"
        >
          <button
            onClick={onCancel}
            className={styles.closeBtn}
            aria-label="Cancel and close"
          >
            <XCircle size={24} />
          </button>
          <p className={styles.message}>{message}</p>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.actions}>
            <button
              type="button"
              onClick={onCancel}
              className={`${styles.btn} ${styles.cancelBtn}`}
            >
              {cancelText}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className={`${styles.btn} ${styles.confirmBtn}`}
            >
              {confirmText}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
