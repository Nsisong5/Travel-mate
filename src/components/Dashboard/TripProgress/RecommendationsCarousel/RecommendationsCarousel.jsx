// src/components/TripProgress/RecommendationsCarousel.jsx
// Horizontal scrollable recommendations carousel with navigation arrows
// TODO: Connect to real recommendations API and implement user preferences

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, ExternalLink } from 'lucide-react';
import { slideLeft, fadeInUp, cardEntrance } from '../variants';
import styles from './RecommendationsCarousel.module.css';

const RecommendationsCarousel = ({ recommendations = [], discoverRoute = '/discover' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const scrollRef = useRef(null);
  const itemsPerView = 1; // Mobile first - show one at a time

  // Load persisted page from sessionStorage
  useEffect(() => {
    try {
      const savedIndex = sessionStorage.getItem('tripProgress_recommendationIndex');
      if (savedIndex && recommendations.length > 0) {
        const index = Math.min(parseInt(savedIndex, 10), recommendations.length - 1);
        if (index >= 0) setCurrentIndex(index);
      }
    } catch (error) {
      console.warn('Failed to load saved recommendation index:', error);
    }
  }, [recommendations.length]);

  // Persist current page to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem('tripProgress_recommendationIndex', currentIndex.toString());
    } catch (error) {
      console.warn('Failed to save recommendation index:', error);
    }
  }, [currentIndex]);

  // Update scroll button states
  useEffect(() => {
    if (recommendations.length > 0) {
      setCanScrollLeft(currentIndex > 0);
      setCanScrollRight(currentIndex < recommendations.length - itemsPerView);
    }
  }, [currentIndex, recommendations.length, itemsPerView]);

  const scrollToIndex = (index) => {
    const newIndex = Math.max(0, Math.min(index, recommendations.length - itemsPerView));
    setCurrentIndex(newIndex);
  };

  const scrollLeft = () => {
    scrollToIndex(currentIndex - 1);
  };

  const scrollRight = () => {
    scrollToIndex(currentIndex + 1);
  };

  // Handle keyboard navigation
  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft' && canScrollLeft) {
      scrollLeft();
    } else if (event.key === 'ArrowRight' && canScrollRight) {
      scrollRight();
    }
  };

  if (!recommendations || recommendations.length === 0) {
    return (
      <motion.div 
        className={styles.emptyState}
        variants={fadeInUp}
        aria-label="No recommendations available"
      >
        <div className={styles.emptyIcon}>
          <MapPin size={32} />
        </div>
        <h4 className={styles.emptyTitle}>No recommendations yet</h4>
        <p className={styles.emptyDescription}>Coming soon</p>
        <motion.a
          href={discoverRoute}
          className={styles.exploreCta}
          variants={fadeInUp}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ExternalLink size={16} />
          Explore destinations
        </motion.a>
      </motion.div>
    );
  }

  const currentRecommendation = recommendations[currentIndex];

  return (
    <motion.div 
      className={styles.container}
      variants={cardEntrance}
      initial="hidden"
      animate="show"
    >
      <div className={styles.header}>
        <h4 className={styles.title}>Recommendations</h4>
        {recommendations.length > 1 && (
          <div className={styles.indicators}>
            {recommendations.map((_, index) => (
              <button
                key={index}
                className={`${styles.indicator} ${index === currentIndex ? styles.indicatorActive : ''}`}
                onClick={() => scrollToIndex(index)}
                aria-label={`Go to recommendation ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <div 
        className={styles.carouselWrapper}
        onKeyDown={handleKeyDown}
        tabIndex="0"
        role="region"
        aria-label="Recommendations carousel"
        aria-live="polite"
      >
        {recommendations.length > 1 && (
          <>
            <button
              className={`${styles.navButton} ${styles.navLeft}`}
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              aria-label="Previous recommendation"
            >
              <ChevronLeft size={20} />
            </button>
            
            <button
              className={`${styles.navButton} ${styles.navRight}`}
              onClick={scrollRight}
              disabled={!canScrollRight}
              aria-label="Next recommendation"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        <div className={styles.carouselTrack} ref={scrollRef}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              className={styles.recommendationCard}
              variants={slideLeft}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              <div className={styles.cardImage}>
                {currentRecommendation.cover_image ? (
                  <img 
                    src={currentRecommendation.cover_image} 
                    alt={currentRecommendation.title}
                    loading="lazy"
                  />
                ) : (
                  <div className={styles.imagePlaceholder} aria-label="Recommendation image placeholder">
                    <MapPin size={24} />
                  </div>
                )}
              </div>
              
              <div className={styles.cardContent}>
                <h5 className={styles.cardTitle}>
                  {currentRecommendation.tags && currentRecommendation.tags[0] && (
                    <span className={styles.cardEmoji} aria-hidden="true">
                      {currentRecommendation.tags[0]}
                    </span>
                  )}
                  {currentRecommendation.title}
                </h5>
                <p className={styles.cardDescription}>
                  {currentRecommendation.description}
                </p>
                {currentRecommendation.tags && currentRecommendation.tags.length > 1 && (
                  <div className={styles.cardTags}>
                    {currentRecommendation.tags.slice(1).map((tag, index) => (
                      <span key={index} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default RecommendationsCarousel;