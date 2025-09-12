import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Star } from "lucide-react";
import styles from "./DestinationsPreview.module.css";
import tokyo from "../../../../public/tokyo.jpeg";
import newYork from "../../../../public/new-york.jpeg";
import sydney from "../../../../public/sydney.jpeg";
import rome from "../../../../public/rome.jpeg";
import paris from "../../../../public/paris.jpeg";
import { useNavigate } from "react-router-dom";

const destinations = [
  { 
    id: 1, 
    title: "Paris", 
    image: paris, 
    country: "France",
    countryCode: "FR",
    category: "Historical",
    budget: "Luxury",
    description: "City of lights and romance",
    rating: 4.8,
    reviewCount: 2847
  },
  { 
    id: 2, 
    title: "Tokyo", 
    image: tokyo,
    country: "Japan",
    countryCode: "JP", 
    category: "Adventure",
    budget: "High",
    description: "Modern metropolis meets tradition",
    rating: 4.9,
    reviewCount: 3241
  },
  { 
    id: 3, 
    title: "New York City", 
    image: newYork,
    country: "USA",
    countryCode: "US",
    category: "Adventure", 
    budget: "High",
    description: "The city that never sleeps",
    rating: 4.7,
    reviewCount: 4156
  },
  { 
    id: 4, 
    title: "Sydney", 
    image: sydney,
    country: "Australia",
    countryCode: "AU",
    category: "Nature",
    budget: "Medium", 
    description: "Harbor city with iconic landmarks",
    rating: 4.6,
    reviewCount: 1923
  },
  { 
    id: 5, 
    title: "Rome", 
    image: rome,
    country: "Italy",
    countryCode: "IT",
    category: "Historical",
    budget: "Medium",
    description: "Eternal city of ancient wonders", 
    rating: 4.8,
    reviewCount: 2651
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      staggerChildren: 0.15 
    } 
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function DestinationsPreview() {
  const navigate = useNavigate();

  // Get country flag emoji
  const getCountryFlag = (countryCode) => {
    const flagEmojis = {
      'FR': '🇫🇷',
      'JP': '🇯🇵', 
      'US': '🇺🇸',
      'AU': '🇦🇺',
      'IT': '🇮🇹'
    };
    return flagEmojis[countryCode] || '🌍';
  };

  // Get budget badge class
  const getBudgetBadgeClass = (budgetLevel) => {
    const budgetClasses = {
      'Medium': styles.budgetMedium,
      'High': styles.budgetHigh,
      'Luxury': styles.budgetLuxury
    };
    return budgetClasses[budgetLevel] || styles.budgetMedium;
  };

  // Get category badge class
  const getCategoryBadgeClass = (categoryType) => {
    const categoryClasses = {
      'Historical': styles.categoryHistorical,
      'Adventure': styles.categoryAdventure,
      'Nature': styles.categoryNature
    };
    return categoryClasses[categoryType] || styles.categoryDefault;
  };

  const handlePlanTrip = (destination) => {
    navigate('/onboarding', { 
      state: { 
        preSelectedDestination: destination 
      }
    });
  };

  const handleViewMore = (destination) => {
    navigate(`/destinations/${destination.id}`);
  };

  return (
    <motion.section
      className={styles.destinations}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      aria-label="Featured destinations"
    >
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>Popular Destinations</h2>
        <p className={styles.sectionSubtitle}>Discover amazing places around the world</p>
      </div>

      <div className={styles.grid}>
        {destinations.map((destination, index) => (
          <motion.article 
            key={destination.id} 
            className={styles.card}
            variants={cardVariants}
            whileHover={{ 
              y: -8,
              scale: 1.02,
              transition: {
                duration: 0.3,
                ease: "easeOut"
              }
            }}
            tabIndex={0}
          >
            {/* Card Image */}
            <div className={styles.cardImageWrapper}>
              <motion.div
                className={styles.cardImage}
                style={{ backgroundImage: `url(${destination.image})` }}
                whileHover={{
                  scale: 1.1,
                  transition: {
                    duration: 0.4,
                    ease: "easeOut"
                  }
                }}
              />
              
              {/* Image Overlay with Badges */}
              <div className={styles.cardImageOverlay}>
                <div className={styles.badges}>
                  <span className={`${styles.categoryBadge} ${getCategoryBadgeClass(destination.category)}`}>
                    {destination.category}
                  </span>
                  <span className={`${styles.budgetBadge} ${getBudgetBadgeClass(destination.budget)}`}>
                    {destination.budget}
                  </span>
                </div>
              </div>
            </div>

            {/* Card Content */}
            <div className={styles.cardContent}>
              <div className={styles.cardHeader}>
                <h3 className={styles.destinationName}>{destination.title}</h3>
                <div className={styles.locationInfo}>
                  <span className={styles.countryFlag}>{getCountryFlag(destination.countryCode)}</span>
                  <span className={styles.countryName}>{destination.country}</span>
                </div>
              </div>

              <p className={styles.destinationDescription}>{destination.description}</p>

              {/* Rating */}
              <div className={styles.rating}>
                <Star size={14} className={styles.starIcon} />
                <span className={styles.ratingValue}>{destination.rating}</span>
                <span className={styles.ratingCount}>({destination.reviewCount.toLocaleString()} reviews)</span>
              </div>

              {/* Action Buttons */}
              <div className={styles.cardActions}>
                <motion.button
                  className={styles.primaryButton}
                  onClick={() => handlePlanTrip(destination)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Plan Trip
                </motion.button>
                
                <motion.button
                  className={styles.secondaryButton}
                  onClick={() => handleViewMore(destination)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View More
                </motion.button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <motion.button 
        className={styles.exploreBtn} 
        type="button" 
        onClick={() => navigate("/top-destinations")}
        whileHover={{ 
          scale: 1.05, 
          y: -2,
          boxShadow: '0 8px 25px rgba(37, 99, 235, 0.4)'
        }}
        whileTap={{ scale: 0.95 }}
        variants={cardVariants}
      >
        <span>Explore More Destinations</span>
        <ArrowRight size={20} />
      </motion.button>
    </motion.section>
  );
}