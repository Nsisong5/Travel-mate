import React from "react";
import HeroSection from "./HeroSection/HeroSection";
import Features from "./Features/Features";
import DestinationsPreview from "./DestinationsPreview/DestinationsPreview";
import TestimonialsCarousel from "./TestimonialsCarousel/TestimonialsCarousel";
import CTABanner from "./CTABanner/CTABanner";
import CompanyLogos from "./CompanyLogos/CompanyLogos";
import ContactForm from "./ContactForm/ContactForm";
import Footer from "./Footer/Footer";
import Navbar from "../LandingPage/Navbar/Navbar"


export default function LandingP() {
  return (
     <>
      <header>
        <Navbar/>
      </header>
      <main>
        <HeroSection />
        <Features />
        <DestinationsPreview />
        <TestimonialsCarousel />
        <CTABanner />
        <CompanyLogos />
        <ContactForm id="contact"/>
        <Footer />
      </main> 
     </>    
  );
}
