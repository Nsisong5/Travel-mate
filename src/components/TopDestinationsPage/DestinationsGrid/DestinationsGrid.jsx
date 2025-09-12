import React from 'react';
import { motion } from 'framer-motion';
import DestinationCard from '../DestinationCard/DestinationCard';
import styles from '../TopDestinationsPage.module.css';

const DestinationsGrid = ({ destinations, onPlanTrip, onViewMore }) => {
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

  return (
    <motion.section
      className={styles.destinationsSection}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className={styles.destinationsGrid}
        layout
      >
        {destinations.map((destination, index) => (
          <DestinationCard
            key={destination.id}
            destination={destination}
            index={index}
            onPlanTrip={onPlanTrip}
            onViewMore={onViewMore}
          />
        ))}
      </motion.div>
    </motion.section>
  );
};

export default DestinationsGrid;