import React from "react";
import { motion } from "framer-motion";
import { Tag, Save } from "lucide-react";
import styles from "./RecommendationGrid.module.css";
const fadeStagger = {
  hidden: {}, visible: { transition: { staggerChildren: 0.12 } }
};
const fadeUpVariant = {
  hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 }
};

export default function RecommendationGrid({ recommendations, loading,onSave, viewDetail}) {
  if (loading) {
    return (
      <div className={styles.grid}>
        {[...Array(6)].map((_, i) => <div key={i} className={`${styles.card} ${styles.skeleton}`} />)}
      </div>
    );
  }
  if (!recommendations.length) {
    return (
      <section className={styles.emptyState}>
        <Tag size={48} className={styles.emptyIcon} />
        <p>No recommendations available yet.</p>
      </section>
    );
  }
  return (
    <motion.section className={styles.grid} initial="hidden" animate="visible" variants={fadeStagger}>
      {recommendations.map(({ id, title, description, image, tags, location }) => (
        <motion.article key={id} className={styles.card} variants={fadeUpVariant} whileHover={{ y: -6, boxShadow: "0 10px 30px rgba(0,0,0,0.12)" }}
          whileTap={{ scale: 0.97 }} tabIndex={0} role="button" aria-label={`View details for ${title}`}>
          <img src={image} alt={location} className={styles.image} />
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
          <div className={styles.tags}>
            {tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
            <button type="button" className={styles.saveBtn} aria-label={`Save recommendation: ${title}`} onClick={()=>onSave(id)}>
              <Save size={16} />
            </button>
          </div>
          <button className={styles.viewBtn} type="button" onClick={()=>viewDetail(id)}>View Details</button>
        </motion.article>
      ))}
    </motion.section>
  );
}
