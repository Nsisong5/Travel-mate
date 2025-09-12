import React, { useState, useRef, useEffect, useContext } from "react";
import { Helmet } from "react-helmet"
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "../../ThemeContext";
import { fadeInUp, staggerUp } from "./variants";
import styles from "./DBLayout.module.css";
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
import TopDestinationsCard from "./TopDestinationsCard/TopDestinationsCard"
import { AuthContext } from "../../AuthProvider";
import { useTripServices } from "../../services/TripServices/TripServices";
import { useNavigate } from "react-router-dom";

// Mock data for components - TODO: Replace with actual API calls
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
  const { getUserTrips } = useTripServices(); // Backend API integration
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  // State for planned trips only
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [loadingTrips, setLoadingTrips] = useState(true);

  // Backend API integration: Load planned trips when component mounts
  useEffect(() => {
    if (user) {
      loadPlannedTrips();
    }
  }, [user]);
 
  // Backend API call: Load user's planned trips
  const loadPlannedTrips = async () => {
    setLoadingTrips(true);
    
    try {
      console.log("Loading planned trips for user:", user?.email);
      const trips = await getUserTrips(); // API call to backend
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
     <Helmet> 
       <meta  
        name="viewport"
        content="width=device-width, initial-scale=1.0"/>
     </Helmet>
     
      {/* Main dashboard container with theme-aware styling */}
     <div className={styles.dashboardContainer} data-theme={theme}>
        
        {/* Overview Cards Section - Mobile-first responsive grid */}
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
            url="/upcoming/filter"
            
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
            url="/y_budget"
            index={3}
          />
        </motion.section>

        {/* Middle Section - Map, AI Recommendations, Trip Progress */}
        <motion.section
          className={styles.middleSection}
          variants={staggerUp}
          initial="hidden"
          animate="show"
        >
          <div className={styles.widgetCard}>
            <MapWidget />
          </div>
          <div className={styles.widgetCard}>
            <AIRecommendations recommendations={MOCK_AI_RECOMMENDATIONS} />
          </div>
          <div className={styles.widgetCard}>
            <TripProgress progress={65} />
          </div>
        </motion.section>

        {/* Bottom Section - Recent Trips Table and Top Destinations Chart */}
        <motion.section
          className={styles.bottomSection}
          variants={staggerUp}
          initial="hidden"
          animate="show"
        >
          <div className={styles.tableCard}>
            <RecentTripsTable trips={MOCK_RECENT_TRIPS} />
          </div>
          <div className={styles.chartCard}>
            <TopDestinationsCard data={MOCK_TOP_DESTINATIONS} />
          </div>
        </motion.section>

      </div>
    </DashboardLayout>
  );
}