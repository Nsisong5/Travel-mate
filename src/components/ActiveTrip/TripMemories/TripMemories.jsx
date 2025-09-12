// src/components/TripMemories/TripMemories.jsx
// Placeholder component for trip photos/memories section
// TODO: Replace with full photo gallery functionality when backend is ready

import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, Image } from 'lucide-react';
import { fadeInUp } from '../variants';
import styles from './TripMemories.module.css';

const TripMemories = ({ className = "" }) => {
  return (
    <motion.section 
      className={`${styles.container} ${className}`}
      variants={fadeInUp}
      initial="initial"
      animate="animate"
    >
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <Camera size={20} className={styles.titleIcon} />
          <h3 className={styles.title}>Trip Memories</h3>
        </div>
      </div>

      <div className={styles.placeholderContent}>
        <div className={styles.placeholderIcon}>
          <Image size={48} />
        </div>
        <h4 className={styles.placeholderTitle}>Coming Soon</h4>
        <p className={styles.placeholderDescription}>
          Save and view your travel photos here. Photo gallery functionality will be available soon.
        </p>
        
        <div className={styles.featurePreview}>
          <div className={styles.previewItem}>
            <Upload size={16} />
            <span>Upload Photos</span>
          </div>
          <div className={styles.previewItem}>
            <Image size={16} />
            <span>View Gallery</span>
          </div>
          <div className={styles.previewItem}>
            <Camera size={16} />
            <span>Trip Timeline</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default TripMemories;