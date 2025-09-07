import React from "react";
import { Download, MessageSquare } from "lucide-react";
import styles from "./TripActions.module.css";

export default function TripActions() {
  return (
    <section className={styles.actions}>
      <button className={styles.downloadBtn} onClick={() => alert("Download Receipt placeholder")}>
        <Download size={18} /> <span>Download Receipt</span>
      </button>
      <button className={styles.contactBtn} onClick={() => alert("Contact Support placeholder")}>
        <MessageSquare size={18} /> <span>Contact Support</span>
      </button>
    </section>
  );
}
 