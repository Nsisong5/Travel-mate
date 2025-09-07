import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import styles from "./TestimonialsCarousel.module.css";

const testimonials = [
  {
    id: 1,
    text: "TravelMate made my trip stress-free and fun!",
    author: "Alice W.",
    location: "California"
  },
  {
    id: 2,
    text: "AI recs saved me hours of research!",
    author: "Mark T.",
    location: "New York"
  },
  {
    id: 3,
    text: "Highly recommend for anyone who loves travel!",
    author: "Sophia L.",
    location: "London"
  },
  {
    id: 4,
    text: "Fantastic personalized suggestions.",
    author: "Raj D.",
    location: "Mumbai"
  },
  {
    id: 5,
    text: "Great user experience and smooth navigation.",
    author: "Elena M.",
    location: "Berlin"
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

export default function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);
  const autoPlayInterval = useRef();

  const visibleCount = 3;

  const clampIndex = (i) => ((i + testimonials.length) % testimonials.length);

  useEffect(() => {
    autoPlayInterval.current = setInterval(() => {
      setIndex(i => clampIndex(i + 1));
    }, 6000);
    return () => clearInterval(autoPlayInterval.current);
  }, []);

  const showPrev = () => {
    clearInterval(autoPlayInterval.current);
    setIndex(i => clampIndex(i - 1));
  };

  const showNext = () => {
    clearInterval(autoPlayInterval.current);
    setIndex(i => clampIndex(i + 1));
  };

  // Calculate visible testimonials based on index
  const visibleTestimonials = [];
  for (let i = 0; i < visibleCount; ++i) {
    visibleTestimonials.push(testimonials[clampIndex(index + i)]);
  }

  return (
    <motion.section className={styles.testimonials} initial="hidden" animate="visible" variants={fadeInUp} aria-label="User testimonials carousel">
      <div className={styles.wrapper}>
        <button onClick={showPrev} aria-label="Previous testimonials" className={styles.navBtn} type="button">
          ‹
        </button>
        <div className={styles.slider} ref={containerRef} aria-live="polite" aria-atomic="true">
          <AnimatePresence initial={false}>
            {visibleTestimonials.map(({ id, text, author, location }) => (
              <motion.article
                className={styles.card}
                key={id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                layoutId={`testimonial-${id}`}
                tabIndex={0}
                aria-label={`Testimonial by ${author} from ${location}`}
              >
                <p className={styles.text}>"{text}"</p>
                <p className={styles.author}>{author}</p>
                <p className={styles.location}>{location}</p>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
        <button onClick={showNext} aria-label="Next testimonials" className={styles.navBtn} type="button">
          ›
        </button>
      </div>
    </motion.section>
  );
}
