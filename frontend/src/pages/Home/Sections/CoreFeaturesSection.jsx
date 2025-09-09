import React from "react";
import { motion } from "framer-motion";
import { BookOpen, BarChart3, Users } from "lucide-react";

const CoreFeaturesSection = () => {
  const features = [
    {
      icon: <BookOpen />,
      title: "Smart Learning",
      desc: "Personalized study plans tailored to your style",
    },
    {
      icon: <BarChart3 />,
      title: "Progress Tracking",
      desc: "Visualize your journey with powerful analytics",
    },
    {
      icon: <Users />,
      title: "Study Groups",
      desc: "Connect with peers and learn together",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.2 }}
      className="w-full max-w-6xl mx-auto mb-20 px-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, y: -5 }}
            className="p-6 bg-[#fffaf2]/70 backdrop-blur-sm rounded-2xl border border-[#e0c9a6]/40 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#b08968] to-[#8c5e3c] text-white">
              {feature.icon}
            </div>
            <h3 className="text-[#6b4226] font-bold text-lg mb-2">
              {feature.title}
            </h3>
            <p className="text-[#6b4226]/70 text-sm">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default CoreFeaturesSection;
