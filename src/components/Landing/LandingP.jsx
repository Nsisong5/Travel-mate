import React from "react";
import { Helmet } from "react-helmet"
import { useTheme } from "../../ThemeContext";
import styles from "./LandingPage.module.css";
import HeroSection from "./HeroSection/HeroSection";
import Features from "./Features/Features";
import DestinationsPreview from "./DestinationsPreview/DestinationsPreview";
import TestimonialsCarousel from "./TestimonialsCarousel/TestimonialsCarousel";
import CTABanner from "./CTABanner/CTABanner";
import CompanyLogos from "./CompanyLogos/CompanyLogos";
import ContactForm from "./ContactForm/ContactForm";
import Footer from "./Footer/Footer";
import Navbar from "../LandingPage/Navbar/Navbar";

export default function LandingP() {
  const { theme } = useTheme();

  return (
    <div className={styles.landingWrapper} data-theme={theme}>
          
      <Helmet> 
       <meta  
        name="viewport"
        content="width=1024, initial-scale=1.0"/>
      </Helmet>
     
      <header className={styles.header}>
        <Navbar />
      </header>

      {/* Main content container with proper spacing and responsiveness */}
      <main className={styles.mainContent}>
        {/* Hero section - full viewport with proper constraints */}
        <section className={styles.heroContainer}>
          <HeroSection />
        </section>

        {/* Features section with contained width and proper spacing */}
        <section className={styles.featuresContainer}>
          <Features />
        </section>

        {/* Destinations preview with responsive layout */}
        <section className={styles.destinationsContainer}>
          <DestinationsPreview />
        </section>

        {/* Testimonials with full-width background but constrained content */}
        <section className={styles.testimonialsContainer}>
          <TestimonialsCarousel />
        </section>

        {/* CTA banner with emphasis styling */}
        <section className={styles.ctaContainer}>
          <CTABanner />
        </section>

        {/* Company logos with subtle background */}
        <section className={styles.logosContainer}>
          <CompanyLogos />
        </section>

        {/* Contact form with proper spacing */}
        <section className={styles.contactContainer} id="contact">
          <ContactForm />
        </section>
      </main>
          
      <footer className={styles.footerContainer}>
        <Footer />
      </footer>
    </div>
  );
}