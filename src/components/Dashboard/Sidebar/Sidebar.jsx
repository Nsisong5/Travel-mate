import React, { forwardRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Clock, History, Cpu, Bookmark, Settings, X } from "lucide-react";
import styles from "./Sidebar.module.css";

const menuItems = [
  { label: "Dashboard", icon: <Home size={20} />, key: "dashboard" },
  { label: "Upcoming Trips", icon: <Clock size={20} />, key: "upcoming" },
  { label: "Trip History", icon: <History size={20} />, key: "history" },
  { label: "AI Recommendations", icon: <Cpu size={20} />, key: "ai" },
  { label: "Saved Places", icon: <Bookmark size={20} />, key: "saved" },
];

const activeKey = "dashboard";

const Sidebar = forwardRef(function Sidebar({ open, onClose }, ref) {
  // --- BEGIN: Click outside to close ---
  useEffect(() => {
    if (!open) return;

    function handleClick(e) {
      if (ref && ref.current && !ref.current.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, ref, onClose]);
  // --- END: Click outside to close ---

  useEffect(() => {
    if (open && ref && ref.current) {
      ref.current.focus();
    }
  }, [open, ref]);

  return (
    <motion.aside
      className={`${styles.sidebar} ${open ? styles.mobileOpen : ""}`}
      initial={open ? { x: -260 } : { x: 0 }}
      animate={open ? { x: 0 } : { x: -260 }}
      exit={{ x: -260 }}
      transition={{ type: "spring", stiffness: 400, damping: 40 }}
      role="navigation"
      aria-label="Main sidebar navigation"
      ref={ref}
      tabIndex={-1}
      style={{ zIndex: 1000 }}
    >
      <div className={styles.mobileHeader}>
        <span className={styles.sidebarTitle}>Menu</span>
        <button
          className={styles.closeBtn}
          aria-label="Close sidebar"
          onClick={onClose}
          tabIndex={0}
        >
          <X size={22} />
        </button>
      </div>
      <nav className={styles.nav}>
        {menuItems.map(({ label, icon, key }) => (
          key === "settings" ? (
            <Link
              to="/settings"
              key={key}
              className={styles.navItem}
              tabIndex={0}
              onClick={onClose}
            >
              <span className={styles.icon}>{icon}</span>
              <span className={styles.label}>{label}</span>
             </Link>) 
             :key === "upcoming"?(
             <Link
              to ="/upcoming/filter"
              key={key}
              className={`${styles.navItem} ${key === activeKey ? styles.active : ""}`}
              aria-current={key === activeKey ? "page" : undefined}
              tabIndex={0}
              >
              <span className={styles.icon}>{icon}</span>
              <span className={styles.label}>{label}</span>
            </Link>)        
            :(<Link
              to={`/${key}`}
              key={key}
              className={`${styles.navItem} ${key === activeKey ? styles.active : ""}`}
              aria-current={key === activeKey ? "page" : undefined}
              tabIndex={0}
            >
              <span className={styles.icon}>{icon}</span>
              <span className={styles.label}>{label}</span>
            </Link>
          )
        ))}
      </nav>
    </motion.aside>
  );
});

export default Sidebar;
