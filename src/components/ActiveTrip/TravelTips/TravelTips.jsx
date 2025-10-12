// src/components/TravelTips/TravelTips.jsx
// Contextual travel information displaying safety, culture, and language tips
// TODO: Fetch destination-specific tips from backend based on trip location

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Globe, MessageSquare } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../variants';
import styles from './TravelTips.module.css';

// Mock data - TODO: Replace with API call based on destination
const MOCK_TIPS = {
  safety: [
    "Avoid late night solo travel in unfamiliar areas",
    "Keep belongings secure and use hotel safes",
    "Have emergency contacts saved in local format"
  ],
  culture: [
    "Respect dress code in religious sites and churches",
    "Greet with a handshake; personal space is valued",
    "Tipping 10-15% is customary in restaurants"
  ],
  language: [
    { phrase: "Good Morning", translation: "Bonjour" },
    { phrase: "Good Evening", translation: "Bonsoir" },
    { phrase: "Thank You", translation: "Merci" },
    { phrase: "Excuse Me", translation: "Excusez-moi" },
    { phrase: "Do you speak English?", translation: "Parlez-vous anglais?" }
  ]
};

const TravelTips = ({ destination = "Paris, France", className = "", travelTips}) => {
  return (
    <motion.section 
      className={`${styles.container} ${className}`}
      variants={staggerContainer}
      initial="initial"
      animate="animate"
    >
      <motion.div variants={fadeInUp}>
        <h3 className={styles.title}>Travel Tips</h3>
        <p className={styles.subtitle}>Essential info for {destination}</p>
      </motion.div>

      <div className={styles.tipsGrid}>
        {/* Safety Tips */}
        <motion.div className={styles.tipCard} variants={fadeInUp}>
          <div className={styles.cardHeader}>
            <div className={styles.iconContainer}>
              <Shield size={20} />
            </div>
            <h4 className={styles.cardTitle}>Safety Tips</h4>
          </div>
          <ul className={styles.tipsList}>
            {travelTips.safetyTips.map((tip, index) => (
              <li key={index} className={styles.tipItem}>{tip}</li>
            ))}
          </ul>
        </motion.div>

        {/* Local Culture */}
        <motion.div className={styles.tipCard} variants={fadeInUp}>
          <div className={styles.cardHeader}>
            <div className={styles.iconContainer}>
              <Globe size={20} />
            </div>
            <h4 className={styles.cardTitle}>Local Culture</h4>
          </div>
          <ul className={styles.tipsList}>
            {travelTips.localCulture.map((tip, index) => (
              <li key={index} className={styles.tipItem}>{tip}</li>
            ))}
          </ul>
        </motion.div>

        {/* Language */}
        <motion.div className={styles.tipCard} variants={fadeInUp}>
          <div className={styles.cardHeader}>
            <div className={styles.iconContainer}>
              <MessageSquare size={20} />
            </div>
            <h4 className={styles.cardTitle}>Language</h4>
          </div>
          <div className={styles.languageList}>
            {travelTips.language.map((item, index) => (
              <div key={index} className={styles.phraseItem}>
                <span className={styles.phrase}>{item.localWord}</span>
                <span className={styles.translation}>{item.englishTranslation}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div className={styles.disclaimer} variants={fadeInUp}>
        <p>Tips are general recommendations. Check current local conditions and official travel advisories.</p>
      </motion.div>
    </motion.section>
  );
};

export default TravelTips;