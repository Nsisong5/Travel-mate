import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Car, Bus, Plane } from "lucide-react";
import DashboardLayout from "../Dashboard/DashboardLayout";
import styles from "./TripDetailPage.module.css";
import { useParams } from "react-router-dom"
// Find mockTrip using params for demo only
import { mockTrips } from "./TripHistoryPage"; // or pass as prop/context if split

const typeIcon = {
  car: <Car size={34} />,
  bus: <Bus size={34} />,
  plane: <Plane size={34} />
};

export default function TripDetailPage() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const trip = mockTrips.find(t => t.id === tripId);

  if (!trip) {
    return (
      <DashboardLayout>
        <div className={styles.notFound}>Trip not found.</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className={styles.wrapper}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          ← Back to Trips
        </button>
        <div className={styles.card}>
          <div className={styles.iconBox}>{typeIcon[trip.type]}</div>
          <div className={styles.info}>
            <h2 className={styles.route}>{trip.origin} → {trip.destination}</h2>
            <div className={styles.meta}>
              <span className={styles.metaLabel}>Date: <b>{trip.date}</b></span>
              <span className={styles.metaLabel}>Duration: <b>{trip.duration}</b></span>
              <span className={`${styles.status} ${styles[trip.status.toLowerCase()]}`}>
                {trip.status}
              </span>
            </div>
            <div className={styles.costBox}>
              <span className={styles.costLabel}>Cost</span>
              <span className={styles.cost}>{trip.cost}</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
