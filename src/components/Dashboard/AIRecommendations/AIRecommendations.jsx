import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./AIRecommendations.module.css";
import { fadeInUp } from "../variants";

const ITEMS_PER_PAGE_DESKTOP = 3;
const ITEMS_PER_PAGE_MOBILE = 1;

export default function AIRecommendations({ recommendations }) {
  const [page, setPage] = useState(0);

  // Determine items per page based on window width (simple)
  const itemsPerPage =
    typeof window !== "undefined" && window.innerWidth >= 1024
      ? ITEMS_PER_PAGE_DESKTOP
      : ITEMS_PER_PAGE_MOBILE;

  const pageCount = Math.ceil(recommendations.length / itemsPerPage);

  const startIndex = page * itemsPerPage;
  const currentItems = recommendations.slice(startIndex, startIndex + itemsPerPage);

  const handlePrev = () => {
    setPage((p) => (p - 1 + pageCount) % pageCount);
  };
  const handleNext = () => {
    setPage((p) => (p + 1) % pageCount);
  };

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
            {currentItems.map(({ id, name, description }) => (
              <motion.article
                key={id}
                className={styles.card}
                tabIndex={0}
                aria-label={`Recommendation: ${name}`}
              >
                <h3 className={styles.cardTitle}>{name}</h3>
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
