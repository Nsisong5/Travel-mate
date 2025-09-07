import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./PasswordSection.module.css";

export default function PasswordSection({
  expanded,
  toggleExpanded,
  passwordData,
  onChange,
}) {
  return (
    <section className={styles.section}>
      <button
        className={styles.toggleBtn}
        onClick={toggleExpanded}
        aria-expanded={expanded}
        type="button"
      >
        {expanded ? "Hide Password Fields" : "Change Password"}
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.passwordFields}
          >
            <PasswordField
              id="currentPassword"
              label="Current Password"
              value={passwordData.currentPassword}
              onChange={(v) => onChange("currentPassword", v)}
            />
            <PasswordField
              id="newPassword"
              label="New Password"
              value={passwordData.newPassword}
              onChange={(v) => onChange("newPassword", v)}
            />
            <PasswordField
              id="confirmPassword"
              label="Confirm New Password"
              value={passwordData.confirmPassword}
              onChange={(v) => onChange("confirmPassword", v)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function PasswordField({ id, label, value, onChange }) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <input
        id={id}
        name={id}
        type="password"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.input}
      />
    </label>
  );
}
