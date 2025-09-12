import React from "react";
import { motion } from "framer-motion";
import styles from "./TopDestinationsChart.module.css";
import { fadeInUp, hoverCard } from "../variants";
import { useNavigate } from "react-router-dom"

export default function TopDestinationsChart({ data }) {
  const maxTrips = Math.max(...data.map(d => d.trips));
  const navigate = useNavigate();
  return (
    <motion.section
      className={styles.chartCard}
      variants={fadeInUp}
      whileHover="hoverCard"
      whileTap={{ scale: 0.99 }}
      tabIndex={0}
      aria-label="Top destinations chart"
      onClick={()=>(navigate("/top-destinations"))}
    >
      <h2 className={styles.title}>Top Destinations</h2>
      <ul className={styles.barList}>
        {data.map(({ city, trips }) => {
          const heightPercent = (trips / maxTrips) * 100;
          return (
            <li key={city} className={styles.barItem}>
              <div
                className={styles.bar}
                style={{ height: `${heightPercent}%` }}
                aria-label={`${city}: ${trips} trips`}
              ></div>
              <span className={styles.cityLabel}>{city}</span>
            </li>
          );
        })}
      </ul>
    </motion.section>
  );
}
