// src/pages/TripDetailPage/TripDetailPage.jsx
// Updated Trip Detail Page with TravelTips and TripMemories components
// TODO: Connect to real trip API and auth context

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './Header/Header';
import Hero from './Hero/Hero';
import TripProgressPanel from './TripProgressPanel/TripProgressPanel';
import ItineraryList from './ItineraryList/ItineraryList';
import RecommendationsCarousel from './RecommendationsCarousel/RecommendationsCarousel';
import ActionBar from './ActionBar/ActionBar';
import ConfirmModal from './ConfirmModal';
import { fadeInUp, staggerContainer } from './variants';
import styles from './TripDetailPage.module.css';
import TravelTips from './TravelTips/TravelTips';
import TripMemories from './TripMemories/TripMemories';

// Mock trip data for development
const MOCK_TRIP = {
  id: 123,
  title: "Paris — Summer Getaway",
  destination: "Paris, France",
  start_date: "2025-09-10",
  end_date: "2025-09-17",
  status: "active",
  cover_image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=1200&h=600&fit=crop",
  images: [
    "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=450&fit=crop",
    "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&h=450&fit=crop",
    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=450&fit=crop"
  ],
  itinerary: [
    { 
      day: 1, 
      title: "Arrival & Explore", 
      items: [
        { time: "10:00", title: "Check in hotel", location: "Hotel de Crillon" },
        { time: "19:00", title: "Welcome dinner", location: "Le Comptoir" }
      ] 
    },
    { 
      day: 2, 
      title: "Museums & Sights", 
      items: [
        { time: "09:00", title: "Visit Louvre", location: "Louvre Museum" },
        { time: "14:00", title: "Eiffel Tower tour", location: "Eiffel Tower" }
      ] 
    }
  ],
  budget: 1500,
  cost_estimated: true,
  progress_percent: 42,
  days_left: 4,
  recommendation_ids: [1, 2, 3]
};

const TripDetailPage = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEndTripModal, setShowEndTripModal] = useState(false);

  // TODO: Get theme from ThemeContext
  // const { theme } = useTheme();

  useEffect(() => {
    fetchTripDetails();
  }, [tripId]);

  const fetchTripDetails = async () => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual API call
      // const response = await api.get(`/trips/${tripId}`, {
      //   headers: { Authorization: `Bearer ${authToken}` }
      // });
      // Expected response: { id, title, start_date, end_date, cover_image, images, itinerary, budget, cost_estimated, progress_percent, days_left }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setTrip(MOCK_TRIP);
    } catch (err) {
      console.error('Failed to fetch trip details:', err);
      setError('Failed to load trip details');
    } finally {
      setLoading(false);
    }
  };

  const handleEditTrip = () => {
    // TODO: Navigate to edit page or open edit modal
    navigate(`/trips/${tripId}/edit`);
  };

  const handleShareTrip = async () => {
    // TODO: Implement share functionality
    if (navigator.share) {
      try {
        await navigator.share({
          title: trip.title,
          text: `Check out my trip to ${trip.destination}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // TODO: Show toast notification
    }
  };
  
  const handleBudget = ()=>{
     navigate("/budget")
  }

  const handleEndTrip = async () => {
    try {
      // TODO: API call to end/complete trip
      // await api.patch(`/trips/${tripId}`, { status: 'completed' }, {
      //   headers: { Authorization: `Bearer ${authToken}` }
      // });
      
      setShowEndTripModal(false);
      // TODO: Show success notification
      navigate('/trips');
    } catch (err) {
      console.error('Failed to end trip:', err);
      // TODO: Show error notification
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.skeleton} />
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className={styles.errorContainer}>
        <h2>Trip not found</h2>
        <p>{error || 'This trip could not be loaded.'}</p>
        <button onClick={() => navigate('/trips')} className={styles.backButton}>
          Back to trips
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      className={styles.container}
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <Header 
        trip={trip}
        onShare={handleShareTrip}
      />
      
      <motion.main variants={fadeInUp}>
        <Hero trip={trip} />
        
        <div className={styles.content}>
          <div className={styles.leftColumn}>
            <TripProgressPanel trip={trip} />
            <ItineraryList trip={trip} />
          </div>
          
          <div className={styles.rightColumn}>
            <RecommendationsCarousel tripId={trip.id} />
            <TripMemories />
          </div>
        </div>

        {/* Travel Tips Section - positioned after main content */}
        <div className={styles.fullWidthSection}>
          <TravelTips destination={trip.destination} />
        </div>
      </motion.main>

      <ActionBar 
        onBudget={handleBudget}
        onEdit={handleEditTrip}
        onShare={handleShareTrip}
        onEndTrip={() => setShowEndTripModal(true)}
      />

      <ConfirmModal
        isOpen={showEndTripModal}
        onClose={() => setShowEndTripModal(false)}
        onConfirm={handleEndTrip}
        title="End Trip"
        message="Are you sure you want to end this trip? This action cannot be undone."
        confirmLabel="End Trip"
        cancelLabel="Cancel"
      />
    </motion.div>
  );
};

export default TripDetailPage;