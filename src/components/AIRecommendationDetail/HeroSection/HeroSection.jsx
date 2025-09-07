import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import styles from "./HeroSection.module.css";

export default function HeroSection({ image, title, location, settlement_type }) {
  const navigate = useNavigate();
  return (
    <section className={styles.heroSection}>
      <img src={image} alt={title} className={styles.heroImage} />
      <button
        className={styles.backButton}
        onClick={() => navigate(-1)}
        aria-label="Go back"
        type="button"
      >
        <ArrowLeft size={24} />
      </button>
      <div className={styles.heroText}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>
          {location} &middot; {settlement_type}
        </p>
      </div>
    </section>
  );
}
