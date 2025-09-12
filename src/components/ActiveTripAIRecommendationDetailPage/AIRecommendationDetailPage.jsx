// src/pages/AIRecommendationDetailPage/AIRecommendationDetailPage.jsx
// AI Recommendation Detail Page - Main component orchestrating all sections
// TODO: Connect to real recommendation API and user authentication

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './Header/Header';
import CoverImage from './CoverImage/CoverImage';
import QuickInfoCard from './QuickInfoCard/QuickInfoCard';
import RecommendationDescription from './RecommendationDescription/RecommendationDescription';
import ImagesCarousel from './ImagesCarousel/ImagesCarousel';
import CulturalTips from './CulturalTips/CulturalTips';
import StickyFooterCTA from './StickyFooterCTA/StickyFooterCTA';
import { fadeInUp, staggerContainer } from '../ActiveTrip/variants';
import styles from './AIRecommendationDetailPage.module.css';

// Mock data for development
const MOCK_RECOMMENDATION = {
  id: 'rec-123',
  title: "Hidden Gem: Local Rooftop Café",
  category: "Dining",
  coverImage: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&h=600&fit=crop",
  bestTime: "6PM – 10PM",
  estimatedCost: "$15 – $25",
  location: {
    name: "15 Rue de Rivoli, 1st Arrondissement",
    coordinates: { lat: 48.8566, lng: 2.3522 }
  },
  description: "Locals love this rooftop café for its breathtaking sunset views over the Seine. Perfect for relaxing after exploring the city's historic districts, this intimate spot serves exceptional French pastries and locally-roasted coffee. The atmosphere becomes magical as evening lights begin to twinkle across Paris, making it an ideal spot for reflection and people-watching.",
  images: [
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400&h=300&fit=crop"
  ],
  culturalTips: [
    "Try greeting the staff with 'Bonsoir' (Good Evening)",
    "Dress casual-smart, rooftop may be breezy",
    "Tipping 10% is appreciated but not mandatory",
    "Peak hours are 7-9PM, consider arriving slightly earlier"
  ],
  aiInsight: "AI Recommended for You",
  inItinerary: false,
  destination: "Paris, France"
};

const AIRecommendationDetailPage = () => {
  const { recommendationId } = useParams();
  const navigate = useNavigate();
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInItinerary, setIsInItinerary] = useState(false);

  useEffect(() => {
    fetchRecommendationDetails();
  }, [recommendationId]);

  const fetchRecommendationDetails = async () => {
    setLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual backend API call
      // const response = await fetch(`/api/recommendations/${recommendationId}`, {
      //   headers: { Authorization: `Bearer ${authToken}` }
      // });
      // const data = await response.json();
      // setRecommendation(data);
      // setIsInItinerary(data.inItinerary);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 600));
      setRecommendation(MOCK_RECOMMENDATION);
      setIsInItinerary(MOCK_RECOMMENDATION.inItinerary);
    } catch (err) {
      console.error('Failed to fetch recommendation details:', err);
      setError('Failed to load recommendation details');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToItinerary = async () => {
    try {
      // TODO: Connect to /api/itinerary/add endpoint
      // await fetch('/api/itinerary/add', {
      //   method: 'POST',
      //   headers: { 
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${authToken}`
      //   },
      //   body: JSON.stringify({ recommendationId })
      // });

      setIsInItinerary(true);
      // TODO: Show success notification
    } catch (error) {
      console.error('Failed to add to itinerary:', error);
      // TODO: Show error notification
    }
  };

  const handleRemoveRecommendation = async () => {
    try {
      // TODO: Connect to /api/recommendations/remove endpoint
      // await fetch(`/api/recommendations/${recommendationId}`, {
      //   method: 'DELETE',
      //   headers: { Authorization: `Bearer ${authToken}` }
      // });

      // TODO: Show success notification and navigate back
      navigate(-1);
    } catch (error) {
      console.error('Failed to remove recommendation:', error);
      // TODO: Show error notification
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.skeleton} />
      </div>
    );
  }

  if (error || !recommendation) {
    return (
      <div className={styles.errorContainer}>
        <h2>Recommendation not found</h2>
        <p>{error || 'This recommendation could not be loaded.'}</p>
        <button onClick={handleBack} className={styles.backButton}>
          Go back
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
      <Header onBack={handleBack} />
      
      <motion.main variants={fadeInUp}>
        <CoverImage 
          image={recommendation.coverImage}
          title={recommendation.title}
          aiInsight={recommendation.aiInsight}
        />

        <div className={styles.content}>
          <QuickInfoCard 
            bestTime={recommendation.bestTime}
            estimatedCost={recommendation.estimatedCost}
            location={recommendation.location}
          />

          <RecommendationDescription 
            description={recommendation.description}
          />

          <ImagesCarousel 
            images={recommendation.images}
            title={recommendation.title}
          />

          <CulturalTips 
            tips={recommendation.culturalTips}
            destination={recommendation.destination}
          />
        </div>
      </motion.main>

      <StickyFooterCTA
        isInItinerary={isInItinerary}
        onAddToItinerary={handleAddToItinerary}
        onRemoveRecommendation={handleRemoveRecommendation}
      />
    </motion.div>
  );
};

export default AIRecommendationDetailPage;