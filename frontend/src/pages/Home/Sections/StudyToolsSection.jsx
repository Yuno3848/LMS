import React from "react";
import { motion } from "framer-motion";
import {
  Target,
  Calendar,
  Award,
  Lightbulb,
  CheckCircle,
  BarChart3,
} from "lucide-react";

const StudyToolsSection = () => {
  const tools = [
    {
      icon: <Target />,
      title: "Goal Setting",
      desc: "Set and track your academic milestones",
    },
    {
      icon: <Calendar />,
      title: "Study Planner",
      desc: "Organize your study schedule effectively",
    },
    {
      icon: <Award />,
      title: "Achievements",
      desc: "Earn badges and celebrate your progress",
    },
    {
      icon: <Lightbulb />,
      title: "Flash Cards",
      desc: "Interactive cards for better retention",
    },
    {
      icon: <CheckCircle />,
      title: "Task Manager",
      desc: "Keep track of assignments and deadlines",
    },
    {
      icon: <BarChart3 />,
      title: "Analytics",
      desc: "Detailed insights into your learning patterns",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.9 }}
      className="w-full max-w-6xl mx-auto mb-20 px-6"
    >
      <div className="text-center mb-12">
        <div className="mb-4 inline-flex items-center px-5 py-2 rounded-full bg-[#fffaf2]/90 backdrop-blur-sm border border-[#e0c9a6]/50 shadow-md">
          <span className="text-xl mr-2">🛠️</span>
          <span className="text-[#6b4226] font-medium">Powerful Tools</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-[#6b4226] mb-4">
          Everything You Need to Excel
        </h2>
        <p className="text-[#6b4226]/70 text-lg max-w-2xl mx-auto">
          Comprehensive study tools designed to maximize your learning potential
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05, y: -5 }}
            className="p-6 bg-[#fffaf2]/70 backdrop-blur-sm rounded-2xl border border-[#e0c9a6]/40 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#b08968] to-[#8c5e3c] text-white">
              {tool.icon}
            </div>
            <h3 className="text-[#6b4226] font-bold text-base mb-2">
              {tool.title}
            </h3>
            <p className="text-[#6b4226]/60 text-sm">{tool.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default StudyToolsSection;
