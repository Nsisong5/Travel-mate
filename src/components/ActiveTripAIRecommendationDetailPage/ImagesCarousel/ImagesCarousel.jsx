// src/pages/AIRecommendationDetailPage/ImagesCarousel/ImagesCarousel.jsx
// Horizontally scrollable image gallery with fallback images

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { fadeInUp, slideLeft } from '../../ActiveTrip/variants';
import styles from './ImagesCarousel.module.css';

// Fallback images when no images are provided
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1549144511-f099e773c147?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=300&fit=crop"
];

const ImagesCarousel = ({ 
  images = [], 
  title = "Images" 
}) => {
  const displayImages = images.length > 0 ? images : FALLBACK_IMAGES;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex(prev => 
      prev === 0 ? displayImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex(prev => 
      prev === displayImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      handlePrevious();
    } else if (event.key === 'ArrowRight') {
      handleNext();
    }
  };

  return (
    <motion.div 
      className={styles.container}
      variants={fadeInUp}
    >
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Images size={20} />
          <h3 className={styles.title}>Images</h3>
        </div>
        <div className={styles.indicators}>
          {displayImages.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${index === currentIndex ? styles.indicatorActive : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`View image ${index + 1}`}
              type="button"
            />
          ))}
        </div>
      </div>

      <div 
        className={styles.carouselContainer}
        onKeyDown={handleKeyDown}
        tabIndex="0"
        role="region"
        aria-label="Image gallery"
      >
        {displayImages.length > 1 && (
          <>
            <button
              className={`${styles.navButton} ${styles.navLeft}`}
              onClick={handlePrevious}
              aria-label="Previous image"
              type="button"
            >
              <ChevronLeft size={20} />
            </button>
            
            <button
              className={`${styles.navButton} ${styles.navRight}`}
              onClick={handleNext}
              aria-label="Next image"
              type="button"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        <div className={styles.imageWrapper}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={currentIndex}
              src={displayImages[currentIndex]}
              alt={`${title} - Image ${currentIndex + 1}`}
              className={styles.image}
              variants={slideLeft}
              initial="initial"
              animate="animate"
              exit="exit"
              loading="lazy"
            />
          </AnimatePresence>
        </div>

        <div className={styles.imageCounter}>
          {currentIndex + 1} / {displayImages.length}
        </div>
      </div>
    </motion.div>
  );
};

export default ImagesCarousel;