import React from "react";
import { motion } from "framer-motion";
import styles from "./DestinationsPreview.module.css";
import tokyo from "../../../../public/tokyo.jpeg"
import newYork from "../../../../public/new-york.jpeg"
import sydney from "../../../../public/sydney.jpeg"
import rome from "../../../../public/rome.jpeg"
import paris from "../../../../public/paris.jpeg"


const destinations = [
  { id: 1, title: "Paris", image: paris },
  { id: 2, title: "Tokyo", image: tokyo},
  { id: 3, title: "New York City", image: newYork},
  { id: 4, title: "Sydney", image: sydney},
  { id: 5, title: "Rome", image: rome}
];

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.15 } }
};

export default function DestinationsPreview() {
  return (
    <motion.section
      className={styles.destinations}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      aria-label="Destinations preview"
      variants={fadeInUp}
    >
      <div className={styles.grid}>
        {destinations.map(({ id, title, image }) => (
          <motion.article key={id} className={styles.card} whileHover={{ scale: 1.05 }} tabIndex={0}>
            <img src={image} alt={title} className={styles.image} />
            <h3 className={styles.title}>{title}</h3>
          </motion.article>
        ))}
      </div>
      <button className={styles.exploreBtn} type="button">Explore More Destinations</button>
    </motion.section>
  );
}
