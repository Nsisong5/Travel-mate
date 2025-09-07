import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, BellOff, Settings } from "lucide-react";
import { useTheme } from "../../../ThemeContext";
import ProfileSidebar from "../ProfileSidebar/ProfileSidebar";
import styles from "./UserProfileHeader.module.css";

export default function UserProfileHeader() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Notification toggle state persisted in localStorage
  const [notifEnabled, setNotifEnabled] = useState(() => {
    const saved = localStorage.getItem("travelmate-notifications");
    return saved === null ? true : saved === "true";
  });

  useEffect(() => {
    localStorage.setItem("travelmate-notifications", notifEnabled);
  }, [notifEnabled]);

  // Profile sidebar open state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on outside click
  const sidebarRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    }
    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <>
      <header className={styles.header} aria-label="User Profile Header">
        <button
          type="button"
          className={styles.backBtn}
          aria-label="Go back"
          onClick={() => window.history.back()}
        >
          <ArrowLeft size={24} />
        </button>
        <nav className={styles.rightIcons}>
          <button
            type="button"
            aria-pressed={notifEnabled}
            aria-label={notifEnabled ? "Disable notifications" : "Enable notifications"}
            onClick={() => setNotifEnabled((v) => !v)}
            className={styles.iconBtn}
          >
            {notifEnabled ? (
              <Bell size={22} color="var(--primary)" />
            ) : (
              <BellOff size={22} color="var(--muted)" />
            )}
          </button>
          <button
            type="button"
            aria-haspopup="true"
            aria-expanded={sidebarOpen}
            aria-label="Open settings menu"
            className={styles.iconBtn}
            onClick={() => setSidebarOpen(true)}
          >
            <Settings size={24} color="var(--primary)" />
          </button>
        </nav>
      </header>

      <ProfileSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        sidebarRef={sidebarRef}
      />
    </>
  );
}
