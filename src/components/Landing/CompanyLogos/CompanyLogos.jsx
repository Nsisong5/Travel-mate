import React from "react";
import styles from "./CompanyLogos.module.css";
import { GoogleLogo, AirbnbLogo, ExpediaLogo, BookingLogo } from "./Logos";

const logos = [
  { id: 1, alt: "Google", Component: GoogleLogo },
  { id: 2, alt: "Expedia", Component: ExpediaLogo },
  { id: 3, alt: "Airbnb", Component: AirbnbLogo },
  { id: 4, alt: "Booking.com", Component: BookingLogo },
];

export default function CompanyLogos() {
  return (
    <section className={styles.logosSection} aria-label="Renowned company logos">
      <div className={styles.logosGrid}>
        {logos.map(({ id, alt, Component }) => (
          <Component key={id} aria-label={alt} className={styles.logoImg} />
        ))}
      </div>
    </section>
  );
}
