import React from "react";
import { Search } from "lucide-react";
import styles from "./Filters.module.css";

export default function Filters({ filter, setFilter, sortBy, setSortBy, search, setSearch, types, sortOptions }) {
  return (
    <div className={styles.controls}>
      <nav aria-label="Recommendation Type" className={styles.filterNav}>
        {types.map(type => (
          <button key={type} type="button" className={`${styles.filterBtn} ${filter === type ? styles.filterActive : ""}`}
            onClick={() => setFilter(type)} aria-pressed={filter === type}>{type}</button>
        ))}
      </nav>
      <div className={styles.sortSearch}>
        <select className={styles.sortSelect} value={sortBy} onChange={e => setSortBy(e.target.value)} aria-label="Sort By">
          {sortOptions.map(option => <option key={option} value={option}>{option}</option>)}
        </select>
        <div className={styles.searchWrapper}>
          <Search size={18} className={styles.searchIcon} />
          <input type="search" className={styles.searchInput} placeholder="Search recommendations..." aria-label="Search recommendations"
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>
    </div>
  );
}
