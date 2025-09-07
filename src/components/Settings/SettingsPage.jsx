import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileCard from "./ProfileCard/ProfileCard";
import ThemeToggle from "./ThemeToggle/ThemeToggle";
import CurrencySelector from "./CurrencySelector/CurrencySelector";
import NotificationToggle from "./NotificationToggle/NotificationToggle";
import LogoutButton from "./LogoutButton/LogoutButton";
import styles from "./SettingsPage.module.css";

export default function SettingsPage() {
  const navigate = useNavigate();

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <button
          onClick={() => navigate("/dashboard")}
          className={styles.backBtn}
          aria-label="Back to Dashboard"
        >
          ← Back to Dashboard
        </button>
        <h1 className={styles.title}>Settings</h1>
      </header>
      <section className={styles.settingsList}>
        <ProfileCard />
        <ThemeToggle />
        <CurrencySelector />
        <NotificationToggle />
        <LogoutButton />
      </section>
    </main>
  );
}
