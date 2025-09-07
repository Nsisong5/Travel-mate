import React from "react";
import styles from "./QuickFacts.module.css";

export default function QuickFacts({
  category,
  budget_category,
  lifestyle_category,
  destination_type,
  estimated_cost,
}) {
  const badges = [
    { label: category },
    { label: budget_category },
    { label: lifestyle_category },
    { label: destination_type },
  ].filter((b) => b.label);

  return (
    <section className={styles.quickFacts} aria-label="Quick facts">
      <div className={styles.badges}>
        {badges.map(({ label }) => (
          <span key={label} className={styles.badge}>
            {label}
          </span>
        ))}
      </div>
      <div className={styles.costType}>
        {estimated_cost && (
          <span className={styles.estimatedCost}>${estimated_cost} avg</span>
        )}
        {destination_type && (
          <span className={styles.destType}>{destination_type}</span>
        )}
      </div>
    </section>
  );
}
