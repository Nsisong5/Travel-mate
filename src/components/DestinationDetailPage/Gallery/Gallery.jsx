import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import styles from '../DestinationDetailPage.module.css';

const Gallery = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setSelectedImage(images[index]);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % images.length 
      : (currentIndex - 1 + images.length) % images.length;
    
    setCurrentIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 20
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className={styles.gallerySection}>
      <motion.h2 
        className={styles.sectionTitle}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Gallery
      </motion.h2>

      <motion.div
        className={styles.galleryGrid}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            className={styles.galleryItem}
            variants={imageVariants}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openLightbox(index)}
          >
            <div 
              className={styles.galleryImage}
              style={{ backgroundImage: `url(${image})` }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className={styles.lightboxOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <motion.div
              className={styles.lightboxContent}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className={styles.lightboxClose}
                onClick={closeLightbox}
              >
                <X size={24} />
              </button>

              <img 
                src={selectedImage} 
                alt={`Gallery image ${currentIndex + 1}`}
                className={styles.lightboxImage}
              />

              <button 
                className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
                onClick={() => navigateImage('prev')}
              >
                <ChevronLeft size={24} />
              </button>

              <button 
                className={`${styles.lightboxNav} ${styles.lightboxNext}`}
                onClick={() => navigateImage('next')}
              >
                <ChevronRight size={24} />
              </button>

              <div className={styles.lightboxCounter}>
                {currentIndex + 1} of {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;