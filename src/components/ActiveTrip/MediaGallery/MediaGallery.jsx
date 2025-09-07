// src/pages/TripDetailPage/Media/MediaGallery.jsx
// Image gallery with modal lightbox and upload functionality

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Images, X, ChevronLeft, ChevronRight, Upload, Plus } from 'lucide-react';
import { fadeInUp, modal } from '../variants';
import styles from './MediaGallery.module.css';

const MediaGallery = ({ images = [] }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (index) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedIndex(null);
  };

  const handlePrevious = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    } else {
      setSelectedIndex(images.length - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex < images.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    } else {
      setSelectedIndex(0);
    }
  };

  const handleKeyDown = (event) => {
    if (!isModalOpen) return;

    switch (event.key) {
      case 'Escape':
        handleCloseModal();
        break;
      case 'ArrowLeft':
        handlePrevious();
        break;
      case 'ArrowRight':
        handleNext();
        break;
      default:
        break;
    }
  };

  const handleUpload = async (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // TODO: Implement image upload
    // const formData = new FormData();
    // for (let file of files) {
    //   formData.append('images', file);
    // }
    // await api.post(`/trips/${tripId}/images`, formData, {
    //   headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
    // });
    
    console.log('Upload files:', files);
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, selectedIndex]);

  if (images.length === 0) {
    return (
      <motion.div 
        className={styles.emptyState}
        variants={fadeInUp}
      >
        <div className={styles.emptyIcon}>
          <Images size={48} />
        </div>
        <h3 className={styles.emptyTitle}>No photos yet</h3>
        <p className={styles.emptyDescription}>
          Upload photos to capture your travel memories.
        </p>
        <label className={styles.uploadButton}>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            className={styles.fileInput}
          />
          <Upload size={16} />
          Upload Photos
        </label>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className={styles.container}
      variants={fadeInUp}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>
          <Images size={20} />
          Photos ({images.length})
        </h3>
        <label className={styles.addButton}>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleUpload}
            className={styles.fileInput}
          />
          <Plus size={16} />
        </label>
      </div>

      <div className={styles.gallery}>
        {images.slice(0, 6).map((image, index) => (
          <div
            key={index}
            className={`${styles.imageContainer} ${index >= 4 ? styles.small : ''}`}
            onClick={() => handleImageClick(index)}
            role="button"
            tabIndex="0"
            onKeyDown={(e) => e.key === 'Enter' && handleImageClick(index)}
            aria-label={`View image ${index + 1}`}
          >
            <img src={image} alt={`Trip photo ${index + 1}`} loading="lazy" />
            {index === 5 && images.length > 6 && (
              <div className={styles.moreOverlay}>
                <span>+{images.length - 6}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {isModalOpen && selectedIndex !== null && (
          <motion.div
            className={styles.modal}
            variants={modal}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={handleCloseModal}
          >
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <button
                className={styles.closeButton}
                onClick={handleCloseModal}
                aria-label="Close gallery"
                type="button"
              >
                <X size={24} />
              </button>

              {images.length > 1 && (
                <>
                  <button
                    className={`${styles.navButton} ${styles.navLeft}`}
                    onClick={handlePrevious}
                    aria-label="Previous image"
                    type="button"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  
                  <button
                    className={`${styles.navButton} ${styles.navRight}`}
                    onClick={handleNext}
                    aria-label="Next image"
                    type="button"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              <div className={styles.imageWrapper}>
                <img 
                  src={images[selectedIndex]} 
                  alt={`Trip photo ${selectedIndex + 1}`}
                  className={styles.modalImage}
                />
              </div>

              <div className={styles.imageCounter}>
                {selectedIndex + 1} / {images.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MediaGallery;