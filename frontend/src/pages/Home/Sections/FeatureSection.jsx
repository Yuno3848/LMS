import React from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Calendar,
  Users,
  BarChart3,
  Target,
  Lightbulb,
  Clock,
  Award,
  BookOpen,
  MessageSquare,
  Zap,
  Shield,
} from "lucide-react";

const FeaturesSection = () => {
  const mainFeatures = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description:
        "Get personalized study recommendations based on your learning patterns and progress",
      features: [
        "Smart content curation",
        "Adaptive learning paths",
        "Performance predictions",
      ],
    },
    {
      icon: Calendar,
      title: "Smart Study Planner",
      description:
        "Organize your study schedule with intelligent planning that adapts to your goals",
      features: [
        "Automated scheduling",
        "Deadline reminders",
        "Time optimization",
      ],
    },
    {
      icon: Users,
      title: "Collaborative Learning",
      description:
        "Connect with study groups and peers for enhanced learning experiences",
      features: [
        "Study group matching",
        "Peer discussions",
        "Shared resources",
      ],
    },
  ];

  const allFeatures = [
    {
      icon: BarChart3,
      title: "Progress Analytics",
      desc: "Detailed insights into your learning journey",
    },
    {
      icon: Target,
      title: "Goal Tracking",
      desc: "Set and achieve your academic milestones",
    },
    {
      icon: Lightbulb,
      title: "Smart Flashcards",
      desc: "AI-generated cards for optimal retention",
    },
    {
      icon: Clock,
      title: "Pomodoro Timer",
      desc: "Built-in focus sessions with break reminders",
    },
    {
      icon: Award,
      title: "Gamification",
      desc: "Earn points, badges, and level up your learning",
    },
    {
      icon: BookOpen,
      title: "Resource Library",
      desc: "Access to curated study materials and resources",
    },
    {
      icon: MessageSquare,
      title: "AI Tutor Chat",
      desc: "Get instant help with your study questions",
    },
    {
      icon: Zap,
      title: "Quick Notes",
      desc: "Capture ideas and insights on the go",
    },
    {
      icon: Shield,
      title: "Offline Mode",
      desc: "Study anywhere without internet connectivity",
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.4 }}
      className="w-full max-w-7xl mx-auto mb-20 px-6"
    >
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="mb-6 inline-flex items-center px-6 py-3 rounded-full bg-[#fffaf2]/90 backdrop-blur-sm border border-[#e0c9a6]/50 shadow-lg">
          <span className="text-2xl mr-3">🚀</span>
          <span className="text-[#6b4226] font-semibold text-lg">
            Powerful Features
          </span>
        </div>
        <h2 className="text-5xl md:text-6xl font-extrabold text-[#6b4226] mb-6 leading-tight">
          Everything You Need to
          <span className="bg-gradient-to-r from-[#8c5e3c] to-[#b08968] bg-clip-text text-transparent block">
            Master Your Studies
          </span>
        </h2>
        <p className="text-[#6b4226]/70 text-xl max-w-3xl mx-auto leading-relaxed">
          Discover a comprehensive suite of tools designed to transform your
          learning experience and help you achieve academic excellence
        </p>
      </div>

      {/* Main Features */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
        {mainFeatures.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="group p-8 bg-[#fffaf2]/80 backdrop-blur-sm rounded-3xl border border-[#e0c9a6]/40 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#b08968] to-[#8c5e3c] text-white group-hover:scale-110 transition-transform">
                <Icon size={28} />
              </div>
              <h3 className="text-2xl font-bold text-[#6b4226] mb-4">
                {feature.title}
              </h3>
              <p className="text-[#6b4226]/70 text-base mb-6 leading-relaxed">
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.features.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-center text-[#6b4226]/60 text-sm"
                  >
                    <div className="w-2 h-2 bg-[#b08968] rounded-full mr-3"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>

      {/* Feature Grid */}
      <div className="bg-gradient-to-r from-[#b08968]/5 to-[#8c5e3c]/5 backdrop-blur-sm rounded-3xl border border-[#e0c9a6]/30 p-8 md:p-12">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-[#6b4226] mb-4">
            And So Much More
          </h3>
          <p className="text-[#6b4226]/70 text-lg">
            Explore all the features that make StudyBrew your ultimate learning
            companion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allFeatures.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -3 }}
                className="p-6 bg-[#fffaf2]/60 backdrop-blur-sm rounded-2xl border border-[#e0c9a6]/30 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#b08968] to-[#8c5e3c] text-white">
                  <Icon size={24} />
                </div>
                <h4 className="text-[#6b4226] font-bold text-lg mb-2">
                  {feature.title}
                </h4>
                <p className="text-[#6b4226]/60 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Feature Highlight */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="mt-16 text-center"
      >
        <div className="bg-gradient-to-r from-[#8c5e3c]/10 to-[#b08968]/10 backdrop-blur-sm rounded-2xl border border-[#e0c9a6]/40 p-8 md:p-12">
          <div className="text-5xl mb-4">☕</div>
          <h3 className="text-2xl md:text-3xl font-bold text-[#6b4226] mb-4">
            Your Learning Journey, Perfectly Brewed
          </h3>
          <p className="text-[#6b4226]/70 text-lg max-w-2xl mx-auto">
            Just like the perfect cup of coffee, great learning takes time,
            care, and the right ingredients. StudyBrew provides everything you
            need for the perfect study session.
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default FeaturesSection;
