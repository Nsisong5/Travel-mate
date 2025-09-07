// src/components/CompanyLogos/Logos.jsx
import React from "react";

export function GoogleLogo({ className, ariaHidden = true }) {
  return (
    <svg
      className={className}
      aria-hidden={ariaHidden}
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 533.5 544.3"
    >
      <title>Google logo</title>
      <path fill="#4285f4" d="M533.5 278.4c0-17.5-1.5-34.3-4.4-50.7H272.1v95.9h146.9c-6.3 34-25.1 62.8-53.7 82v68.2h87c51-47 81.2-116 81.2-195.4z" />
      <path fill="#34a853" d="M272.1 544.3c72.8 0 134-24.2 178.6-65.7l-87-68.2c-24.2 16.3-55 25.9-91.6 25.9-70.5 0-130.3-47.7-151.7-111.3H32.9v69.9c44.1 87 134.7 149.4 239.2 149.4z" />
      <path fill="#fbbc04" d="M120.4 324.3c-10.8-32-10.8-66.6 0-98.6V155.8H32.9c-34 67.8-34 147.4 0 215.2l87.5-46.7z" />
      <path fill="#ea4335" d="M272.1 107.7c38.8 0 73.8 13.3 101.3 39.5l75.9-75.9C399.9 24.8 343.1 0 272.1 0 167.6 0 77 62.4 32.9 149.4l87.5 46.7c21.2-63.5 81-111.3 151.7-111.3z" />
    </svg>
  );
}

export function ExpediaLogo({ className, ariaHidden = true }) {
  return (
    <svg
      className={className}
      aria-hidden={ariaHidden}
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 85 49"
    >
      <title>Expedia logo</title>
      <circle cx="24" cy="25" r="23" fill="#FFC107"/>
      <path d="M18 15c-3 0-5 2-5 5 0 3 2 5 5 5s5-2 5-5c0-3-2-5-5-5zm34 18-21-4 7-2-7-2 14-2-10-4 23-2-19 20z" fill="#1E88E5"/>
    </svg>
  );
}

export function AirbnbLogo({ className, ariaHidden = true }) {
  return (
    <svg
      className={className}
      aria-hidden={ariaHidden}
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
    >
      <title>Airbnb logo</title>
      <path fill="#FF5A5F" d="M50 0C22.386 0 0 22.386 0 50c0 27.612 22.386 50 50 50s50-22.388 50-50c0-27.614-22.386-50-50-50zm0 80c-16.57 0-30-13.431-30-30s13.43-30 30-30 30 13.43 30 30-13.43 30-30 30z"/>
      <circle fill="#FF5A5F" cx="50" cy="50" r="13"/>
    </svg>
  );
}

export function BookingLogo({ className, ariaHidden = true }) {
  return (
    <svg
      className={className}
      aria-hidden={ariaHidden}
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1024 1024"
    >
      <title>Booking.com logo</title>
      <rect fill="#003580" width="1024" height="1024" rx="180"/>
      <path fill="#fff" d="M295 697l35.6-123.5h69.4l35 123.5h75l-80.7-251.5h-75l-80.7 251.5h74.4zm8.6-57.1 23.8-85 24.2 85h-48zm462-143h-31.7v46.8h-1c-6.4-12.7-23.6-29.2-54.4-29.2-54.8 0-83 44.3-83 98.7 0 56.6 32 100.1 88.3 100.1 33 0 54.3-13.5 67.4-33.6h1v30.9h31.8v-155zm-33.2 81c0 38.6-22 58-51.7 58-31.2 0-44.5-25.4-44.5-55.7 0-34.4 19.4-58.1 49.1-58.1 29.8 0 47 22.8 47 55.7zm65.4 57h27.5v-134.7h-27v134.7zm84-203.7v72l-26.8-72h-20.5v176h31.8v-85.7l24.4 85.7h15l24-85.7v85.7h31.9v-176h-21l-26.7 72v-72h-32z"/>
    </svg>
  );
}
