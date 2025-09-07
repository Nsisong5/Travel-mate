import React from "react";
import { motion } from "framer-motion";
import { Trash2, Eye } from "lucide-react";
import styles from "./SavedPlaceCard.module.css";

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function SavedPlaceCard({ place, onRemove, onView }) {
  return (
    <motion.article
      className={styles.card}
      variants={cardVariants}
      whileHover={{ scale: 1.03, boxShadow: "var(--shadow)" }}
      tabIndex={0}
      role="listitem"
      aria-label={`Saved place ${place.name}, located in ${place.location}`}
    >
      <img src={place.image} alt={place.name} className={styles.image} />
      <div className={styles.cardContent}>
        <h3 className={styles.name}>{place.name}</h3>
        <p className={styles.location}>{place.location}</p>
        <p className={styles.description} title={place.description}>
          {place.description.length > 70
            ? place.description.slice(0, 70) + "..."
            : place.description}
        </p>
        <div className={styles.actions}>
          <button
            onClick={() => onView(place.id)}
            className={styles.viewBtn}
            aria-label={`View details for ${place.name}`}
            type="button"
          >
            <Eye size={16} />
            View Details
          </button>
          <button
            onClick={() => onRemove(place.id)}
            className={styles.removeBtn}
            aria-label={`Remove ${place.name} from saved places`}
            type="button"
          >
            <Trash2 size={16} />
            Remove
          </button>
        </div>
      </div>
    </motion.article>
  );
}
