import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../Dashboard/DashboardLayout";
import SearchInput from "./SearchInput/SearchInput";
import FilterDropdown from "./FilterDropdown/FilterDropdown";
import TripCard from "./TripCard/TripCard";
import LoadMoreButton from "./LoadMoreButton/LoadMoreButton";
import styles from "./TripHistoryPage.module.css";

// Mock trips data
const mockTrips = [
  {
    id: "1",
    type: "car",
    origin: "Berlin",
    destination: "Munich",
    date: "2025-07-12",
    status: "Completed",
    cost: "$120",
    duration: "6h"
  },
  {
    id: "2",
    type: "plane",
    origin: "London",
    destination: "Paris",
    date: "2025-07-15",
    status: "Ongoing",
    cost: "$220",
    duration: "2h"
  },
  {
    id: "3",
    type: "bus",
    origin: "Madrid",
    destination: "Barcelona",
    date: "2025-05-02",
    status: "Canceled",
    cost: "$55",
    duration: "8h"
  },
  {
    id: "4",
    type: "car",
    origin: "Vienna",
    destination: "Prague",
    date: "2025-06-20",
    status: "Completed",
    cost: "$100",
    duration: "4h"
  },
  {
    id: "5",
    type: "plane",
    origin: "New York",
    destination: "Toronto",
    date: "2025-08-01",
    status: "Completed",
    cost: "$350",
    duration: "1.5h"
  },
  {
    id: "6",
    type: "bus",
    origin: "Rome",
    destination: "Florence",
    date: "2025-08-10",
    status: "Ongoing",
    cost: "$70",
    duration: "3h"
  }
  // Add more trips as needed...
];

export default function TripHistoryPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [visible, setVisible] = useState(6); // Initially show 6 trips
  const navigate = useNavigate();

  // Filtering logic
  const filteredTrips = mockTrips
    .filter(
      trip =>
        (filter === "All" || trip.status === filter) &&
        (trip.origin.toLowerCase().includes(search.toLowerCase()) ||
          trip.destination.toLowerCase().includes(search.toLowerCase()))
    )
    .slice(0, visible);

  const loadMore = () => setVisible(v => v + 6);

  return (
    <DashboardLayout>
      <div className={styles.wrapper}>
        <div className={styles.topControls}>
          <SearchInput value={search} onChange={setSearch} />
          <FilterDropdown value={filter} onChange={setFilter} />
        </div>
        <div className={styles.tripList}>
          {filteredTrips.map(trip => (
            <TripCard key={trip.id} trip={trip} onClick={() => navigate(`/trips/${trip.id}`)} />
          ))}
        </div>
        <LoadMoreButton onClick={loadMore} />
      </div>
    </DashboardLayout>
  );
}
