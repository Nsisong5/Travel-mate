import React, { useState } from "react";
import { DollarSign } from "lucide-react";
import styles from "./CurrencySelector.module.css";

const currencies = [
  { code: "USD", label: "USD", flag: "🇺🇸" },
  { code: "EUR", label: "EUR", flag: "🇪🇺" },
  { code: "GBP", label: "GBP", flag: "🇬🇧" },
  { code: "JPY", label: "JPY", flag: "🇯🇵" },
  { code: "NGN", label: "NGN", flag: "🇳🇬" },
];

export default function CurrencySelector() {
  const [selected, setSelected] = useState("USD");

  return (
    <section className={styles.container} aria-label="Currency preference selector">
      <label htmlFor="currency" className={styles.label}>
        <DollarSign size={20} color="var(--primary)" />
        <span className={styles.labelText}>Currency Preference</span>
      </label>
      <select
        id="currency"
        className={styles.select}
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        aria-live="polite"
      >
        {currencies.map(({ code, label, flag }) => (
          <option key={code} value={code}>{flag} {label}</option>
        ))}
      </select>
    </section>
  );
}
