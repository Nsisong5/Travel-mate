// src/components/TripProgress/TripProgress.jsx
// Main Trip Progress wrapper component - handles active trip selection and props distribution
// TODO: Replace MOCK_TRIP with actual trip prop or getActiveTrip() service call

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TripHero from './TripHero/TripHero';
import ProgressBar from './ProgressBar/ProgressBar';
import QuickStats from './QuickStats/QuickStats';
import RecommendationsCarousel from './RecommendationsCarousel/RecommendationsCarousel';
import { fadeInUp } from './variants';
import styles from './TripProgress.module.css';
import { useNavigate } from "react-router-dom"
import { useTripServices }  from "../../../services/TripServices/TripServices"
// Example trip data structure for reference
const MOCK_TRIP = {
  id: 123,
  title: "Paris Getaway",
  destination: "Paris, France",
  start_date: "2025-09-20",
  end_date: "2025-09-28",
  images: [
    "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800",
    "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800"
  ],
  travelers: 3,
  flight_status: "confirmed",
  hotel_status: "pending",
  progress_planned: 65,
  recommendations: [
    {
      id: 1,
      title: "Eiffel Tower Night View",
      description: "Best views after sunset",
      image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400",
      tags: ["🌙", "landmark"]
    },
    {
      id: 2,
      title: "Local Cafés",
      description: "Authentic Parisian coffee culture",
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400",
      tags: ["☕", "local"]
    },
    {
      id: 3,
      title: "Seine River Cruise",
      description: "Scenic waterway tour",
      image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400",
      tags: ["🚤", "scenic"]
    }
  ]
};

const TripProgress = ({ 
  trip, 
  getActiveTrip, 
  tripDetailRoute,
  editRoute,
  discoverRoute = '/discover',
  className = ''

}) => {
  const { getTrip } = useTripServices()
  const [activeTrip, setActiveTrip] = useState(trip || null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // If no trip prop provided, attempt to get active trip via callback
    if (!trip && getActiveTrip && typeof getActiveTrip === 'function') {
      setLoading(true);
      try {
        const fetchedTrip = getActiveTrip();
        // Handle both sync and async results
        if (fetchedTrip && typeof fetchedTrip.then === 'function') {
          fetchedTrip.then(setActiveTrip).finally(() => setLoading(false));
        } else {
          setActiveTrip(fetchedTrip || MOCK_TRIP);
          setLoading(false);
        }
      } catch (error) {
        console.warn('Failed to fetch active trip:', error);
        setActiveTrip(MOCK_TRIP); // Fallback to mock for demo
        setLoading(false);
      }
    } else if (trip) {
      setActiveTrip(trip);
    } else {
      // No trip data available, use mock for demo purposes
      setActiveTrip(MOCK_TRIP);
    }
  }, [trip, getActiveTrip]);
  
  
  
  


  if (loading) {
    return (
      <div className={`${styles.container} ${className}`}>
        <div className={styles.loading}>Loading your trip...</div>
      </div>
    );
  }
 
  
  
  const currentTrip = activeTrip || {};

  return (
    <motion.section 
      className={`${styles.container} ${className}`}
      variants={fadeInUp}
      initial="hidden"
      animate="show"
      aria-label="Trip Progress"
    >
      <div className={styles.header}>
        <h2 className={styles.title}>TRIP PROGRESS</h2>
      </div>

      <div className={styles.layout}>
        <div className={styles.leftColumn}>
          <TripHero 
            trip={currentTrip}
            tripDetailRoute={tripDetailRoute}
          />
          <ProgressBar trip={currentTrip} />
          <QuickStats trip={currentTrip} />
        </div>

        <div className={styles.rightColumn}>
          <RecommendationsCarousel 
            recommendations={currentTrip.recommendations}
            discoverRoute={discoverRoute}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <motion.a
         
          className={`${styles.actionButton} ${styles.primary}`}
          variants={fadeInUp}
          whileHover="hover"
          whileTap="tap"
          aria-label="View full trip itinerary"
          onClick={()=>(navigate(`/active/${trip.id}`))}
        >
          View Full Itinerary
        </motion.a>
      </div>
    </motion.section>
  );
};

export default TripProgress;