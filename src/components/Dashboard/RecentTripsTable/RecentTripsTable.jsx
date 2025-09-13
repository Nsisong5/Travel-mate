import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, DollarSign, Eye, MoreHorizontal } from "lucide-react";
import styles from "./RecentTripsTable.module.css";
import { useTripServices } from "../../../services/TripServices/TripServices";
import { useNavigate } from "react-router-dom";

export default function RecentTripsTable({ trips }) {
  const [recentTrips, setRecentTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getUserTrips } = useTripServices();
  const navigate = useNavigate();
  
  useEffect(() => {
    const getRecentTrips = async() => {
      try {
        setLoading(true);
        const trips = await getUserTrips();
        setRecentTrips(trips);
        console.log("recent trips fetched successfully");
      } catch (error) {
        console.log("couldn't fetch recent trips:", error);
        setError("Failed to load recent trips");
      } finally {
        setLoading(false);
      }     
    };   
    getRecentTrips();
  }, []);
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const formatCost = (cost) => {
    if (!cost || cost === 0) return 'N/A';
    if (typeof cost === 'number') {
      return `$${cost.toLocaleString()}`;
    }
    return cost;
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      'completed': { label: 'Completed', className: styles.statusCompleted },
      'ongoing': { label: 'Ongoing', className: styles.statusOngoing },
      'planned': { label: 'Planned', className: styles.statusPlanned },
      'cancelled': { label: 'Cancelled', className: styles.statusCancelled }
    };
    
    const statusInfo = statusMap[status?.toLowerCase()] || { 
      label: status || 'Unknown', 
      className: styles.statusDefault 
    };
    
    return (
      <span className={`${styles.statusBadge} ${statusInfo.className}`}>
        {statusInfo.label}
      </span>
    );
  };

  const handleTripClick = (tripId, event) => {
    if (event.target.closest(`.${styles.actionButton}`)) return;
    navigate(`/trips/${tripId}`);
  };

  const handleViewTrip = (tripId, event) => {
    event.stopPropagation();
    navigate(`/active`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  };

  if (loading) {
    return (
      <motion.section
        className={styles.tableSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>Recent Trips</h2>
        </div>
        <div className={styles.loadingState}>
          <motion.div 
            className={styles.loadingSpinner}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <p>Loading your recent trips...</p>
        </div>
      </motion.section>
    );
  }

  if (error) {
    return (
      <motion.section
        className={styles.tableSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>Recent Trips</h2>
        </div>
        <div className={styles.errorState}>
          <p>{error}</p>
          <button 
            className={styles.retryButton}
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      className={styles.tableSection}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>Recent Trips</h2>
        <span className={styles.count}>
          {recentTrips.length} {recentTrips.length === 1 ? 'trip' : 'trips'}
        </span>
      </div>

      {recentTrips.length === 0 ? (
        <div className={styles.emptyState}>
          <MapPin size={48} className={styles.emptyIcon} />
          <h3>No trips yet</h3>
          <p>Start planning your first adventure!</p>
          <button 
            className={styles.planTripButton}
            onClick={() => navigate('/onboarding')}
          >
            Plan Your First Trip
          </button>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className={styles.desktopTable}>
            <div className={styles.tableHeader}>
              <span className={styles.dateColumn}>
                <Calendar size={14} />
                Date
              </span>
              <span className={styles.destinationColumn}>
                <MapPin size={14} />
                Destination
              </span>
              <span className={styles.durationColumn}>
                <Clock size={14} />
                Duration
              </span>
              <span className={styles.costColumn}>
                <DollarSign size={14} />
                Cost
              </span>
              <span className={styles.statusColumn}>Status</span>
              <span className={styles.actionsColumn}>Actions</span>
            </div>

            <motion.div
              className={styles.tableBody}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {recentTrips.map((trip, idx) => (
                <motion.div
                  key={`${trip.destination}-${idx}`}
                  className={styles.tableRow}
                  variants={rowVariants}
                  onClick={(e) => handleTripClick(trip.id, e)}
                  whileHover={{ backgroundColor: 'var(--card-grad-start)' }}
                >
                  <div className={styles.dateCell}>
                    {formatDate(trip.start_date)}
                  </div>
                  <div className={styles.destinationCell}>
                    <span className={styles.destinationName}>{trip.destination}</span>
                  </div>
                  <div className={styles.durationCell}>
                    {trip.duration}
                  </div>
                  <div className={styles.costCell}>
                    {formatCost(trip.cost)}
                  </div>
                  <div className={styles.statusCell}>
                    {getStatusBadge(trip.status)}
                  </div>
                  <div className={styles.actionsCell}>
                    <motion.button
                      className={styles.actionButton}
                      onClick={(e) => handleViewTrip(trip.id, e)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="View trip details"
                    >
                      <Eye size={16} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Mobile Cards */}
          <motion.div
            className={styles.mobileCards}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {recentTrips.map((trip, idx) => (
              <motion.div
                key={`mobile-${trip.destination}-${idx}`}
                className={styles.mobileCard}
                variants={rowVariants}
                onClick={(e) => handleTripClick(trip.id, e)}
                whileTap={{ scale: 0.98 }}
              >
                <div className={styles.cardHeader}>
                  <div className={styles.cardDestination}>
                    <MapPin size={16} />
                    <span>{trip.destination}</span>
                  </div>
                  {getStatusBadge(trip.status)}
                </div>
                
                <div className={styles.cardDetails}>
                  <div className={styles.cardDetail}>
                    <Calendar size={14} />
                    <span>{formatDate(trip.start_date)}</span>
                  </div>
                  <div className={styles.cardDetail}>
                    <Clock size={14} />
                    <span>{trip.duration}</span>
                  </div>
                  <div className={styles.cardDetail}>
                    <DollarSign size={14} />
                    <span>{formatCost(trip.cost)}</span>
                  </div>
                </div>

                <div className={styles.cardActions}>
                  <motion.button
                    className={styles.viewButton}
                    onClick={(e) => handleViewTrip(trip.id, e)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Eye size={16} />
                    View Details
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </>
      )}
    </motion.section>
  );
}