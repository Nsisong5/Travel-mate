import React from "react";
import { Search } from "lucide-react";
import styles from "./SearchInput.module.css";

export default function SearchInput({ value, onChange }) {
  return (
    <div className={styles.searchBox}>
      <Search size={18} className={styles.icon} />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        className={styles.input}
        placeholder="Search trips..."
        aria-label="Search trips"
      />
    </div>
  );
}
