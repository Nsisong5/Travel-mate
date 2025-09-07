import React, { useState } from "react";
import styles from "./ContactForm.module.css";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      alert(`Message sent: ${JSON.stringify(formData)}`); // mock
      setFormData({ name: "", email: "", message: "" });
      setSubmitting(false);
    }, 1000);
  };

  return (
    <section className={styles.contactSection} aria-label="Quick Reach Out Contact Form">
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          autoComplete="name"
          disabled={submitting}
          aria-label="Name"
          id="contact."
        />
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email"
          disabled={submitting}
          aria-label="Email"
        />
        <textarea
          className={styles.textarea}
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          disabled={submitting}
          aria-label="Message"
        />
        <button
          className={styles.submitBtn}
          type="submit"
          disabled={submitting}
          aria-busy={submitting}
        >
          {submitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </section>
  );
}
