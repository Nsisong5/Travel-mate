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

export function FacebookLogo({ className, ariaHidden = true }) {
  return (
    <svg
      className={className}
      aria-hidden={ariaHidden}
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 216 216"
    >
      <title>Facebook logo</title>
      <path
        fill="#1877F2"
        d="M204.1 0H11.9C5.3 0 0 5.3 0 11.9v192.2c0 6.6 5.3 11.9 11.9 11.9h103.6V132.2h-28v-32.6h28v-24c0-27.6 16.8-42.6 41.3-42.6 11.8 0 22 0.9 25 1.3v29h-17.2c-13.5 0-16.1 6.4-16.1 15.8v20.5h32.2l-4.2 32.6h-28v95.7h54.8c6.6 0 11.9-5.3 11.9-11.9V11.9C216 5.3 210.7 0 204.1 0z"
      />
      <path fill="#fff" d="M150.7 132.2l4.2-32.6h-32.2v-20.5c0-9.4 2.6-15.8 16.1-15.8h17.2v-29c-3-0.4-13.2-1.3-25-1.3-24.5 0-41.3 15-41.3 42.6v24h-28v32.6h28v95.7h33.6v-95.7h28z" />
    </svg>
  );
}
