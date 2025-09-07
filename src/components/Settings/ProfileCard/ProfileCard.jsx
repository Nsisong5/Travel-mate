import React from "react";
import { User } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./ProfileCard.module.css";

export default function ProfileCard() {
  return (
    <section className={styles.profileCard} aria-label="User Profile Information">
      <div className={styles.avatar}>
        <User size={64} />
      </div>
      <h2 className={styles.username}>Jane Doe</h2>
      <Link to="/profile-edit" className={styles.editLink}>
        Edit Profile
      </Link>
    </section>
  );
}
