import React from "react";
import styles from "./ProfileForm.module.css";

export default function ProfileForm({ data, onChange, errors }) {
  return (
    <section className={styles.section} aria-label="Profile information form">
      <FormField
        id="fullName"
        label="Full Name"
        type="text"
        value={data.fullName}
        onChange={(v) => onChange("fullName", v)}
        error={errors.fullName}
        required
      />
      <FormField
        id="email"
        label="Email Address"
        type="email"
        value={data.email}
        onChange={(v) => onChange("email", v)}
        error={errors.email}
        required
      />
      <FormField
        id="phone"
        label="Phone Number"
        type="tel"
        value={data.phone}
        onChange={(v) => onChange("phone", v)}
        error={errors.phone}
        required
      />
      <FormField
        id="location"
        label="Location (City, Country)"
        type="text"
        value={data.location}
        onChange={(v) => onChange("location", v)}
        error={errors.location}
        required
      />
      <FormTextarea
        id="bio"
        label="Bio / About Me"
        value={data.bio}
        onChange={(v) => onChange("bio", v)}
      />
    </section>
  );
}

function FormField({ id, label, type, value, onChange, error, required }) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>
        {label}{required ? " *" : ""}
      </span>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${styles.input} ${error ? styles.error : ""}`}
        aria-required={required}
        aria-invalid={!!error}
      />
    </label>
  );
}

function FormTextarea({ id, label, value, onChange }) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={styles.textarea}
        rows={4}
      />
    </label>
  );
}
