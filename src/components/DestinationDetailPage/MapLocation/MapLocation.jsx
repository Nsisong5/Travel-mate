import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import styles from '../DestinationDetailPage.module.css';

const MapLocation = ({ name, coordinates }) => {
  const handleViewOnMaps = () => {
    // Open in Google Maps or Apple Maps
    const url = `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className={styles.mapSection}>
      <motion.h2 
        className={styles.sectionTitle}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        Location
      </motion.h2>

      <motion.div
        className={styles.mapContainer}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {/* Static Map Preview - TODO: Replace with interactive map */}
        <div className={styles.mapPlaceholder}>
          <div className={styles.mapIcon}>
            <MapPin size={48} />
          </div>
          <h3 className={styles.mapTitle}>{name}</h3>
          <p className={styles.mapCoordinates}>
            {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
          </p>
          
          <motion.button
            className={styles.viewOnMapsButton}
            onClick={handleViewOnMaps}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Navigation size={16} />
            <span>View on Maps</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default MapLocation;