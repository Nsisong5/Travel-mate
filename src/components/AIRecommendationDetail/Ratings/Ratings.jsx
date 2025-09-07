import React from "react";
import { Star } from "lucide-react";
import styles from "./Ratings.module.css";

export default function Ratings({ rating, popularity }) {
  // Round rating or default to 0
  const filledStars = Math.round(rating || 0);
  const stars = Array(5).fill(0).map((_, i) => i < filledStars);

  return (
    <section className={styles.ratingsSection} aria-label="Ratings and popularity">
      <div className={styles.stars}>
        {stars.map((filled, idx) => (
          <Star
            key={idx}
            size={20}
            color={filled ? "#F59E0B" : "#CBD5E1"}
            aria-hidden="true"
          />
        ))}
        <span className={styles.ratingText}>{rating?.toFixed(1) || "N/A"} ({popularity?.reviews || 0} reviews)</span>
      </div>
      <div className={styles.popularityText}>
        Saved by {popularity?.savedCount?.toLocaleString() || 0} travelers
      </div>
    </section>
  );
}
