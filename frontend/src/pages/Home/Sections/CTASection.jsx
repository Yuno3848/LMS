import React from "react";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 1.1 }}
      className="w-full max-w-4xl mx-auto mb-20 px-6"
    >
      <div className="bg-gradient-to-r from-[#8c5e3c] to-[#b08968] rounded-3xl p-8 md:p-12 text-center text-white shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Transform Your Learning?
        </h2>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of students who have already discovered the joy of
          effective learning with StudyBrew
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/signup"
            className="px-8 py-4 rounded-full bg-white text-[#8c5e3c] font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition hover:bg-[#fffaf2]"
          >
            Start Learning Today
          </a>
          <a
            href="/pricing"
            className="px-8 py-4 rounded-full border-2 border-white/30 text-white font-bold text-lg hover:bg-white/10 hover:border-white/60 transform hover:-translate-y-1 transition"
          >
            View Pricing
          </a>
        </div>
      </div>
    </motion.section>
  );
};

export default CTASection;
