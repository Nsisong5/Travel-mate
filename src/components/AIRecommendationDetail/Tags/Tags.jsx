import React from "react";
import styles from "./Tags.module.css";

export default function Tags({ tags }) {
  if (!tags?.length) return null;

  return (
    <section className={styles.tagsSection} aria-label="Tags">
      {tags.map((tag) => (
        <span key={tag} className={styles.tag}>
          {tag}
        </span>
      ))}
    </section>
  );
}
