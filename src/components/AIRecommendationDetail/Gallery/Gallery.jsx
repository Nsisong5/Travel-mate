import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Gallery.module.css";
import { fadeInUp } from "../../Onboarding/motion";

export default function Gallery({ images }) {
  const [expanded, setExpanded] = useState(false);
  const validImages = images.filter(Boolean);

  return (
    <section className={styles.gallerySection} aria-label="Gallery">
      <div className={styles.grid}>
        {validImages.map((src, idx) => (
          <motion.div
            key={idx}
            className={styles.imageWrapper}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <img src={src} alt={`Gallery image ${idx + 1}`} className={styles.image} loading="lazy" />
          </motion.div>
        ))}
      </div>
      {!expanded && validImages.length > 0 && (
        <motion.button
          className={styles.expandBtn}
          onClick={() => setExpanded(true)}
          type="button"
          aria-label="See more images"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          See More Images
        </motion.button>
      )}
      {expanded && (
        <GalleryModal images={validImages} onClose={() => setExpanded(false)} />
      )}
    </section>
  );
}

// Simple modal with overlay and horizontal scroll
function GalleryModal({ images, onClose }) {
  return (
    <motion.div
      className={styles.modalOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      aria-modal="true"
      role="dialog"
      tabIndex={-1}
      onClick={onClose}
    >
      <motion.div
        className={styles.modalContent}
        initial={{ scale: 0.85 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.85 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.modalCloseBtn}
          onClick={onClose}
          aria-label="Close gallery"
        >
          ✕
        </button>
        <div className={styles.modalGallery}>
          {images.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Gallery image ${idx + 1}`}
              className={styles.modalImage}
              loading="lazy"
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
