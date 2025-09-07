import React from "react";
import { Car, Bus, Plane, ChevronRight } from "lucide-react";
import styles from "./TripCard.module.css";

const typeIcon = {
  car: <Car size={26} />,
  bus: <Bus size={26} />,
  plane: <Plane size={26} />
};

export default function TripCard({ trip, onClick }) {
  return (
    <div className={styles.card} onClick={onClick} tabIndex={0} role="button">
      <div className={styles.iconBox}>{typeIcon[trip.type] || <Plane size={26} />}</div>
      <div className={styles.info}>
        <div className={styles.route}>
          <span className={styles.origin}>{trip.origin}</span>
          <span className={styles.arrow}>→</span>
          <span className={styles.destination}>{trip.destination}</span>
        </div>
        <div className={styles.meta}>
          <span className={styles.date}>{trip.date}</span>
          <span className={`${styles.status} ${styles[trip.status.toLowerCase()]}`}>
            {trip.status}
          </span>
        </div>
      </div>
      <div className={styles.side}>
        <span className={styles.cost}>{trip.cost}</span>
        <ChevronRight size={22} className={styles.chevron} />
      </div>
    </div>
  );
}
