import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../Dashboard/DashboardLayout";
import SearchInput from "./SearchInput/SearchInput";
import FilterDropdown from "./FilterDropdown/FilterDropdown";
import TripCard from "./TripCard/TripCard";
import LoadMoreButton from "./LoadMoreButton/LoadMoreButton";
import EmptyStateMessage from "./EmptyStateMessage/EmptyStateMessage";

import styles from "./TripHistoryPage.module.css";
import { useTripServices } from "../../services/TripServices/TripServices";
import { AuthContext } from "../../AuthProvider";

export default function TripHistoryPage() {
  const { tripFilter} = useParams();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [visible, setVisible] = useState(6);
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState(null);

  const { getUserTrips, deleteTrip} = useTripServices();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await getUserTrips();
        if (tripFilter) {
          setTrips(response.filter(trip => trip.status.toLowerCase() === "planned"));
        } else {
          setTrips(response);
        }
      } catch (err) {
        setError("Failed to fetch trips. Please try again later.");
        console.error(err);
      }
    };
    fetchTrips();
  }, [tripFilter]);

  // Filtering logic
  const filteredTripsUnpaged = trips.filter(
    trip =>
      (filter === "All" || trip.status.toLowerCase() === filter.toLowerCase()) &&
      (trip.origin.toLowerCase().includes(search.toLowerCase()) ||
        trip.destination.toLowerCase().includes(search.toLowerCase()))
  );


  const filteredTrips = filteredTripsUnpaged.slice(0, visible);

  // Show Load More only if we have more trips available after current visible count
  const showLoadMore =
    filteredTripsUnpaged.length > visible && visible >= 5;

  const loadMore = () => setVisible(v => v + 6);

  // Handler for Create New Trip
  const handleCreateNewTrip = () => {
    navigate("/onboarding");
  };

  return (
    <DashboardLayout>
      <div className={styles.wrapper}>
        <div className={styles.topControls}>
          <SearchInput value={search} onChange={setSearch} />
          <FilterDropdown value={filter} onChange={setFilter} plannedPage={tripFilter} />
        </div>

        {error && (
          <div role="alert" className={styles.errorMessage}>
            {error}
          </div>
        )}

        {!error && filteredTripsUnpaged.length === 0 ? (
          // Show empty state only if there are no trips available overall for this filter
          <EmptyStateMessage onCreateNewTrip={handleCreateNewTrip} />
        ) : (
          <>
            <div className={styles.tripList}>
              {filteredTrips.map(trip => (
                <TripCard key={trip.id} trip={trip} onClick={() => navigate(`/trips/${trip.id}`)} deleteTrip={deleteTrip} trips={trips} setTrips={setTrips}/>
              ))}
            </div>
            {showLoadMore && <LoadMoreButton onClick={loadMore} />}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
