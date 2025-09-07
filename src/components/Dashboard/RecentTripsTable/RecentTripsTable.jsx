import React from "react";
import { motion } from "framer-motion";
import styles from "./RecentTripsTable.module.css";
import { fadeInUp, hoverCard } from "../variants";

export default function RecentTripsTable({ trips }) {
  return (
    <motion.section
      className={styles.tableSection}
      variants={fadeInUp}
      whileHover={hoverCard}
      tabIndex={0}
      aria-label="Recent trips table"
    >
      <h2 className={styles.title}>Recent Trips</h2>
      <table className={styles.recentTripsTable}>
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Destination</th>
            <th scope="col">Duration</th>
            <th scope="col">Cost</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {trips.map(({ date, destination, duration, cost, status }, idx) => (
            <tr key={`${destination}-${idx}`} tabIndex={0}>
              <td>{date}</td>
              <td>{destination}</td>
              <td>{duration}</td>
              <td>{cost}</td>
              <td>{status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.section>
  );
}
