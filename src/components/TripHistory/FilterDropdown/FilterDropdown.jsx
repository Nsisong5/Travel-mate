import React from "react";
import { Filter } from "lucide-react";
import styles from "./FilterDropdown.module.css";

const options = ["All", "Completed", "Canceled", "Ongoing","Planned"];
const options2 = ["All"]
export default function FilterDropdown({ value, onChange, plannedPage }) {
  return (
    <div className={styles.dropdownBox}>
      <Filter size={18} className={styles.icon} />
      <select
        className={styles.select}
        value={value}
        onChange={e => onChange(e.target.value)}
        aria-label="Filter trips"
      >
      { 
        plannedPage ? 
          options2.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))      
        :options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
