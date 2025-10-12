import React from "react";
import styles from "./ActionBar.module.css";
import { Heart, Share2 } from "lucide-react";

export default function ActionBar() {
  return (
    <nav className={styles.actionBar} aria-label="Action bar">
 
      
      <button className={styles.btnPlan} type="button" aria-label="Plan a Trip">
        Add to itinerary
      </button>
      <button className={styles.btnShare} type="button" aria-label="Share destination">
        <Share2 size={20} />
        <span>Share</span>
      </button>
    </nav>
  );
}
