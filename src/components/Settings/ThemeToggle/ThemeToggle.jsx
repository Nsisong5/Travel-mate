import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../../ThemeContext";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <section className={styles.toggleContainer} aria-label="Theme toggle">
      <label htmlFor="themeToggle" className={styles.label}>
        {theme === "dark" ? <Moon size={20} color="var(--primary)" /> : <Sun size={20} color="var(--primary)" />}
        <span className={styles.labelText}>Theme</span>
      </label>
      <div className={styles.switchWrapper}>
        <span className={styles.mode}>{theme === "light" ? "Light" : "Dark"}</span>
        <label className={styles.switch}>
          <input id="themeToggle" type="checkbox" checked={theme === "dark"} onChange={toggleTheme} aria-checked={theme === "dark"} />
          <span className={styles.slider} />
        </label>
      </div>
    </section>
  );
}
