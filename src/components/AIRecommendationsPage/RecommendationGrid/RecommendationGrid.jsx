import React from "react";
import { motion } from "framer-motion";
import { Tag, Save, MapPin, Star } from "lucide-react";
import styles from "./RecommendationGrid.module.css";

// Enhanced animation variants for smoother performance
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
  }
};

export default function RecommendationGrid({ recommendations, loading, onSave, viewDetail }) {
  
  // Enhanced loading skeleton with proper responsive structure
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

  // Enhanced empty state with better visual hierarchy
  if (!recommendations.length) {
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
        {recommendations.map((recommendation) => {
          const { id, title, description, image, tags, location, rating } = recommendation;
          
          return (
            <motion.article 
              key={id} 
              className={styles.card} 
              variants={fadeUpVariant}
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
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  viewDetail(id);
                }
              }}
            >
              {/* Enhanced image container with fallback and loading states */}
              <div className={styles.imageContainer}>
                <img 
                  src={image} 
                  alt={`${title} in ${location}`}
                  className={styles.image}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = '/placeholder-destination.jpg'; // Fallback image
                  }}
                />
                {/* Location badge overlay */}
                <div className={styles.locationBadge}>
                  <MapPin size={14} />
                  <span>{location}</span>
                </div>
                {/* Rating badge if available */}
                {rating && (
                  <div className={styles.ratingBadge}>
                    <Star size={14} fill="currentColor" />
                    <span>{rating}</span>
                  </div>
                )}
              </div>

              {/* Enhanced card content with better spacing */}
              <div className={styles.cardContent}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>
                  {description.length > 120 ? `${description.slice(0, 120)}...` : description}
                </p>

                {/* Enhanced tags section with save button */}
                <div className={styles.tagsSection}>
                  <div className={styles.tagsContainer}>
                    {tags?.slice(0, 3).map(tag => (
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
                    aria-label={`Save ${title} to favorites`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSave(id);
                    }}
                    onKeyDown={(e) => e.stopPropagation()}
                  >
                    <Save size={16} />
                  </button>
                </div>
              </div>

              {/* Enhanced view details button */}
              <button 
                className={styles.viewBtn} 
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  viewDetail(id);
                }}
                onKeyDown={(e) => e.stopPropagation()}
                aria-label={`View full details for ${title}`}
              >
                View Details
              </button>
            </motion.article>
          );
        })}
      </motion.section>
    </div>
  );
}