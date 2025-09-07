import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <nav className={styles.links}>
        <a href="/about" className={styles.link}>About</a>
        <a href="/contact" className={styles.link}>Contact</a>
        <a href="/privacy" className={styles.link}>Privacy</a>
        <a href="/terms" className={styles.link}>Terms of Service</a>
      </nav>
      <p className={styles.copyright}>© 2025 TravelMate. All Rights Reserved.</p>
    </footer>
  );
}
