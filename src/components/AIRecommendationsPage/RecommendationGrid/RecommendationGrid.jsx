import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, Save, MapPin, Star, Trash2 } from "lucide-react";
import styles from "./RecommendationGrid.module.css";

const fadeStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const fadeUpVariant = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.9,
    transition: { duration: 0.3, ease: "easeInOut" }
  }
};

export default function RecommendationGrid({
  recommendations,
  loading,
  onSave,
  viewDetail,
  onDelete
}) {
  const [localRecs, setLocalRecs] = useState(recommendations);

  // Sync local state with parent prop changes
  React.useEffect(() => {
    setLocalRecs(recommendations);
  }, [recommendations]);

  const handleRemove = async (id) => {
    // Instantly remove from screen (no refresh)
    setLocalRecs((prev) => prev.filter((rec) => rec.id !== id));

    try {
      // Trigger backend delete (non-blocking)
      await onDelete(id);
    } catch (error) {
      console.error("Error deleting recommendation:", error);
      // Optional: revert if delete fails
      setLocalRecs((prev) => [...prev, recommendations.find(r => r.id === id)]);
    }
  };

  if (loading) {
    return (
      <div className={styles.gridContainer}>
        <div className={styles.grid}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={`${styles.card} ${styles.skeleton}`}>
              <div className={styles.skeletonImage}></div>
              <div className={styles.skeletonContent}>
                <div className={styles.skeletonTitle}></div>
                <div className={styles.skeletonDescription}></div>
                <div className={styles.skeletonTags}>
                  <div className={styles.skeletonTag}></div>
                  <div className={styles.skeletonTag}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!localRecs.length) {
    return (
      <div className={styles.gridContainer}>
        <section className={styles.emptyState}>
          <div className={styles.emptyIconWrapper}>
            <Tag size={48} className={styles.emptyIcon} />
          </div>
          <h3 className={styles.emptyTitle}>No recommendations found</h3>
          <p className={styles.emptyDescription}>
            Try adjusting your filters or search terms to discover new places.
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className={styles.gridContainer}>
      <motion.section
        className={styles.grid}
        initial="hidden"
        animate="visible"
        variants={fadeStagger}
        aria-label="AI Recommendations"
      >
        <AnimatePresence>
          {localRecs.map((recommendation) => {
            const { id, title, description, image, tags, location, rating } = recommendation;

            return (
              <motion.article
                key={id}
                className={styles.card}
                variants={fadeUpVariant}
                exit="exit"
                whileHover={{
                  y: -4,
                  transition: { duration: 0.2 }
                }}
                whileTap={{
                  scale: 0.98,
                  transition: { duration: 0.1 }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${title} in ${location}`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    viewDetail(id);
                  }
                }}
              >
                <div className={styles.imageContainer}>
                  <img
                    src={image}
                    alt={`${title} in ${location}`}
                    className={styles.image}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = "/placeholder-destination.jpg";
                    }}
                  />
                  <div className={styles.locationBadge}>
                    <MapPin size={14} />
                    <span>{location}</span>
                  </div>
                  {rating && (
                    <div className={styles.ratingBadge}>
                      <Star size={14} fill="currentColor" />
                      <span>{rating}</span>
                    </div>
                  )}
                </div>

                <div className={styles.cardContent}>
                  <h3 className={styles.title}>{title}</h3>
                  <p className={styles.description}>
                    {description.length > 120
                      ? `${description.slice(0, 120)}...`
                      : description}
                  </p>

                  <div className={styles.tagsSection}>
                    <div className={styles.tagsContainer}>
                      {tags?.slice(0, 3).map((tag) => (
                        <span key={tag} className={styles.tag}>
                          {tag}
                        </span>
                      ))}
                      {tags?.length > 3 && (
                        <span className={styles.moreTagsIndicator}>
                          +{tags.length - 3}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      className={styles.saveBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSave(id);
                      }}
                      onKeyDown={(e) => e.stopPropagation()}
                    >
                      <Save size={16} />
                    </button>

                    <button
                      type="button"
                      className={styles.saveBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(id);
                      }}
                      onKeyDown={(e) => e.stopPropagation()}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <button
                  className={styles.viewBtn}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    viewDetail(id);
                  }}
                  onKeyDown={(e) => e.stopPropagation()}
                >
                  View Details
                </button>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.section>
    </div>
  );
}