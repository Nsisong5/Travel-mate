import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import styles from "./TripDetailHeader.module.css";

export default function TripDetailHeader() {
  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <button
        onClick={() => navigate(-1)}
        className={styles.backBtn}
        aria-label="Back to History"
      >
        <ArrowLeft size={22} />
      </button>
      <h1 className={styles.title}>Trip Details</h1>
      <div className={styles.placeholder} /> {/* for centering the title */}
    </header>
  );
}
