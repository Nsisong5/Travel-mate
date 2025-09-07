import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./AIRecommendations.module.css";
import { fadeInUp } from "../variants";
import { useAIRecommendations } from "../../../services/AIRecommendationsServices/AIRecommendations";

const ITEMS_PER_PAGE_DESKTOP = 3;
const ITEMS_PER_PAGE_MOBILE = 1;

const PLACEHOLDER_BG = "#d0d7e3";

// Helper for fallback initials
const getInitials = (name) => {
  if (!name) return "??";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
};

export default function AIRecommendations() {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const { recommendations, loading: contextLoading, error, getUserAIRecommendations } =
    useAIRecommendations();

  useEffect(() => {
    const loadRecommendations = async () => {
      setLoading(true);
      try {
        await getUserAIRecommendations({ limit: 50 });
      } catch (err) {
        console.error("Failed to load AI recommendations:", err);
      } finally {
        setLoading(false);
      }
    };
    loadRecommendations();
  }, []);

  const itemsPerPage =
    typeof window !== "undefined" && window.innerWidth >= 1024
      ? ITEMS_PER_PAGE_DESKTOP
      : ITEMS_PER_PAGE_MOBILE;

  const pageCount = Math.ceil(recommendations.length / itemsPerPage);
  const startIndex = page * itemsPerPage;
  const currentItems = recommendations.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => setPage((p) => (p - 1 + pageCount) % pageCount);
  const handleNext = () => setPage((p) => (p + 1) % pageCount);

  return (
    <section className={styles.container} aria-label="AI Recommendations">
      <h2 className={styles.title}>AI Recommendations</h2>
      <div className={styles.carouselWrapper}>
        <button
          className={styles.navButton}
          onClick={handlePrev}
          aria-label="Previous recommendations"
          type="button"
        >
          <ChevronLeft size={20} />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            className={styles.carousel}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
          >
            {currentItems.map(({ id, name, description, image }) => (
              <motion.article
                key={id}
                className={styles.card}
                tabIndex={0}
                aria-label={`Recommendation: ${name}`}
              >
                <div className={styles.imageContainer}>
                  {image ? (
                    <img
                      src={image}
                      alt={name}
                      className={styles.cardImage}
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className={styles.placeholderImage} aria-hidden="true">
                      {getInitials(name)}
                    </div>
                  )}
                  <h3 className={styles.cardTitle}>{name}</h3>
                </div>
                <p className={styles.cardDesc}>{description}</p>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        <button
          className={styles.navButton}
          onClick={handleNext}
          aria-label="Next recommendations"
          type="button"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
