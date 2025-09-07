import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "../../ThemeContext";
import { fadeInUp, staggerUp } from "./variants";
import styles from "./DashboardLayout.module.css";
import "./theme-vars.css";
import { MapPin, Building, CreditCard } from "lucide-react";
import Sidebar from "./Sidebar/Sidebar";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    document.body.classList.toggle("sidebar-open", sidebarOpen);
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
      sidebarRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }

    const onKeyDown = e => {
      if (sidebarOpen && e.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("sidebar-open");
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <div data-theme={theme} className={styles.page}>
      <AnimatePresence>
        {(sidebarOpen || window.innerWidth >= 1024) && (
          <Sidebar
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            ref={sidebarRef}
          />
        )}
      </AnimatePresence>
      <main className={styles.content}>
        <header className={styles.header}>
          {window.innerWidth < 1024 && (
            <button
              className={styles.hamburger}
              aria-label="Open sidebar menu"
              onClick={() => setSidebarOpen(true)}
              tabIndex={0}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
                <rect y="6" width="28" height="4" rx="2" fill="var(--primary)" />
                <rect y="16" width="28" height="4" rx="2" fill="var(--primary)" />
              </svg>
            </button>
          )}
          <h1 className={styles.title}>Dashboard</h1>
        </header>
       { children }
      </main>
    </div>
  );
}
