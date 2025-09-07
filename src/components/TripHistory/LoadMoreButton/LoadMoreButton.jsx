import React from "react";
import { ChevronDown } from "lucide-react";
import styles from "./LoadMoreButton.module.css";

export default function LoadMoreButton({ onClick }) {
  return (
    <div className={styles.wrapper}>
      <button className={styles.btn} onClick={onClick} aria-label="Load more trips">
        <ChevronDown size={21} />
        <span>Load More</span>
      </button>
    </div>
  );
}
