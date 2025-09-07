import React, { useState } from "react";
import styles from "./FeaturesSection.module.css";
import { motion } from "framer-motion";
import { Plane, CloudSun, CheckSquare } from "lucide-react";
import { useTheme } from "../../../ThemeContext"

const features = [
  {
    title: "Flight Booking",
    description:
      "Find the best flights tailored to your schedule and budget seamlessly.",
    icon: <Plane />,
  },
  {
    title: "Weather Updates",
    description:
      "Stay updated with live weather forecasts to plan your day better.",
    icon: <CloudSun />,
  },
  {
    title: "Travel Checklist",
    description:
      "Organize your trip essentials and never forget important items again.",
    icon: <CheckSquare />,
  },
];

export default function FeaturesSection() {
  const [selectedCard, setSelectedCard] = useState(null);
  const { theme } = useTheme();
  return (
    <section
      id="features"
      aria-label="Key Features"
      className={`${styles.features} ${theme === "dark" ? styles.dark : ""}`}
    >
      <h2 className={styles.title}>Features</h2>
      <div className={styles.cards}>
        {features.map(({ title, description, icon }, i) => {
          const isSelected = selectedCard === i;

          return (
            <motion.article
              key={title}
              className={styles.featureCard}
              tabIndex={0}
              aria-label={`${title} feature`}
              whileHover={{ scale: 1.05 }}
              whileFocus={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.25, duration: 0.5, ease: "easeOut" }}
              onClick={() => {
                if (selectedCard === i) setSelectedCard(null);
                else setSelectedCard(i);
              }}
              animate={
                isSelected 
                  ? { scale: 1.05, y: -5, zIndex: 1 }
                  : selectedCard !== null
                    ? { scale: 0.98, y: 0, zIndex: 0 }
                    : { scale: 1, y: 0, zIndex: 0 }
              }
              transition={{ type: "spring", stiffness: 250, damping: 18 }}
            >
              <div className={styles.icon} aria-hidden="true">
                {React.cloneElement(icon, {
                  size: 28,
                  stroke: "#2563eb",
                  strokeWidth: 2,
                })}
              </div>
              <h3 className={styles.featureTitle}>{title}</h3>
              <p className={styles.featureDesc}>{description}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
