import React from "react";
import styles from "./Footer.module.css";
import { Twitter, Facebook, Instagram } from "lucide-react";
import { useTheme } from "../../../ThemeContext";


const footerLinks = [
  { label: "Home", href: "#" },
  { label: "Features", href: "#features" },
  { label: "About", href: "#advantages" },
  { label: "Contact", href: "#contact" },
];

// Map social labels to corresponding Lucide icons
const socialIconComponents = {
  Twitter: Twitter,
  Facebook: Facebook,
  Instagram: Instagram,
};

const socialIcons = [
  { label: "Twitter", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
];

export default function Footer() {
  const {theme} = useTheme()
  return (
    <footer
      className={`${styles.footer} ${theme ? styles.dark : ""}`}
      role="contentinfo"
      aria-label="Footer"
    >
      <div className={styles.branding}>
        <span className={styles.logo}>
          Travel<span className={styles.logoBlue}>Mate</span>
        </span>
        <p>&copy; {new Date().getFullYear()} TravelMate, Inc.</p>
      </div>

      <nav aria-label="Footer navigation" className={styles.footerNav}>
        <ul className={styles.navList}>
          {footerLinks.map(({ label, href }) => (
            <li key={label}>
              <a href={href} className={styles.navLink}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.social}>
        {socialIcons.map(({ label, href }) => {
          const IconComponent = socialIconComponents[label];
          return (
            <a
              key={label}
              href={href}
              aria-label={label}
              className={styles.socialIcon}
            >
              {IconComponent ? (
                <IconComponent 
                  size={20} 
                  strokeWidth={1.5} 
                  aria-hidden="true" 
                  className={theme ? styles.socialIconDark : styles.socialIconLight}
                />
              ) : (
                <span aria-hidden="true">{label}</span>
              )}
            </a>
          );
        })}
      </div>
    </footer>
  );
}
