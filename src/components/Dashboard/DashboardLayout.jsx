import React, { useState, useRef, useEffect, useContext } from "react";
import { AnimatePresence } from "framer-motion";
import { useTheme } from "../../ThemeContext";
import styles from "./DashboardLayout.module.css";
import "./theme-vars.css";
import Sidebar from "./Sidebar/Sidebar";
import { AuthContext } from "../../AuthProvider"; // Backend API integration point
import { Helmet } from "react-helmet"
export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const { theme } = useTheme();
  const { user } = useContext(AuthContext) || { user: null }; // Backend user data integration

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

  // Backend integration: User initials generation from API data
  const getInitials = (u) => {
    const source = u?.full_name || u?.name || u?.email || "";
    const parts = source.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    if (source.includes("@")) return source[0].toUpperCase();
    return (source[0] || "U").toUpperCase();
  };

  // Backend integration: Navigation handlers
  const handleGoOnboarding = () => window.location.href = "/onboarding";
  const handleGoProfile = () => window.location.href = "/settings";

  return (
    <div data-theme={theme} className={styles.page}>      
     <Helmet> 
       <meta  
        name="viewport"
        content="width=device-width, initial-scale=1.0"/>
      </Helmet>
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
        {/* Fixed header with consistent positioning and theme-aware elements */}
        <header className={styles.header}>
          {/* Hamburger menu - positioned consistently */}
          {window.innerWidth < 1024 && (
            <button
              className={styles.hamburger}
              aria-label="Open sidebar menu"
              onClick={() => setSidebarOpen(true)}
              tabIndex={0}
            >
              <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
                <rect y="6" width="28" height="4" rx="2" fill="currentColor" />
                <rect y="16" width="28" height="4" rx="2" fill="currentColor" />
              </svg>
            </button>
          )}

          <h1 className={styles.title}>Dashboard</h1>

          {/* Theme-aware right side container with fixed positioning */}
          <div className={styles.headerRight}>
            {user && (
              <button
                className={styles.headerAvatarBtn}
                onClick={handleGoProfile}
                aria-label="Go to Profile"
                title="Go to Profile"
                tabIndex={0}
              >
                {user.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt={user.full_name || user.name || "User"}
                    className={styles.headerAvatarImg}
                    onError={(e) => { e.target.style.display = "none"; }}
                    loading="lazy"
                  />
                ) : (
                  <span className={styles.headerAvatarFallback}>
                    {getInitials(user)}
                  </span>
                )}
              </button>
            )}

            {/* Theme-aware Plan Trip button with improved visibility */}
            <button
              type="button"
              className={styles.planTripBtn}
              onClick={handleGoOnboarding}
              aria-label="Plan a Trip"
              tabIndex={0}
            >
              Plan a Trip
            </button>
          </div>
        </header>
        
        {/* Children container with theme consistency */}
        <div className={styles.childrenContainer}>
          {children}
        </div>
      </main>
    </div>
  );
}
