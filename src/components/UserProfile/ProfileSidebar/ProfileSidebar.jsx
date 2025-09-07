import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sun, Moon, DollarSign, ChevronDown } from "lucide-react";
import { useTheme } from "../../../ThemeContext";
import styles from "./ProfileSidebar.module.css";

const currencies = [
  { code: "USD", label: "USD", flag: "🇺🇸" },
  { code: "EUR", label: "EUR", flag: "🇪🇺" },
  { code: "GBP", label: "GBP", flag: "🇬🇧" },
  { code: "JPY", label: "JPY", flag: "🇯🇵" },
  { code: "NGN", label: "NGN", flag: "🇳🇬" },
];

export default function ProfileSidebar({ open, onClose, sidebarRef }) {
  const { theme, toggleTheme } = useTheme();
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [currency, setCurrency] = useState("USD");

  useEffect(() => {
    if (!open) setCurrencyOpen(false);
  }, [open]);

  const sidebarWidth = currencyOpen ? 320 : 220;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className={styles.overlay}
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            exit={{ opacity: 0 }}
          />
          <motion.aside
            className={styles.sidebar}
            style={{ width: sidebarWidth }}
            ref={sidebarRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 35 }}
            aria-modal="true"
            role="dialog"
          >
            <header className={styles.header}>
              <span className={styles.title}>Settings</span>
              <button
                aria-label="Close settings sidebar"
                className={styles.closeBtn}
                onClick={onClose}
                type="button"
              >
                <X size={22} />
              </button>
            </header>
            <section className={styles.section}>
              <button
                className={styles.themeToggle}
                onClick={toggleTheme}
                type="button"
                aria-label={`Switch to ${
                  theme === "light" ? "dark" : "light"
                } mode`}
              >
                {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
                <span>
                  {theme.charAt(0).toUpperCase() + theme.slice(1)} Mode
                </span>
              </button>
            </section>

            <section className={styles.section}>
              <button
                className={styles.currencyBtn}
                onClick={() => setCurrencyOpen((v) => !v)}
                aria-expanded={currencyOpen}
                aria-controls="currency-list"
                type="button"
              >
                <DollarSign size={20} />
                <span>Currency</span>
                <ChevronDown
                  size={18}
                  className={`${styles.chevron} ${
                    currencyOpen ? styles.chevronOpen : ""
                  }`}
                />
              </button>
              {currencyOpen && (
                <ul id="currency-list" className={styles.currencyList}>
                  {currencies.map(({ code, label, flag }) => (
                    <li key={code}>
                      <button
                        className={`${styles.currencyOption} ${
                          currency === code ? styles.selected : ""
                        }`}
                        onClick={() => {
                          setCurrency(code);
                          setCurrencyOpen(false);
                        }}
                        type="button"
                      >
                        <span className={styles.flag}>{flag}</span> {label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
