import React, { useState, useRef, useEffect, forwardRef } from "react";
import styles from "./SearchSelect.module.css";

const DESTINATIONS = [
  "Paris", "Tokyo", "New York", "London", "Rome",
  "Lisbon", "Bali", "Reykjavik", "Sydney", "Cape Town",
];

function filterDestinations(query) {
  if (!query) return DESTINATIONS;
  return DESTINATIONS.filter((d) =>
    d.toLowerCase().includes(query.toLowerCase())
  );
}

const SearchSelect = forwardRef(({ value, onChange, placeholder = "Search destination" }, ref) => {
  const [inputValue, setInputValue] = useState(value || "");
  const [filtered, setFiltered] = useState(DESTINATIONS);
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  useEffect(() => {
    setFiltered(filterDestinations(inputValue));
  }, [inputValue]);

  useEffect(() => {
    if (value !== inputValue) {
      setInputValue(value);
    }
  }, [value]);

  const containerRef = useRef();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setOpen(true);
    if (onChange) onChange("");
    setHighlightedIndex(-1);
  };

  const handleSelect = (option) => {
    setInputValue(option);
    setOpen(false);
    if (onChange) onChange(option);
  };

  const handleKeyDown = (e) => {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev <= 0 ? filtered.length - 1 : prev - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0) {
        handleSelect(filtered[highlightedIndex]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const onBlur = (e) => {
    if (!containerRef.current.contains(e.relatedTarget)) {
      setOpen(false);
      setHighlightedIndex(-1);
    }
  };

  return (
    <div
      className={styles.container}
      ref={containerRef}
      role="combobox"
      aria-haspopup="listbox"
      aria-owns="destinations-listbox"
      aria-expanded={open}
      onBlur={onBlur}
    >
      <input
        ref={ref}
        type="text"
        className={styles.input}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        aria-autocomplete="list"
        aria-controls="destinations-listbox"
        aria-activedescendant={
          highlightedIndex >= 0 ? `option-${highlightedIndex}` : undefined
        }
        aria-label="Destination search"
      />
      {open && (
        <ul className={styles.list} role="listbox" id="destinations-listbox">
          {filtered.length === 0 && (
            <li className={styles.noOptions} role="option" aria-disabled="true">
              No destinations found
            </li>
          )}
          {filtered.map((option, idx) => (
            <li
              key={option}
              id={`option-${idx}`}
              role="option"
              aria-selected={highlightedIndex === idx}
              className={`${styles.option} ${highlightedIndex === idx ? styles.highlighted : ""}`}
              tabIndex={-1}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelect(option)}
              onMouseEnter={() => setHighlightedIndex(idx)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default SearchSelect;
