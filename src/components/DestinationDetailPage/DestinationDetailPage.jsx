import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './Header/Header';
import HeroImage from './HeroImage/HeroImage';
import QuickInfo from './QuickInfo/QuickInfo';
import Description from './Description/Description';
import Gallery from './Gallery/Gallery';
import MapLocation from './MapLocation/MapLocation';
import RelatedDestinations from './RelatedDestinations/RelatedDestinations';
import ActionButtons from './ActionButtons/ActionButtons';
import styles from './DestinationDetailPage.module.css';

// Mock data - TODO: Replace with FastAPI integration
const MOCK_DESTINATION = {
  id: 5,
  name: "Santorini",
  country: "Greece",
  countryCode: "GR",
  category: "Luxury",
  budget: "Luxury",
  imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1200&h=800&fit=crop",
  description: "Santorini is one of the most romantic and picturesque destinations in the world. Known for its stunning sunsets, white-washed villages perched on clifftops, and crystal-clear waters, this Greek island offers an unforgettable experience. The unique volcanic landscape creates dramatic black sand beaches, while the traditional Cycladic architecture provides endless photo opportunities.",
  fullDescription: "Santorini, officially known as Thira, is a volcanic island in the southern Aegean Sea, about 200 km southeast of Greece's mainland. The island is famous for its dramatic views, stunning sunsets from Oia, traditional white-washed houses, and its active volcano. Santorini is also renowned for its local wine, produced from grapes grown in the island's unique volcanic soil. The island's capital, Fira, offers spectacular views of the caldera, while the village of Oia is considered one of the most beautiful places in the world to watch the sunset. Visitors can explore ancient ruins, relax on unique beaches with black, red, or white sand, and enjoy world-class Mediterranean cuisine in charming tavernas overlooking the sea.",
  rating: 4.8,
  reviewCount: 2847,
  bestTime: "April - October",
  popularity: "Very Popular",
  coordinates: { lat: 36.3932, lng: 25.4615 },
  gallery: [
    "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=600&fit=crop"
  ]
};

const MOCK_RELATED_DESTINATIONS = [
  {
    id: 1,
    name: "Mykonos",
    country: "Greece",
    countryCode: "GR",
    imageUrl: "https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=400&h=300&fit=crop"
  },
  {
    id: 2, 
    name: "Crete",
    country: "Greece",
    countryCode: "GR",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    name: "Rhodes",
    country: "Greece", 
    countryCode: "GR",
    imageUrl: "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=300&fit=crop"
  }
];

const DestinationDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [relatedDestinations, setRelatedDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
 
  // Page animation variants
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const sectionVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  useEffect(() => {
    fetchDestinationDetails();
  }, [id]);

  const fetchDestinationDetails = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // TODO: Replace with actual FastAPI call
      // const response = await fetch(`/api/destinations/${id}`);
      // const data = await response.json();
      // setDestination(data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      if (parseInt(id) === MOCK_DESTINATION.id) {
        setDestination(MOCK_DESTINATION);
        setRelatedDestinations(MOCK_RELATED_DESTINATIONS);
        
        // TODO: Check if destination is in user's wishlist
        // const wishlistResponse = await fetch(`/api/user/wishlist/${id}`);
        // setIsWishlisted(wishlistResponse.data.isWishlisted);
        setIsWishlisted(false);
      } else {
        throw new Error('Destination not found');
      }
    } catch (err) {
      console.error('Failed to fetch destination:', err);
      setError('Failed to load destination details');
    } finally {
      setLoading(false);
    }
  };

  const handlePlanTrip = () => {
    navigate('/onboarding', { 
      state: { 
        preSelectedDestination: destination 
      }
    });
  };
  
  
    
  const saveToLocal = () => {
  try {
    localStorage.setItem("preselected", JSON.stringify(destination));
    console.log("✅ handlePlanTrip access: Destination:", destination.name);

   setTimeout(() => {
      handlePlanTrip();
    }, 0);
    } catch (error) {
    console.error("❌ Failed to save destination:", error);
  }
 };

  const handleAddToWishlist = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/user/wishlist/${destination.id}`, {
      //   method: isWishlisted ? 'DELETE' : 'POST'
      // });
      
      setIsWishlisted(!isWishlisted);
    } catch (err) {
      console.error('Failed to update wishlist:', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${destination.name} - TravelMate`,
          text: destination.description,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      // TODO: Show toast notification
    }
  };

  const handleRelatedDestinationClick = (relatedDestination) => {
    navigate(`/destinations/${relatedDestination.id}`);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <motion.div 
            className={styles.loadingSpinner}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <p>Loading destination details...</p>
        </div>
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <h2>Oops! Something went wrong</h2>
          <p>{error || 'Destination not found'}</p>
          <button onClick={() => navigate(-1)} className={styles.backButton}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className={styles.container}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Header 
        onBack={() => navigate(-1)}
        onShare={handleShare}
        onPlanTrip={handlePlanTrip}
      />

      <main className={styles.content}>
        <motion.section variants={sectionVariants}>
          <HeroImage 
            destination={destination}
            imageUrl={destination.imageUrl}
            name={destination.name}
            country={destination.country}
            countryCode={destination.countryCode}
          />
        </motion.section>

        <motion.section variants={sectionVariants}>
          <QuickInfo 
            category={destination.category}
            budget={destination.budget}
            bestTime={destination.bestTime}
            popularity={destination.popularity}
            rating={destination.rating}
            reviewCount={destination.reviewCount}
          />
        </motion.section>

        <motion.section variants={sectionVariants}>
          <Description 
            description={destination.description}
            fullDescription={destination.fullDescription}
          />
        </motion.section>

        <motion.section variants={sectionVariants}>
          <Gallery images={destination.gallery} />
        </motion.section>

        <motion.section variants={sectionVariants}>
          <MapLocation 
            name={destination.name}
            coordinates={destination.coordinates}
          />
        </motion.section>

        <motion.section variants={sectionVariants}>
          <RelatedDestinations 
            destinations={relatedDestinations}
            onDestinationClick={handleRelatedDestinationClick}
          />
        </motion.section>

        <motion.section variants={sectionVariants}>
          <ActionButtons 
            onPlanTrip={saveToLocal}
            onAddToWishlist={handleAddToWishlist}
            isWishlisted={isWishlisted}
          />
        </motion.section>
      </main>
    </motion.div>
  );
};

export default DestinationDetailPage;