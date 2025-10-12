import React,{ useContext} from "react";
import { motion } from "framer-motion";
import { useOutletContext, useNavigate } from "react-router-dom";
import styles from "./SummaryStep.module.css";
import { AuthContext } from "../../../AuthProvider"
import { useTripServices } from "../../../services/TripServices/TripServices";

export default function SummaryStep() {
  const { state, allowSkip } = useOutletContext();
  const navigate = useNavigate();
  const { createTrip } = useTripServices();
  const { user } = useContext(AuthContext)

 
  const handleConfirm = async() => {
    const tripData = {
    destination: state.destination.name,
    start_date:state.startDate,
    end_date:state.endDate,
    status: "planned",
    budget_range: state.budget, 
    style: state.style,
    origin: user.country || null,
    means : state.means || "car",   
    local_gov: state.destination.localGov || null,
    country: state.destination.country || null,
    state: state.destination.state || null , 
    travelers: state.travelers
    }
    
    if (allowSkip) {
      navigate("/auth/signup");
    } else {
      try {
        const result = await createTrip(tripData);
        navigate("/dashboard");
      } catch (error) {
        console.error("Trip creation failed:", error);
      }
      console.log("Trip Confirmed:", state);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
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

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: -20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
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
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.08,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      x: -10
    },
    visible: { 
      opacity: 1, 
      y: 0,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const buttonVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 1.0,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    hover: {
      scale: 1.02,
      y: -2,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
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
  
  // Summary data with proper fallbacks
  const summaryData = [
    { 
      label: 'Travel Style', 
      value: state.style || 'Not specified' 
    },
    { 
      label: 'Start Date', 
      value: formatDate(state.startDate) 
    },
    { 
      label: 'End Date', 
      value: formatDate(state.endDate) 
    },
    { 
      label: 'Destination', 
      value: state.destination.country || 'Not specified' 
    },
    { 
      label: 'Budget Type', 
      value: state.budgetType || state.budget || 'Not specified' 
    },
    { 
      label: 'Number of People', 
      value: state.travelers ? `${state.travelers} ${state.travelers === 1 ? 'person' : 'people'}` : '2 people' 
    },
    { 
      label: 'Budget', 
      value: state.totalBudget ? `$${state.totalBudget.toLocaleString()}` : state.budget || '$3,500' 
    }
  ];

  return (
    <motion.div
      className={styles.summaryPage}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      aria-label="Trip onboarding summary"
    >
      <motion.h1 
        variants={titleVariants}
        className={styles.title}
      >
        Onboarding Summary
      </motion.h1>

      <motion.div 
        variants={cardVariants}
        className={styles.summaryCard}
      >
        <div className={styles.cardContent}>
          {summaryData.map((item, index) => (
            <motion.div
              key={item.label}
              variants={itemVariants}
              className={styles.summaryItem}
            >
              <span className={styles.label}>{item.label}:</span>
              <span className={styles.value}>{item.value}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div 
        variants={buttonVariants}
        className={styles.confirmSection}
      >
        <motion.button
          className={styles.confirmBtn}
          type="button"
          onClick={handleConfirm}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          aria-label="Confirm trip details and continue to dashboard"
        >
          Confirm & Continue
        </motion.button>
      </motion.div>
    </motion.div>
  );
}