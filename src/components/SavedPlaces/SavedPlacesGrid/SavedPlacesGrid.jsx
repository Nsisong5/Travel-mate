import React from "react";
import { motion } from "framer-motion";
import SavedPlaceCard from "../SavedPlaceCard/SavedPlaceCard";
import styles from "./SavedPlacesGrid.module.css";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15 } },
};

export default function SavedPlacesGrid({ places, onRemove, onView }) {
  return (
    <motion.section
      className={styles.grid}
      role="list"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {places.map((place) => (
        <SavedPlaceCard
          key={place.id}
          place={place}
          onRemove={onRemove}
          onView={onView}
        />
      ))}
    </motion.section>
  );
}
