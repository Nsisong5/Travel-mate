import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PageHeader from './PageHeader/PageHeader';
import FilterSection from './FilterSection/FilterSection';
import DestinationsGrid from './DestinationsGrid/DestinationsGrid';
import LoadMoreButton from './LoadMoreButton/LoadMoreButton';
import EmptyState from './EmptyState/EmptyState';
import styles from './TopDestinationsPage.module.css';

// Mock data - TODO: Replace with FastAPI integration
const MOCK_DESTINATIONS = [
  {
    id: 1,
    name: "Paris",
    country: "France",
    countryCode: "FR",
    category: "Historical",
    budget: "Luxury",
    imageUrl: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop",
    description: "City of lights and romance"
  },
  {
    id: 2,
    name: "Tokyo",
    country: "Japan", 
    countryCode: "JP",
    category: "Adventure",
    budget: "High",
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
    description: "Modern metropolis meets ancient tradition"
  },
  {
    id: 3,
    name: "Bali",
    country: "Indonesia",
    countryCode: "ID",
    category: "Nature",
    budget: "Medium",
    imageUrl: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop",
    description: "Tropical paradise with stunning beaches"
  },
  {
    id: 4,
    name: "New York",
    country: "USA",
    countryCode: "US",
    category: "Adventure",
    budget: "High",
    imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop",
    description: "The city that never sleeps"
  },
  {
    id: 5,
    name: "Santorini",
    country: "Greece",
    countryCode: "GR",
    category: "Luxury",
    budget: "Luxury",
    imageUrl: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop",
    description: "Stunning sunsets and white-washed villages"
  },
  {
    id: 6,
    name: "Machu Picchu",
    country: "Peru",
    countryCode: "PE",
    category: "Historical",
    budget: "Medium",
    imageUrl: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&h=600&fit=crop",
    description: "Ancient Incan citadel in the clouds"
  }
];

const CATEGORIES = ['All', 'Historical', 'Adventure', 'Nature', 'Luxury'];
const BUDGET_RANGES = ['All', 'Low', 'Medium', 'High', 'Luxury'];

const TopDestinationsPage = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: 'All',
    budget: 'All',
    country: ''
  });

  // Page animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: 'easeOut',
        staggerChildren: 0.1 
      }
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  // Fetch destinations on component mount
  useEffect(() => {
    fetchDestinations();
  }, []);

  // Apply filters when destinations or filters change
  useEffect(() => {
    applyFilters();
  }, [destinations, filters]);

  const fetchDestinations = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual FastAPI call
      // const response = await fetch('/api/destinations');
      // const data = await response.json();
      // setDestinations(data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      setDestinations(MOCK_DESTINATIONS);
    } catch (error) {
      console.error('Failed to fetch destinations:', error);
      setDestinations([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...destinations];

    // Apply category filter
    if (filters.category !== 'All') {
      filtered = filtered.filter(dest => dest.category === filters.category);
    }

    // Apply budget filter  
    if (filters.budget !== 'All') {
      filtered = filtered.filter(dest => dest.budget === filters.budget);
    }

    // Apply country filter
    if (filters.country.trim()) {
      filtered = filtered.filter(dest => 
        dest.country.toLowerCase().includes(filters.country.toLowerCase()) ||
        dest.name.toLowerCase().includes(filters.country.toLowerCase())
      );
    }

    setFilteredDestinations(filtered);
    setVisibleCount(4); // Reset visible count when filters change
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, filteredDestinations.length));
  };

  const handlePlanTrip = (destination) => {
    // TODO: Navigate to trip planning with destination pre-selected
    navigate('/onboarding', { 
      state: { 
        preSelectedDestination: destination 
      }
    });
  };

  const handleViewMore = (destination) => {
    // TODO: Navigate to destination details page
    navigate(`/destinations/${destination.id}`);
  };

  const visibleDestinations = filteredDestinations.slice(0, visibleCount);
  const hasMoreDestinations = visibleCount < filteredDestinations.length;

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <motion.div 
            className={styles.loadingSpinner}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <p>Discovering amazing destinations...</p>
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
      <PageHeader 
        title="Top Destinations"
        onBack={() => navigate(-1)}
      />

      <div className={styles.content}>
        <FilterSection
          filters={filters}
          categories={CATEGORIES}
          budgetRanges={BUDGET_RANGES}
          onFilterChange={handleFilterChange}
        />

        {filteredDestinations.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <DestinationsGrid
              destinations={visibleDestinations}
              onPlanTrip={handlePlanTrip}
              onViewMore={handleViewMore}
            />

            {hasMoreDestinations && (
              <LoadMoreButton 
                onClick={handleLoadMore}
                remainingCount={filteredDestinations.length - visibleCount}
              />
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default TopDestinationsPage;