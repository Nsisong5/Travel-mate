import React, { useState, useEffect, useRef } from "react";
import styles from "./Navbar.module.css";
import { useTheme } from "../../../ThemeContext";
import { motion, AnimatePresence, useCycle } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Features", href: "#features" },
  { label: "Contact", href: "#contact" },
];

const Path = (props) => (
  <motion.path
    fill="transparent"
    strokeWidth="3"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);

export default function Navbar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const darkMode = theme === "dark";
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [isOpen, toggleOpen] = useCycle(false, true);

  const toggleSidebar = () => {
    setSidebarOpen((open) => !open);
    toggleOpen();
  };

  useEffect(() => {
    if (!sidebarOpen && isOpen) {
      toggleOpen(0);
    }
  }, [sidebarOpen, isOpen, toggleOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && sidebarOpen) {
        setSidebarOpen(false);
        toggleOpen(0);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [sidebarOpen, toggleOpen]);

  useEffect(() => {
    if (!sidebarOpen) return;
    const focusableElements = sidebarRef.current.querySelectorAll(
      'a, button:not([disabled])'
    );
    const firstEl = focusableElements[0];
    const lastEl = focusableElements[focusableElements.length - 1];

    const handleTab = (e) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    };

    document.addEventListener("keydown", handleTab);
    firstEl && firstEl.focus();

    return () => document.removeEventListener("keydown", handleTab);
  }, [sidebarOpen]);

  const sidebarPathVariants = {
    closedTop: { d: "M 2 6 L 20 6" },
    closedMiddle: { d: "M 2 12 L 20 12" },
    closedBottom: { d: "M 2 18 L 20 18" },

    openTop: { d: "M 3 3 L 17 17" },
    openMiddle: { d: "M 10 10 L 10 10" },
    openBottom: { d: "M 3 17 L 17 3" },
  };

  return (
    <>
      <nav className={`${styles.navbar} ${darkMode ? styles.dark : ""}`}>
        <div className={styles.logo} aria-label="TravelMate Logo">
          Travel<span className={styles.logoBlue}>Mate</span>
        </div>

        <ul className={styles.navLinks}>
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <a href={href} className={styles.link}>
                {label}
              </a>
            </li>
          ))}
          <li>
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className={styles.themeToggle}
              type="button"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </li>
        </ul>

        {/* ADD BUTTONS: Visible only on medium+ screens */}
        <div className={styles.rightActions}>
          <button
            className={styles.btnLogin}
            type="button"
            onClick={() => navigate("/Login")}
          >
            Login
          </button>
          <button
            className={styles.btnSignUp}
            type="button"
            onClick={() => navigate("/SignUp")}
          >
            Sign Up
          </button>
        </div>

        {/* Hamburger icon (mobile only) */}
        <button
          onClick={toggleSidebar}
          aria-label={sidebarOpen ? "Close menu" : "Open menu"}
          aria-expanded={sidebarOpen}
          className={styles.hamburger}
          type="button"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor">
            <Path
              variants={{
                closed: sidebarPathVariants.closedTop,
                open: sidebarPathVariants.openTop,
              }}
              animate={isOpen ? "open" : "closed"}
              transition={{ duration: 0.3 }}
            />
            <Path
              variants={{
                closed: sidebarPathVariants.closedMiddle,
                open: sidebarPathVariants.openMiddle,
              }}
              animate={isOpen ? "open" : "closed"}
              transition={{ duration: 0.3 }}
            />
            <Path
              variants={{
                closed: sidebarPathVariants.closedBottom,
                open: sidebarPathVariants.openBottom,
              }}
              animate={isOpen ? "open" : "closed"}
              transition={{ duration: 0.3 }}
            />
          </svg>
        </button>
      </nav>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setSidebarOpen(false);
                toggleOpen(0);
              }}
              aria-hidden="true"
            />

            <motion.aside
              className={`${styles.sidebar} ${darkMode ? styles.dark : ""}`}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 250, damping: 30 }}
              ref={sidebarRef}
              aria-modal="true"
              role="dialog"
              aria-label="Main Menu"
            >
              <nav>
                <ul className={styles.sidebarNavLinks}>
                  {navLinks.map(({ label, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        onClick={() => {
                          setSidebarOpen(false);
                          toggleOpen(0);
                        }}
                        className={styles.sidebarLink}
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div style={{ marginTop: "1.5rem" }}>
                <button
                  onClick={toggleTheme}
                  aria-label="Toggle dark mode"
                  className={styles.themeToggle}
                  type="button"
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>

              <div className={styles.sidebarActions}>
                <button
                  className={styles.btnLogin}
                  type="button"
                  onClick={() => navigate("/Login")}
                >
                  Login
                </button>
                <button
                  className={styles.btnSignUp}
                  type="button"
                  onClick={() => navigate("/SignUp")}
                >
                  Sign Up
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
