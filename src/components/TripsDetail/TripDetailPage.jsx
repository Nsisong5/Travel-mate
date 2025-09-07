import React from "react";
import TripDetailHeader from "./TripDetailHeader/TripDetailHeader";
import TripSummaryCard from "./TripSummaryCard/TripSummaryCard";
import TripInfoSection from "./TripInfoSection/TripInfoSection";
import TripActions from "./TripActions/TripActions";
import styles from "./TripDetailPage.module.css";

// Mock trip data
const mockTrip = {
  id: 1,
  type: "plane", // plane | bus | car
  origin: "Abuja",
  destination: "London",
  status: "Completed", // Completed | Canceled | Ongoing
  date: "02 Aug 2025",
  duration: "6h 45m",
  cost: "₦220,000"
};

export default function TripDetailPage() {
  return (
    <div className={styles.page}>
      <TripDetailHeader />
      <main className={styles.main}>
        <TripSummaryCard trip={mockTrip} />
        <TripInfoSection trip={mockTrip} />
        <TripActions />
      </main>
    </div>
  );
}
