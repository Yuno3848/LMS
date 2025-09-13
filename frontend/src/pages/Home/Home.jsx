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

      <footer className="py-8 px-6 text-center bg-[#fffaf2]/90 backdrop-blur-sm border-t border-[#e0c9a6]/40 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <Coffee className="w-6 h-6 text-[#6b4226]" />
            <span className="text-[#6b4226] font-bold">StudyBrew</span>
          </div>
          <div className="flex gap-6 text-sm text-[#6b4226]/70">
            <a href="/privacy" className="hover:text-[#8c5e3c] transition">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-[#8c5e3c] transition">
              Terms of Service
            </a>
            <a href="/contact" className="hover:text-[#8c5e3c] transition">
              Contact
            </a>
          </div>
          <div className="flex gap-4 text-[#6b4226]/70">
            <Facebook className="w-5 h-5 hover:text-[#8c5e3c] cursor-pointer transition" />
            <Twitter className="w-5 h-5 hover:text-[#8c5e3c] cursor-pointer transition" />
            <Instagram className="w-5 h-5 hover:text-[#8c5e3c] cursor-pointer transition" />
          </div>
        </div>
        <p className="mt-4 text-xs text-[#6b4226]/60">
          © {new Date().getFullYear()} StudyBrew. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
