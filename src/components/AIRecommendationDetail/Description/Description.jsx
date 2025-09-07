import React from "react";
import styles from "./Description.module.css";

export default function Description({ description }) {
  return (
    <section className={styles.descriptionSection} aria-label="Description">
      <p>{description}</p>
    </section>
  );
}
