import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Wallet,
  GraduationCap,
  Users,
  TrendingUp,
  Award,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router";

const InstructorInfoPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
    hover: {
      y: -10,
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const benefits = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Sell Courses",
      description:
        "Upload your courses and share your expertise with students across the globe. Build your educational empire.",
      highlight: false,
    },
    {
      icon: <Wallet className="w-6 h-6" />,
      title: "100% Earnings",
      description:
        "Instructors keep 100% of course sales. Your effort deserves full rewards with zero commission fees.",
      highlight: true,
      badge: "Popular",
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "One-Time Fee",
      description:
        "Begin your journey with just ₹2500. A one-time registration fee with lifetime access, no hidden costs.",
      highlight: false,
    },
  ];

  const stats = [
    {
      number: "2.5K+",
      label: "Active Instructors",
      icon: <Users className="w-5 h-5" />,
    },
    {
      number: "₹50L+",
      label: "Instructor Earnings",
      icon: <TrendingUp className="w-5 h-5" />,
    },
    {
      number: "98%",
      label: "Instructor Satisfaction",
      icon: <Award className="w-5 h-5" />,
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#fff8f2] via-[#fef6f0] to-[#fdf2e9] overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#b08968]/10 to-[#8c5e3c]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#d4a574]/10 to-[#b08968]/5 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        className="relative z-10 flex flex-col items-center px-6 py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="mb-8" variants={itemVariants}>
          <motion.span
            className="px-6 py-3 text-sm font-semibold bg-white/80 backdrop-blur-sm shadow-lg rounded-full flex items-center gap-3 border border-[#e0c9a6]/40"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-2 h-2 bg-gradient-to-r from-[#b08968] to-[#8c5e3c] rounded-full animate-pulse"></div>
            <GraduationCap className="w-4 h-4 text-[#6b4226]" />
            Instructor Program
            <Sparkles className="w-4 h-4 text-[#b08968]" />
          </motion.span>
        </motion.div>

        <motion.div
          className="text-center mb-16 max-w-4xl"
          variants={itemVariants}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-[#5c3620] via-[#6b4226] to-[#8c5e3c] bg-clip-text text-transparent mb-6 leading-tight"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Empower Education,
            <br />
            <span className="relative">
              Earn with Freedom
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#b08968] to-[#8c5e3c] rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1 }}
              />
            </span>
          </motion.h1>
          <motion.p
            className="text-xl text-[#6b4226]/80 leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Become an instructor and unlock new possibilities. Share your
            knowledge, inspire students, and take home{" "}
            <motion.span
              className="font-bold text-[#5c3620] relative"
              whileHover={{ scale: 1.1 }}
            >
              100% of your earnings
            </motion.span>
            .
          </motion.p>
        </motion.div>

        <motion.div className="w-full max-w-4xl mb-16" variants={itemVariants}>
          <div className="bg-gradient-to-r from-[#b08968]/10 to-[#8c5e3c]/10 backdrop-blur-sm rounded-3xl border border-[#e0c9a6]/40 p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 + i * 0.1 }}
                >
                  <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-xl bg-gradient-to-br from-[#b08968] to-[#8c5e3c] text-white shadow-lg">
                    {stat.icon}
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-[#5c3620] mb-1">
                    {stat.number}
                  </div>
                  <div className="text-[#6b4226]/70 text-sm font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mb-16"
          variants={containerVariants}
        >
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              className={`relative bg-white/80 backdrop-blur-sm shadow-xl rounded-3xl p-8 border ${
                benefit.highlight
                  ? "border-[#b08968] ring-2 ring-[#b08968]/20"
                  : "border-[#e0c9a6]/40"
              } overflow-hidden group cursor-pointer`}
              variants={cardVariants}
              whileHover="hover"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#b08968]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {benefit.badge && (
                <motion.span
                  className="absolute top-4 right-4 bg-gradient-to-r from-[#5c3620] to-[#6b4226] text-white text-xs px-3 py-1 rounded-full shadow-lg"
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, delay: 1.5 }}
                >
                  {benefit.badge}
                </motion.span>
              )}

              <motion.div
                className={`w-14 h-14 flex items-center justify-center rounded-2xl mb-6 ${
                  benefit.highlight
                    ? "bg-gradient-to-br from-[#b08968] to-[#8c5e3c] text-white shadow-lg"
                    : "bg-gradient-to-br from-[#e6d4c5] to-[#d4c4b0] text-[#5c3620]"
                }`}
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                {benefit.icon}
              </motion.div>

              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-[#5c3620] mb-3">
                  {benefit.title}
                </h2>
                <p className="text-[#6b4226]/80 leading-relaxed">
                  {benefit.description}
                </p>
              </div>

              {/* Hover Arrow */}
              <motion.div
                className="absolute bottom-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-[#5c3620] text-white opacity-0 group-hover:opacity-100"
                initial={{ x: 10 }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="text-center" variants={itemVariants}>
          <motion.button
            className="group relative px-12 py-5 bg-gradient-to-r from-[#5c3620] via-[#6b4226] to-[#5c3620] text-white text-lg font-bold rounded-2xl shadow-2xl overflow-hidden"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 25px 50px -12px rgba(92, 54, 32, 0.5)",
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />

            <Link
              to="/create-instructor-profile"
              className="relative z-10 flex items-center gap-3"
            >
              Join as Instructor
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </Link>
          </motion.button>

          <motion.p
            className="mt-4 text-[#6b4226]/60 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.8 }}
          >
            Start your teaching journey today • No monthly fees • Full control
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default InstructorInfoPage;
