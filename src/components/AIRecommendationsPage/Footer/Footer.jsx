import React from "react";
import styles from "./Footer.module.css";

export default function Footer({regenerate}) {
  return (
    <footer className={styles.footer}>
      Not seeing what you like?{" "}
      <button className={styles.askBtn} type="button" onClick={regenerate}>Ask AI Again</button>
    </footer>
  );
}
