import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const HeroSection = ({ isVisible }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
      transition={{ duration: 1 }}
      className="flex-1 flex flex-col items-center justify-center text-center px-6 md:px-12 relative z-10 py-20"
    >
      <div className="mb-6 mt-[-1rem] inline-flex items-center px-5 py-2 rounded-full bg-[#fffaf2]/90 backdrop-blur-sm border border-[#e0c9a6]/50 shadow-md">
        <span className="text-2xl mr-2">🎓</span>
        <span className="text-[#6b4226] font-medium">
          Your Learning Companion
        </span>
      </div>

      <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-[#6b4226] leading-tight">
        Welcome to{" "}
        <span className="bg-gradient-to-r from-[#8c5e3c] to-[#b08968] bg-clip-text text-transparent animate-pulse">
          StudyBrew
        </span>
      </h1>

      <p className="text-[#6b4226]/80 max-w-2xl mx-auto text-lg md:text-xl mb-10 leading-relaxed font-medium">
        Your cozy corner to learn, grow, and brew knowledge ☕ <br />
        <span className="opacity-75 text-base md:text-lg">
          Stay motivated and enjoy your study journey with personalized learning
          experiences
        </span>
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-14">
        <Link
          to="/course"
          className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-[#b08968] to-[#8c5e3c] text-white font-bold text-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition"
        >
          <span className="relative z-10">Get Started Free</span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#8c5e3c] to-[#6b4226] opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
        </Link>
        <a
          href="/demo"
          className="px-8 py-4 rounded-full border-2 border-[#d4b996] bg-[#fdfaf7]/80 text-[#6b4226] font-bold text-lg shadow hover:shadow-xl hover:bg-[#fffaf2] hover:border-[#b08968] transform hover:-translate-y-1 transition"
        >
          Watch Demo
        </a>
      </div>
    </motion.section>
  );
};
export default HeroSection;
