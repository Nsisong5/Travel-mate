import React, { useState } from "react";
import styles from "./SendMail.module.css";
import { useTheme } from "../../../ThemeContext";

export default function SendMail() {
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for reaching out, ${formData.name}! (This is a placeholder)`);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
      className={styles.contact}
      data-theme={theme}
      aria-labelledby="contactHeading"
    >
      <h2 id="contactHeading" className={styles.title}>
        Get in Touch
      </h2>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <label htmlFor="name" className={styles.label}>
          Name
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
            className={styles.input}
          />
        </label>
        <label htmlFor="email" className={styles.label}>
          Email
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
            className={styles.input}
            autoComplete="email"
          />
        </label>
        <label htmlFor="message" className={styles.label}>
          Message
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message here..."
            required
            className={styles.textarea}
          />
        </label>
        <button
          type="submit"
          className={styles.submitButton}
          aria-label="Send message"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}
