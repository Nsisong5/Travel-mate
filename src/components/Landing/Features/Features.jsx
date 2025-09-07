import React from "react";
import { Map, Cpu, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import styles from "./Features.module.css";

const features = [
  {
    icon: <Map size={28} />,
    title: "Plan Trips",
    description: "Easy planning"
  },
  {
    icon: <Cpu size={28} />,
    title: "AI Recs",
    description: "Smart insights"
  },
  {
    icon: <MapPin size={28} />,
    title: "Destinations",
    description: "Discover more"
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function Features() {
  return (
    <motion.section
      className={styles.features}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      aria-label="Feature highlights"
      transition={{ staggerChildren: 0.3 }}
      id="features"
    >
      {features.map(({ icon, title, description }, i) => (
        <motion.article key={i} className={styles.featureCard} variants={fadeInUp} tabIndex={0}>
          <div className={styles.iconWrapper}>{icon}</div>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.desc}>{description}</p>
        </motion.article>
      ))}
    </motion.section>
  );
}
