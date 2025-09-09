import React from "react";
import { motion } from "framer-motion";
import { Zap, Brain, Shield, Heart } from "lucide-react";

const WhyChooseUsSection = () => {
  const reasons = [
    {
      icon: <Zap />,
      title: "Lightning Fast",
      desc: "Quick access to all your study materials",
    },
    {
      icon: <Brain />,
      title: "AI-Powered",
      desc: "Smart recommendations based on your progress",
    },
    {
      icon: <Shield />,
      title: "Secure & Private",
      desc: "Your data is protected with enterprise-grade security",
    },
    {
      icon: <Heart />,
      title: "Made with Love",
      desc: "Crafted by educators who understand learning",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3 }}
      className="w-full max-w-6xl mx-auto mb-20 px-6"
    >
      <div className="text-center mb-12">
        <div className="mb-4 inline-flex items-center px-5 py-2 rounded-full bg-[#fffaf2]/90 backdrop-blur-sm border border-[#e0c9a6]/50 shadow-md">
          <span className="text-xl mr-2">✨</span>
          <span className="text-[#6b4226] font-medium">Why Choose Us</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-[#6b4226] mb-4">
          More Than Just Learning
        </h2>
        <p className="text-[#6b4226]/70 text-lg max-w-2xl mx-auto">
          Experience a comprehensive learning platform designed with your
          success in mind
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reasons.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, y: -5 }}
            className="p-6 bg-[#fffaf2]/70 backdrop-blur-sm rounded-2xl border border-[#e0c9a6]/40 shadow-lg hover:shadow-xl transition-all text-center"
          >
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-[#b08968] to-[#8c5e3c] text-white">
              {item.icon}
            </div>
            <h3 className="text-[#6b4226] font-bold text-base mb-2">
              {item.title}
            </h3>
            <p className="text-[#6b4226]/60 text-sm">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default WhyChooseUsSection;
