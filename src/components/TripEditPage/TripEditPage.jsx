import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './Header/Header';
import FormField from './FormField/FormField';
import DateField from './DateField/DateField';
import DropdownField from './DropdownField/DropdownField';
import ToggleField from './ToggleField/ToggleField';
import RatingField from './RatingField/RatingField';
import Footer from './Footer/Footer';
import styles from './TripEditPage.module.css';
import { useTripServices } from "../../services/TripServices/TripServices"
import { useBudgetContext } from "../../services/BudgetServices/BudgetContextProvider"


// Mock trip data - TODO: Replace with API integration
const MOCK_TRIP_DATA = {
  id: '123',
  destination: 'Paris, France',
  origin: 'New York, USA',
  startDate: '2024-03-15',
  endDate: '2024-03-20',
  meansOfTravel: 'flight',
  cost: 2500,
  aiEstimated: true,
  status: 'planned',
  style: 'leisure',
  budgetRange: 'medium',
  rating: 0,
  country: 'France',
  state: 'Île-de-France',
  city: 'Paris'
};

const DROPDOWN_OPTIONS = {
  meansOfTravel: [
    { value: 'car', label: 'Car' },
    { value: 'train', label: 'Train' },
    { value: 'flight', label: 'Flight' },
    { value: 'bus', label: 'Bus' },
    { value: 'boat', label: 'Boat' }
  ],
  status: [
    { value: 'planned', label: 'Planned' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ],
  style: [
    { value: 'leisure', label: 'Leisure' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'business', label: 'Business' }
  ],
  budgetRange: [
    { value: 'economy', label: 'Economy' },
    { value: 'medium', label: 'Medium' },
    { value: 'luxury', label: 'Luxury' }
  ]
};

const TripEditPage = () => {
  const { tripId } = useParams();
  const navigate = useNavigate();
  
  const [tripData, setTripData] = useState(MOCK_TRIP_DATA);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [errors, setErrors] = useState({});
  const [ budget, setBudget ] = useState({ amount: 0});
  const { getTrip } = useTripServices();
  const { getTripBudget }  = useBudgetContext();
  const { updateTrip } =  useTripServices();
  // Page animation variants
  const pageVariants = {
    initial: { 
      opacity: 0, 
      y: '100%'
    },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36,1],
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0,
      y: '100%',
      transition: {
        duration: 0.3
      }
    }
  };

  const fieldVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    }
  };


  useEffect(() => {
   const fetchAll = async ()=>{
      const tripBudget = await getTripBudget(tripId);            
      fetchTripData(tripBudget);
      setBudget(tripBudget);
   }
   
   fetchAll();
  }, [tripId]);

  const fetchTripData = async (budget) => {
    setLoading(true);
    try {
    const trip = await getTrip(tripId);
    console.log("trip data: ",trip)
    trip ? 
    setTripData({
    startDate: trip.start_date,
    endDate: trip.end_date,
    meansOfTravel: trip.means,
    cost: budget.amount,
    aiEstimated: trip.cost_estimated,
    status: trip.status,
    style: trip.style,
    budgetRange: trip.budget_range,
    rating: trip.rating, 
    country: trip.country,
    state: trip.state,
    city: trip.local_gov,
    origin: trip.origin,
    destination: trip.destination ,
    rating: trip.rating,
    title: trip.title
             
    })
       
    :setTripData(MOCK_TRIP_DATA);
    } catch (error) {
      console.error('Failed to fetch trip data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateDuration = (startDate, endDate) => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const updateField = (field, value) => {
    setTripData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Auto-calculate duration when dates change
      if (field === 'startDate' || field === 'endDate') {
        updated.duration = calculateDuration(updated.startDate, updated.endDate);
      }
      
      return updated;
    });
    setHasChanges(true);
    
    // Clear field error when user makes changes
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate required fields
    if (!tripData.origin?.trim()) {
      newErrors.origin = 'Origin is required';
    }
    
    if (!tripData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    
    if (!tripData.endDate) {
      newErrors.endDate = 'End date is required';
    }
    
    // Validate date logic
    if (tripData.startDate && tripData.endDate) {
      const start = new Date(tripData.startDate);
      const end = new Date(tripData.endDate);
      
      if (end <= start) {
        newErrors.endDate = 'End date must be after start date';
      }
    }
    
    // Validate cost if not AI estimated
    if (!tripData.aiEstimated && (!tripData.cost || tripData.cost <= 0)) {
      newErrors.cost = 'Cost must be greater than 0 when not AI estimated';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;   
    setSaving(true);
    try {
      const response = await updateTrip(tripData,tripId);
      setHasChanges(false);
      navigate(-1, { 
        state: { message: 'Trip updated successfully!' }
      });
    } catch (error) {
      console.error('Failed to save trip:', error);
      // TODO: Show error toast
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (hasChanges) {
      const confirmLeave = window.confirm('You have unsaved changes. Are you sure you want to leave?');
      if (!confirmLeave) return;
    }
    navigate(-1);
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
          <p>Loading trip details...</p>
        </div>
      </div>
    );
  }

  const duration = calculateDuration(tripData.startDate, tripData.endDate);

  return (
    <motion.div 
      className={styles.container}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Header 
        onBack={handleCancel}
        onSave={handleSave}
        saving={saving}
        hasChanges={hasChanges}
      />

      <main className={styles.content}>
        <div className={styles.form}>
          {/* Destination (readonly) */}
          <motion.div variants={fieldVariants}>
            <FormField
              label="Destination"
              value={tripData.destination}
              icon="MapPin"
              readonly
            />
          </motion.div>

        {/*  title */} 
         <motion.div variants={fieldVariants}>
            <FormField
              label="Trip Title"
              value={tripData.title}
              onChange={(value) => updateField('title', value)}     
              placeholder="enter your trip title....."
              error={errors.title}
              required
            />
          </motion.div>      


          {/* Origin */}
          <motion.div variants={fieldVariants}>
            <FormField
              label="Origin"
              value={tripData.origin}
              onChange={(value) => updateField('origin', value)}
              icon="Plane"
              placeholder="Where are you traveling from?"
              error={errors.origin}
              required
            />
          </motion.div>

          {/* Dates */}
          <div className={styles.dateFields}>
            <motion.div variants={fieldVariants}>
              <DateField
                label="Start Date"
                value={tripData.startDate}
                onChange={(value) => updateField('startDate', value)}
                error={errors.startDate}
                required
              />
            </motion.div>

            <motion.div variants={fieldVariants}>
              <DateField
                label="End Date"
                value={tripData.endDate}
                onChange={(value) => updateField('endDate', value)}
                error={errors.endDate}
                min={tripData.startDate}
                required
              />
            </motion.div>
          </div>

          {/* Duration (auto-calculated) */}
          <motion.div variants={fieldVariants}>
            <div className={styles.durationField}>
              <span className={styles.durationLabel}>Duration:</span>
              <span className={styles.durationValue}>
                {duration} {duration === 1 ? 'day' : 'days'}
              </span>
            </div>
          </motion.div>

          {/* Means of Travel */}
          <motion.div variants={fieldVariants}>
            <DropdownField
              label="Means of Travel"
              value={tripData.meansOfTravel}
              onChange={(value) => updateField('meansOfTravel', value)}
              options={DROPDOWN_OPTIONS.meansOfTravel}
              icon="Car"
            />
          </motion.div>

          {/* Cost with AI toggle */}
          <motion.div variants={fieldVariants}>
            <div className={styles.costSection}>
              <FormField
                label="Cost"
                value={tripData.cost}
                onChange={(value) => updateField('cost', parseFloat(value) || 0)}
                type="number"
                icon="DollarSign"
                placeholder="0.00"
                error={errors.cost}
                disabled={tripData.aiEstimated}
              />
              <ToggleField
                label="AI Estimated"
                value={tripData.aiEstimated}
                onChange={(value) => updateField('aiEstimated', value)}
                helperText="If enabled, AI continues estimating cost"
              />
            </div>
          </motion.div>

          {/* Status */}
          <motion.div variants={fieldVariants}>
            <DropdownField
              label="Status"
              value={tripData.status}
              onChange={(value) => updateField('status', value)}
              options={DROPDOWN_OPTIONS.status}
              icon="Flag"
            />
          </motion.div>

          {/* Style */}
          <motion.div variants={fieldVariants}>
            <DropdownField
              label="Style"
              value={tripData.style}
              onChange={(value) => updateField('style', value)}
              options={DROPDOWN_OPTIONS.style}
              icon="Palette"
            />
          </motion.div>

          {/* Budget Range */}
          <motion.div variants={fieldVariants}>
            <DropdownField
              label="Budget Range"
              value={tripData.budgetRange}
              onChange={(value) => updateField('budgetRange', value)}
              options={DROPDOWN_OPTIONS.budgetRange}
              icon="Wallet"
            />
          </motion.div>

          {/* Rating */}
          <motion.div variants={fieldVariants}>
            <RatingField
              label="Rating"
              value={tripData.rating}
              onChange={(value) => updateField('rating', value)}
            />
          </motion.div>

          {/* Location Details */}
          <div className={styles.locationSection}>
            <motion.div variants={fieldVariants}>
              <FormField
                label="Country"
                value={tripData.country}
                icon="Globe"
                readonly
              />
            </motion.div>

            <motion.div variants={fieldVariants}>
              <FormField
                label="State/Province"
                value={tripData.state}
                onChange={(value) => updateField('state', value)}
                icon="Building"
                placeholder="State or Province"
              />
            </motion.div>

            <motion.div variants={fieldVariants}>
              <FormField
                label="Local Gov/City"
                value={tripData.city}
                onChange={(value) => updateField('city', value)}
                icon="Home"
                placeholder="City or Local Government"
              />
            </motion.div>
          </div>
        </div>
      </main>

      <Footer 
        onCancel={handleCancel}
        onSave={handleSave}
        saving={saving}
        hasChanges={hasChanges}
      />
    </motion.div>
  );
};

export default TripEditPage;