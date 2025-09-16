import React, { useEffect, useState } from "react";
import { Coffee, Facebook, Twitter, Instagram } from "lucide-react";
import HeroSection from "./Sections/HeroSection";
import CoreFeaturesSection from "./Sections/CoreFeaturesSection";
import WhyChooseUsSection from "./Sections/WhyChooseUsSection";
import TestimonialsSection from "./Sections/TestimonialsSection";
import StatsSection from "./Sections/StatsSection";
import StudyToolsSection from "./Sections/StudyToolsSection";
import CTASection from "./Sections/CTASection";
import BackgroundEffects from "./Sections/BackgroundEffect";
import Header from "../../components/Header";
import AboutSection from "./Sections/AboutSection";
import FeaturesSection from "./Sections/FeatureSection";
import Footer from "../../components/Footer";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5e6ca] via-[#fefaf5] to-[#e7d3b5] flex flex-col relative overflow-hidden">
      <BackgroundEffects />

      <Header />

      <main className="flex-1">
        <HeroSection isVisible={isVisible} id="hero" />
        <CoreFeaturesSection />
        <WhyChooseUsSection />
        <TestimonialsSection />
        <div id="about">
          <AboutSection />
        </div>

        <div id="features">
          <FeaturesSection />
        </div>

        <StatsSection />
        <StudyToolsSection />
        <CTASection />
      </main>
      
    </div>
  );
};

export default Home;
