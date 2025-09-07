import React from "react";
import styles from "./CompanyAdvantages.module.css";
import { motion } from "framer-motion";
import checklist from "../../../../public/image-14.png";
import weatherEdit from "../../../../public/weather-edit.png";
import { useTheme } from "../../../ThemeContext";

const advantages = [
  {
    title: "Seamless Booking",
    description:
      "Book flights with a few clicks, compare options, and save your favorites.",
    imgSrc: "https://via.placeholder.com/150?text=Booking",
  },
  {
    title: "Real-Time Weather",
    description:
      "Get instant weather updates for your destinations, so you’re always prepared.",
    imgSrc: weatherEdit,
  },
  {
    title: "Personalized Checklist",
    description:
      "Never forget essentials with your smart, customizable travel checklist.",
    imgSrc: checklist,
  },
];

export default function CompanyAdvantages() {
  const { theme } = useTheme();
  return (
    <section
      id="advantages"
      className={`${styles.advantages} ${theme === "dark" ? styles.dark : ""}`}
      aria-label="Company Advantages"
    >
      <h2 className={styles.title}>Why Choose TravelMate?</h2>
      <div className={styles.cardsContainer}>
        {advantages.map(({ title, description, imgSrc }, i) => (
          <motion.article
            key={title}
            className={styles.card}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.3, duration: 0.6, ease: "easeOut" }}
            tabIndex={0}
            aria-label={`${title} advantage`}
          >
            <div className={styles.imageWrapper}>
              <img
                src={imgSrc}
                alt={`${title} illustration`}
                className={styles.cardImage}
                loading="lazy"
              />
            </div>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardDescription}>{description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
