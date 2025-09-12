import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./HeroSection.module.css";
import heroImage from "../../../../public/hero2.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function HeroSection() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/onboarding');
  };

  return (
    <motion.section
      className={styles.heroSection}
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      aria-label="Hero Section"
    >
      <img
        src={heroImage}
        alt="Scenic travel destination"
        className={styles.heroImage}
      />
      <div className={styles.buttonsContainer}>
        <button
          className={styles.getStartedBtn}
          onClick={handleGetStarted}
          type="button"
          aria-label="Get Started"
        >
          Get Started
        </button>
        <button
          className={styles.learnMoreBtn}
          type="button"
          aria-label="Learn More"
        >
          Learn More
        </button>
      </div>
    </motion.section>
  );
}



@import "../../Dashboard/theme-vars.css";

.heroSection {
  position: relative;
  width: 100vw;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.heroImage {
  position: relative;
  width: 100%;
  object-fit: cover;
  user-select: none;
}

.buttonsContainer {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: row;
  gap: 1rem;
  z-index: 10;
  width: 70%;
  max-width: 400px;
  align-items: center;
}

.getStartedBtn,
.learnMoreBtn {
  width: 100%;
  padding: 0.8rem 2rem;
  font-weight: 700;
  font-size: .7rem;
  border-radius: 10px;
  text-wrap: no-wrap;
  cursor: pointer;
  user-select: none;
  transition: transform 0.2s ease, background-color 0.25s ease, color 0.25s ease;
  border: none;
  outline-offset: 2px;
  outline: none;
  height: 60%;
  align-text: center;
}

/* Get Started button: primary style */
.getStartedBtn {
  background-color: var(--primary);
  color: var(--panel);
}

.getStartedBtn:hover,
.getStartedBtn:focus-visible {
  background-color: var(--primary-700);
  transform: scale(1.05);
  outline: 2px solid var(--ring);
}

/* Learn More button: subtle outline style */
.learnMoreBtn {
  background: transparent;
  color: var(--panel);
  border: 2px solid var(--panel);
}

.learnMoreBtn:hover,
.learnMoreBtn:focus-visible {
  background-color: var(--panel);
  color: var(--primary);
  transform: scale(1.05);
  outline: 2px solid var(--ring);
}

/* Responsive: on medium and larger screens place buttons horizontally */
@media (min-width: 768px) {
  .buttonsContainer {
    flex-direction: row;
    max-width: 520px;
    width: 90%;
  }
  .getStartedBtn,
  .learnMoreBtn {
    width: auto;
    flex: 1;
  }
  .getStartedBtn {
    margin-right: 1rem;
  }
  .getStartedBtn,
  .learnMoreBtn {
     height: 100%;
     font-size: 1.3rem;
     font-weight: 700;
     padding: 0.9rem 2rem;
     border-radius: 16px;
  }
}



