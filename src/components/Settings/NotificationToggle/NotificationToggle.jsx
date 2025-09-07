import React, { useState } from "react";
import { Bell, BellOff } from "lucide-react";
import styles from "./NotificationToggle.module.css";

export default function NotificationToggle() {
  const [enabled, setEnabled] = useState(true);

  return (
    <section className={styles.container} aria-label="Notifications toggle">
      <div className={styles.labelWrapper}>
        {enabled ? (
          <Bell size={20} color="var(--primary)" />
        ) : (
          <BellOff size={20} color="var(--muted)" />
        )}
        <span className={styles.labelText}>Notifications</span>
      </div>
      <label className={styles.switch}>
        <input
          type="checkbox"
          checked={enabled}
          onChange={() => setEnabled((v) => !v)}
          aria-checked={enabled}
        />
        <span className={styles.slider} />
      </label>
    </section>
  );
}
