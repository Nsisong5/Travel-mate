import React from "react";
import styles from "./LandingPage.module.css";
import { useTheme } from "../../ThemeContext";
import Navbar from "./Navbar/Navbar.jsx";
import HeroSection from "./HeroSection/HeroSection.jsx";
import CompanyAdvantages from "./CompanyAdvantages/CompanyAdvantages.jsx";
import FeaturesSection from "./FeaturesSection/FeaturesSection.jsx";
import SendMail from "./SendMail/SendMail.jsx";
import Footer from "./Footer/Footer.jsx";

export default function LandingPage() {
  const { theme } = useTheme();

  return (
    <div>
      <Navbar />
      <main>
        <HeroSection />
        <CompanyAdvantages />
        <FeaturesSection />
        <SendMail />
      </main>
      <Footer />
    </div>
  );
}
