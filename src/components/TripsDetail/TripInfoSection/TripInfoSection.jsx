import React from "react";
import { Calendar, Clock, MapPin, DollarSign } from "lucide-react";
import styles from "./TripInfoSection.module.css";

export default function TripInfoSection({ trip }) {
  return (
    <section className={styles.infoSection} aria-label="Trip Details">
      <div className={styles.row}>
        <span className={styles.icon}><Calendar size={19} /></span>
        <span className={styles.label}>Date</span>
        <span className={styles.value}>{trip.date}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.icon}><Clock size={19} /></span>
        <span className={styles.label}>Duration</span>
        <span className={styles.value}>{trip.duration}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.icon}><MapPin size={19} /></span>
        <span className={styles.label}>Destination</span>
        <span className={styles.value}>{trip.destination}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.icon}><DollarSign size={19} /></span>
        <span className={styles.label}>Cost</span>
        <span className={styles.value}>{trip.cost}</span>
      </div>
    </section>
  );
}
