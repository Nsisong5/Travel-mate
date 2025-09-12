import React from "react";
import { motion } from "framer-motion";
import { ArrowRightCircle, Clock } from "lucide-react";
import styles from "./OverviewCard.module.css";
import { useNavigate } from "react-router-dom"


const OverviewCard = ({ icon, title, value, index,url }) => {
  const isComingSoon = title === "Distance Travel";
  const isBudgetCard = title.toLowerCase().includes("budget");
  const navigate = useNavigate();
  
  const cardVariants = {
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
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    hover: {
      y: -4,
      scale: 1.02,
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

  const iconVariants = {
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    }
  };

  const actionIconVariants = {
    hover: {
      x: 2,
      transition: {
        duration: 0.2
      }
    }
  };
  
  
  const handleNavigate = ()=>{
     url && navigate(url);
  }
  
  
  return (
    <motion.div
      className={`${styles.card} ${isBudgetCard ? styles.budgetCard : ''} ${isComingSoon ? styles.comingSoonCard : ''}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      tabIndex={0}
      role="button"
      aria-label={`${title}: ${isComingSoon ? 'Coming Soon' : value}${isBudgetCard ? ', click for more details' : ''}`}
      onClick={handleNavigate}
    >
      <div className={styles.cardContent}>
        <div className={styles.iconContainer}>
          <motion.div 
            className={styles.icon}
            variants={iconVariants}
          >
            {typeof icon === 'string' ? <span aria-hidden="true">{icon}</span> : icon}
          </motion.div>
        </div>
        
        <div className={styles.textContent}>
          <h3 className={styles.title}>{title}</h3>
          
          {isComingSoon ? (
            <div className={styles.comingSoon}>
              <Clock size={14} className={styles.comingSoonIcon} />
              <span className={styles.comingSoonText}>Coming Soon</span>
            </div>
          ) : (
            <div className={styles.valueContainer}>
              <p className={styles.value}>{value}</p>
              {isBudgetCard && (
                <motion.div 
                  className={styles.actionIcon}
                  variants={actionIconVariants}
                >
                  <ArrowRightCircle size={16} />
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Hover glow effect */}
      <div className={styles.glowEffect} />
      
      {/* Interactive indicator for budget cards */}
      {isBudgetCard && <div className={styles.interactiveIndicator} />}
    </motion.div>
  );
};

export default OverviewCard;