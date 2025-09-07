import React from "react";
import styles from "./ProfileForm.module.css";

export default function ProfileForm({ data, onChange, errors }) {
  return (
    <section className={styles.section} aria-label="Profile information form">
      <FormField
        id="fullName"
        label="Full Name"
        type="text"
        value={data.full_name}
        onChange={(v) => onChange("full_name", v)} // Fixed: use full_name to match data key
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
      {/* FIXED: Corrected the country field mapping */}
      <FormField
        id="country"
        label="Location (City, Country)"
        type="text"
        value={data.country}
        onChange={(v) => onChange("country", v)} // Fixed: use "country" to match data key
        error={errors.country}
        required
      />
      <FormField
        id="bio"
        label="Bio / About Me"
        type="text"
        value={data.bio}
        onChange={(v) => onChange("bio", v)}
        error={errors.bio}
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
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className={`${styles.input} ${error ? styles.error : ""}`}
        aria-required={required}
        aria-invalid={!!error}
      />
      {error && (
        <span className={styles.errorMessage} role="alert">
          {error}
        </span>
      )}
    </label>
  );
}

function FormTextarea({ id, label, value, onChange, error }) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      <textarea
        id={id}
        name={id}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className={`${styles.textarea} ${error ? styles.error : ""}`}
        rows={4}
      />
      {error && (
        <span className={styles.errorMessage} role="alert">
          {error}
        </span>
      )}
    </label>
  );
}