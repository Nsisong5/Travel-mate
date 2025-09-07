// src/pages/TripDetailPage/Recommendations/RecommendationsCarousel.jsx
// Horizontal scrollable recommendations carousel with save functionality

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, Star, MapPin, ExternalLink } from 'lucide-react';
import { fadeInUp, slideLeft } from '../variants';
import styles from './RecommendationsCarousel.module.css';

// Mock recommendations data - complete array
const MOCK_RECOMMENDATIONS = [
  {
    id: 1,
    title: "Eiffel Tower Night View",
    description: "Experience the iconic tower illuminated after sunset with breathtaking city views.",
    image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=300&fit=crop",
    category: "Landmark",
    rating: 4.8,
    saved: false,
    tags: ["Popular", "Evening"]
  },
  {
    id: 2,
    title: "Louvre Museum Private Tour",
    description: "Skip the lines with exclusive access to world-famous artworks and hidden galleries.",
    image: "https://images.unsplash.com/photo-1566139435194-df7c1c68e1b1?w=400&h=300&fit=crop",
    category: "Culture",
    rating: 4.9,
    saved: true,
    tags: ["Art", "Skip-line"]
  },
  {
    id: 3,
    title: "Seine River Sunset Cruise",
    description: "Romantic cruise along the Seine with champagne and panoramic views of Paris landmarks.",
    image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=300&fit=crop",
    category: "Experience",
    rating: 4.7,
    saved: false,
    tags: ["Romantic", "Sunset"]
  }
];

const RecommendationsCarousel = ({ tripId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendations();
  }, [tripId]);

  const fetchRecommendations = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await api.get(`/trips/${tripId}/recommendations`);
      // Expected response: array of { id, title, description, image, category, rating, saved, tags }
      
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      setRecommendations(MOCK_RECOMMENDATIONS);
    } catch (error) {
      console.error('Failed to fetch recommendations:', error);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (recommendationId) => {
    try {
      // TODO: API call to save/unsave recommendation
      // POST /trips/${tripId}/recommendations/${recommendationId}/save
      
      setRecommendations(prev =>
        prev.map(rec =>
          rec.id === recommendationId ? { ...rec, saved: !rec.saved } : rec
        )
      );
    } catch (error) {
      console.error('Failed to save recommendation:', error);
    }
  };

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : recommendations.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev < recommendations.length - 1 ? prev + 1 : 0));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      handlePrevious();
    } else if (event.key === 'ArrowRight') {
      handleNext();
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>Recommendations</h3>
        </div>
        <div className={styles.loadingSkeleton} />
      </div>
    );
  }

  if (recommendations.length === 0) {
    return (
      <motion.div 
        className={styles.emptyState}
        variants={fadeInUp}
      >
        <div className={styles.emptyIcon}>
          <MapPin size={48} />
        </div>
        <h3 className={styles.emptyTitle}>No recommendations yet</h3>
        <p className={styles.emptyDescription}>
          Check back later for personalized suggestions.
        </p>
      </motion.div>
    );
  }

  const currentRec = recommendations[currentIndex];

  return (
    <motion.div 
      className={styles.container}
      variants={fadeInUp}
      onKeyDown={handleKeyDown}
      tabIndex="0"
      role="region"
      aria-label="Recommendations carousel"
    >
      <div className={styles.header}>
        <h3 className={styles.title}>Recommendations</h3>
        <div className={styles.indicators}>
          {recommendations.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${index === currentIndex ? styles.indicatorActive : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to recommendation ${index + 1}`}
              type="button"
            />
          ))}
        </div>
      </div>

      <div className={styles.carouselContainer}>
        {recommendations.length > 1 && (
          <>
            <button
              className={`${styles.navButton} ${styles.navLeft}`}
              onClick={handlePrevious}
              aria-label="Previous recommendation"
              type="button"
            >
              <ChevronLeft size={20} />
            </button>
            
            <button
              className={`${styles.navButton} ${styles.navRight}`}
              onClick={handleNext}
              aria-label="Next recommendation"
              type="button"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        <div className={styles.carouselTrack}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              className={styles.card}
              variants={slideLeft}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className={styles.cardImage}>
                <img 
                  src={currentRec.image} 
                  alt={currentRec.title}
                  loading="lazy"
                />
                <button
                  onClick={() => handleSave(currentRec.id)}
                  className={`${styles.saveButton} ${currentRec.saved ? styles.saved : ''}`}
                  aria-label={currentRec.saved ? 'Remove from saved' : 'Save recommendation'}
                  type="button"
                >
                  <Heart size={16} fill={currentRec.saved ? 'currentColor' : 'none'} />
                </button>
              </div>

              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <div className={styles.category}>{currentRec.category}</div>
                  <div className={styles.rating}>
                    <Star size={12} fill="currentColor" />
                    <span>{currentRec.rating}</span>
                  </div>
                </div>

                <h4 className={styles.cardTitle}>{currentRec.title}</h4>
                <p className={styles.cardDescription}>{currentRec.description}</p>

                <div className={styles.cardTags}>
                  {currentRec.tags.map((tag, index) => (
                    <span key={index} className={styles.tag}>{tag}</span>
                  ))}
                </div>

                <button className={styles.viewMoreButton} type="button">
                  <ExternalLink size={16} />
                  View Details
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default RecommendationsCarousel;