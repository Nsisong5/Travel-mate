import React, { useState, useEffect, useRef } from "react";
import { Map, Cpu, MapPin, Calendar, Users, Shield } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValue } from "framer-motion";
import styles from "./Features.module.css";

// Enhanced features data with more comprehensive options
const features = [
  {
    icon: <Map size={32} />,
    title: "Smart Trip Planning",
    description: "AI-powered itineraries tailored to your preferences and budget",
    color: "var(--primary)"
  },
  {
    icon: <Cpu size={32} />,
    title: "AI Recommendations",
    description: "Personalized suggestions based on your travel history and interests",
    color: "var(--accent)"
  },
  {
    icon: <MapPin size={32} />,
    title: "Discover Destinations",
    description: "Explore hidden gems and popular spots around the world",
    color: "var(--secondary)"
  },
  {
    icon: <Calendar size={32} />,
    title: "Smart Scheduling",
    description: "Optimize your time with intelligent activity scheduling",
    color: "var(--primary-600)"
  },
  {
    icon: <Users size={32} />,
    title: "Group Planning",
    description: "Collaborate with friends and family for perfect group trips",
    color: "var(--accent-600)"
  },
  {
    icon: <Shield size={32} />,
    title: "Travel Safety",
    description: "Real-time safety updates and emergency assistance",
    color: "var(--error)"
  }
];

export default function Features() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform scroll progress to card positions
  const x = useTransform(scrollYProgress, [0, 1], [0, -100 * (features.length - 1)]);

  // Auto-advance slides every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Manual slide control via scroll or interaction
  const handleCardClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <section className={styles.featuresSection} ref={containerRef} id="features">
      <div className={styles.sectionHeader}>
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Why Choose TravelMate?
        </motion.h2>
        <motion.p 
          className={styles.sectionSubtitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Experience the future of travel planning with our intelligent platform
        </motion.p>
      </div>

      {/* Sliding cards container with waist-slide motion */}
      <div className={styles.cardsContainer}>
        <div className={styles.cardsTrack}>
          {features.map((feature, index) => {
            // Calculate position relative to active card
            const position = index - activeIndex;
            const isActive = index === activeIndex;
            const isAdjacent = Math.abs(position) === 1;
            const isVisible = Math.abs(position) <= 2;

            return (
              <motion.article
                key={index}
                className={`${styles.featureCard} ${isActive ? styles.active : ''} ${isAdjacent ? styles.adjacent : ''}`}
                onClick={() => handleCardClick(index)}
                animate={{
                  // Waist-slide positioning: center card prominent, adjacent visible but smaller
                  x: position * 280 + (position > 0 ? 40 : position < 0 ? -40 : 0),
                  scale: isActive ? 1 : isAdjacent ? 0.85 : 0.7,
                  opacity: isVisible ? (isActive ? 1 : isAdjacent ? 0.8 : 0.5) : 0,
                  zIndex: isActive ? 10 : isAdjacent ? 5 : 1,
                  rotateY: position * -5, // Subtle 3D effect
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94], // Custom spring-like easing
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.5 }
                }}
                whileHover={isActive ? { 
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.2 }
                } : {}}
                style={{
                  cursor: isActive ? 'default' : 'pointer',
                }}
              >
                <div className={styles.iconWrapper} style={{ color: feature.color }}>
                  {feature.icon}
                </div>
                <h3 className={styles.cardTitle}>{feature.title}</h3>
                <p className={styles.cardDescription}>{feature.description}</p>
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    className={styles.activeIndicator}
                    layoutId="activeIndicator"
                    style={{ backgroundColor: feature.color }}
                  />
                )}
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Progress indicators */}
      <div className={styles.progressIndicators}>
        {features.map((_, index) => (
          <button
            key={index}
            className={`${styles.progressDot} ${index === activeIndex ? styles.activeDot : ''}`}
            onClick={() => handleCardClick(index)}
            aria-label={`Go to feature ${index + 1}`}
          >
            <motion.div
              className={styles.dotFill}
              animate={{
                scale: index === activeIndex ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}