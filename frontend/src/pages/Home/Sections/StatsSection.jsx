import React from "react";
import { motion } from "framer-motion";
import { Users, Clock, TrendingUp, Star } from "lucide-react";

const StatsSection = () => {
  const stats = [
    { number: "50K+", label: "Active Students", icon: <Users /> },
    { number: "1M+", label: "Study Sessions", icon: <Clock /> },
    { number: "95%", label: "Success Rate", icon: <TrendingUp /> },
    { number: "4.9/5", label: "User Rating", icon: <Star /> },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.7 }}
      className="w-full max-w-6xl mx-auto mb-20 px-6"
    >
      <div className="bg-gradient-to-r from-[#b08968]/10 to-[#8c5e3c]/10 backdrop-blur-sm rounded-3xl border border-[#e0c9a6]/40 p-8 md:p-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#6b4226] mb-4">
            Join Thousands of Successful Learners
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full bg-gradient-to-br from-[#b08968] to-[#8c5e3c] text-white">
                {stat.icon}
              </div>
              <div className="text-2xl md:text-3xl font-bold text-[#6b4226] mb-1">
                {stat.number}
              </div>
              <div className="text-[#6b4226]/70 text-sm font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default StatsSection;
