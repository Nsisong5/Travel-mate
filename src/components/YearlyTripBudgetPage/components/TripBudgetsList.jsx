import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, CheckCircle2 } from 'lucide-react';
import styles from '../YearlyTripBudgetPage.module.css';
import { formatBudgetAmount } from '../../../utils/BudgetPage/getBudgetFeedback';

const TripCard = ({trip, index }) => {
  const spentPercentage = (trip.spent / trip.allocated) * 100;
  const isCompleted = trip.status === 'completed';
  const indexList = []
  
  if (indexList.includes(trip.id)){
    return (<>pga</>)
  }
  indexList.push(trip.id) 
  
  console.log(indexList)
  console.log(trip.id)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`${styles.tripCard} ${isCompleted ? styles.completed : ''}`}
    >
      <div className={styles.tripHeader}>
        <div className={styles.tripInfo}>
          <h3 className={styles.tripTitle}>{trip.title}</h3>
          <div className={styles.tripMeta}>
            <MapPin size={14} />
            <span>{trip.destination}</span>
          </div>
          <span className={styles.tripDates}>{trip.dates}</span>
        </div>
        {isCompleted && (
          <div className={styles.completedBadge}>
            <CheckCircle2 size={16} />
            <span>Completed</span>
          </div>
        )}
      </div>

      <div className={styles.tripBudgetInfo}>
        <div className={styles.budgetRow}>
          <span>Allocated</span>
          <span className={styles.amount}>{formatBudgetAmount(trip.allocated)}</span>
        </div>
        <div className={styles.budgetRow}>
          <span>Spent</span>
          <span className={styles.amount}>{formatBudgetAmount(trip.spent)}</span>
        </div>
        <div className={styles.budgetRow}>
          <span>Remaining</span>
          <span className={`${styles.amount} ${styles.remaining}`}>
            {formatBudgetAmount(trip.allocated - trip.spent)}
          </span>
        </div>
      </div>

      <div className={styles.tripProgress}>
        <div className={styles.progressHeader}>
          <span>Spent</span>
          <span>{spentPercentage.toFixed(1)}%</span>
        </div>
        <div className={styles.progressBar}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(spentPercentage, 100)}%` }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className={`${styles.progressFill} ${spentPercentage > 100 ? styles.overBudget : ''}`}
          />
        </div>
      </div>
    </motion.div>
  );
};

const TripBudgetsList = ({ tripBudgets }) => {
   
  
  if (!tripBudgets || tripBudgets.length === 0) {
    return (
      <div className={styles.tripsSection}>
        <h2 className={styles.sectionTitle}>Trip Budgets</h2>
        <div className={styles.emptyTripsMessage}>
          <p>No trip budgets created yet. Start by adding your first trip budget!</p>
        </div>
      </div>
    );
  }


  return (
    <div className={styles.tripsSection}>
      <h2 className={styles.sectionTitle}>Trip Budgets</h2>
      <div className={styles.tripsGrid}>
        {tripBudgets.map((trip, index) => (         
         <TripCard key={trip.id} trip={trip} index={index}/>           
        ))}
      </div>
    </div>
  );
};

export default TripBudgetsList;