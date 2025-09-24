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
import { useBudgetContext } from "../../services/BudgetServices/BudgetContextProvider";
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
  const { getYearlyBudgetUsedAmount, getYearlyBudget} = useBudgetContext()
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  // State for planned trips only
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [loadingTrips, setLoadingTrips] = useState(true);
  const [ placesVisited, setPlacesVisited ] = useState(0)
  const [ remaining, setRemaining] = useState(0)
  const [trip, setTrip ] = useState(null) 
 
   // Backend API integration: Load planned trips when component mounts
  useEffect(() => {
    if (user) {
      loadPlannedTrips();
    }
  }, [user]);
  
  useEffect(()=>{
     const fetchAll = async()=>{
         const userTrips = await getUserTrips()
         getCompletedTrips(userTrips);
         const latestTrip = getLatestTrip(userTrips);
         setTrip(latestTrip)
         // yearly 
         const yearlyBudget = await getYearlyBudget()
         const usedBudget = await getYearlyBudgetUsedAmount(yearlyBudget[0].id)
         setRemaining(yearlyBudget[0].total - usedBudget)
         
     }
     
     fetchAll();
  },[])
 
 
  // Backend API call: Load user's planned trips
  const loadPlannedTrips = async () => {
    setLoadingTrips(true);
    
    try {
      const trips = await getUserTrips(); // API call to backend
      setUpcomingTrips(trips);
    } catch (error) {
      console.error('Failed to load trips:', error);
    } finally {
      setLoadingTrips(false);
    }
  };
  
  
  const getCompletedTrips = async(trips)=>{
      let counter = 0;
      trips.forEach(trip => trip.status == "completed" && counter ++)
      setPlacesVisited(counter)
      return counter
  }
  
  
  function getLatestTrip(trips) {
     if (!Array.isArray(trips) || trips.length === 0) {
     return null;
    }

    trips.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return trips[0];
   }
  
  
  

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
            value="Coming Soon"
            index={1}
          />
          <OverviewCard
            icon={<Building size={28} color="var(--primary)" />}
            title="Places Visited"
            value={placesVisited}
            index={2}
          />
          <OverviewCard
            icon={<CreditCard size={28} color="var(--primary)" />}
            title="Budget Remaining"
            value={`$${remaining} Left`}
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
        
         {/*  
          <div className={styles.widgetCard}>
            <MapWidget />
          </div>
         */}
         
          <div className={styles.widgetCard}>
            <AIRecommendations recommendations={MOCK_AI_RECOMMENDATIONS} />
          </div>
          <div className={styles.widgetCard}>
            <TripProgress progress={65} trip={trip}/>
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