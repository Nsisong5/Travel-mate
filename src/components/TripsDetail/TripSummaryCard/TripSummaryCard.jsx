import React from "react";
import { Car, Bus, Plane, CheckCircle, XCircle, Loader2 } from "lucide-react";
import styles from "./TripSummaryCard.module.css";

const typeIcon = {
  car: <Car size={32} />,
  bus: <Bus size={32} />,
  plane: <Plane size={32} />
};

const statusIcon = {
  Completed: <CheckCircle size={15} />,
  Canceled: <XCircle size={15} />,
  Ongoing: <Loader2 size={15} />
};

export default function TripSummaryCard({ trip }) {
  return (
    <article className={styles.card}>
      <div className={styles.icon}>{typeIcon[trip.type]}</div>
      <div className={styles.route}>
        <span className={styles.origin}>{trip.origin}</span>
        <span className={styles.arrow}>→</span>
        <span className={styles.destination}>{trip.destination}</span>
      </div>
      <span className={`${styles.status} ${styles[trip.status.toLowerCase()]}`}>
        {statusIcon[trip.status]} {trip.status}
      </span>
    </article>
  );
}
