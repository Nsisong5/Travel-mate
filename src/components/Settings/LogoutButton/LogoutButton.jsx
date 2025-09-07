import React from "react";
import { LogOut } from "lucide-react";
import styles from "./LogoutButton.module.css";

export default function LogoutButton() {
  const handleLogout = () => {
    alert("Logout clicked - implement your logout logic here.");
  };

  return (
    <button className={styles.logoutBtn} onClick={handleLogout} aria-label="Logout from application">
      <LogOut size={20} />
      <span>Logout</span>
    </button>
  );
}
