import React, { useState, useRef, useEffect, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "../../ThemeContext";
import { fadeInUp, staggerUp } from "./variants";
import styles from "./DashboardLayout.module.css";
import "./theme-vars.css";
import { MapPin, Building, CreditCard } from "lucide-react";
import Sidebar from "./Sidebar/Sidebar";
import OverviewCard from "./OverviewCard/OverviewCard";
import MapWidget from "./MapWidget/MapWidget";
import AIRecommendations from "./AIRecommendations/AIRecommendations";
import TripProgress from "./TripProgress/TripProgress";
import RecentTripsTable from "./RecentTripsTable/RecentTripsTable";
import TopDestinationsChart from "./TopDestinationsChart/TopDestinationsChart";
import DashboardLayout from "./DashboardLayout";
import { AuthContext } from "../../AuthProvider";
import { useTripServices } from "../../services/TripServices/TripServices";
import { useNavigate } from "react-router-dom"

const MOCK_RECENT_TRIPS = [
  { date: "2025-07-30", destination: "Paris", duration: "5 days", cost: "$1500", status: "Completed" },
  { date: "2025-08-12", destination: "New York", duration: "7 days", cost: "$2100", status: "Upcoming" },
  { date: "2025-09-01", destination: "Tokyo", duration: "9 days", cost: "$3500", status: "Planned" },
  { date: "2025-09-20", destination: "Sydney", duration: "10 days", cost: "$4000", status: "Upcoming" }
];

const MOCK_AI_RECOMMENDATIONS = [
  { id: 1, name: "Bali", description: "Tropical paradise with sunsets" },
  { id: 2, name: "Reykjavik", description: "Northern lights & volcanic landscapes" },
  { id: 3, name: "Santorini", description: "Iconic white buildings and blue seas" },
  { id: 4, name: "Lisbon", description: "Historic city with coastal charm" },
  { id: 5, name: "Cape Town", description: "Mountainous landscape meets ocean" }
];

const MOCK_TOP_DESTINATIONS = [
  { city: "Paris", trips: 5 },
  { city: "New York", trips: 3 },
  { city: "Tokyo", trips: 4 },
  { city: "Sydney", trips: 2 },
  { city: "London", trips: 3 },
  { city: "Rome", trips: 1 }
];

export default function DBLayout() {
  const { user } = useContext(AuthContext);
  const { getUserTrips } = useTripServices();
  const navigate = useNavigate();
  
  // State for planned trips only
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [loadingTrips, setLoadingTrips] = useState(true);

  // Load planned trips when component mounts
  useEffect(() => {
    if (user) {
      loadPlannedTrips();
    }
  }, [user]);
 
    const loadPlannedTrips = async () => {
    setLoadingTrips(true);
    
    try {
      console.log("Loading planned trips for user:", user?.email);
      const trips = await getUserTrips();
      setUpcomingTrips(trips);
      console.log("Planned trips:", trips.length);
    } catch (error) {
      console.error('Failed to load trips:', error);
    } finally {
      setLoadingTrips(false);
    }
  };

  return (
      <DashboardLayout>
        <motion.section
          className={styles.overviewGrid}
          variants={staggerUp}
          initial="hidden"
          animate="show"
        >
          <OverviewCard
            icon={<div className={styles.imagePlaceholder} aria-label="Upcoming trips image placeholder" />}
            title="Upcoming Trips"
            value={loadingTrips ? "Loading..." : upcomingTrips.length}
            index={0}
            onClick={()=>navigate("/trips/filter")}
          />
          <OverviewCard
            icon={<MapPin size={28} color="var(--primary)" />}
            title="Distance Traveled"
            value="14,580 km this year"
            index={1}
          />
          <OverviewCard
            icon={<Building size={28} color="var(--primary)" />}
            title="Places Visited"
            value="22 Cities"
            index={2}
          />
          <OverviewCard
            icon={<CreditCard size={28} color="var(--primary)" />}
            title="Budget Remaining"
            value="$2,450 Left"
            index={3}
          />
        </motion.section>
        <motion.section
          className={styles.middleSection}
          variants={staggerUp}
          initial="hidden"
          animate="show"
        >
          <MapWidget />
          <AIRecommendations recommendations={MOCK_AI_RECOMMENDATIONS} />
          <TripProgress progress={65} />
        </motion.section>
        <motion.section
          className={styles.bottomSection}
          variants={staggerUp}
          initial="hidden"
          animate="show"
        >
          <RecentTripsTable trips={MOCK_RECENT_TRIPS} />
          <TopDestinationsChart data={MOCK_TOP_DESTINATIONS} />
        </motion.section>
      </DashboardLayout>
  );
}