import React from "react";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Saved Places</h1>
      <p className={styles.subtitle}>Easily revisit destinations you’ve saved.</p>
    </header>
  );
}
