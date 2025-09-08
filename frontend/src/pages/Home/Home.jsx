import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  BarChart3,
  Users,
  Facebook,
  Twitter,
  Instagram,
  Coffee,
} from "lucide-react";

import { Link } from "react-router";

import Header from "../../components/Header";


const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5e6ca] via-[#fefaf5] to-[#e7d3b5] flex flex-col relative overflow-hidden">
      {/* Background decorative blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#d4b996]/30 to-[#b08968]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-[#8c5e3c]/20 to-[#6b4226]/10 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute bottom-28 left-1/3 w-28 h-28 bg-gradient-to-br from-[#b08968]/20 to-[#d4b996]/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 text-2xl opacity-30"
        >
          ☕
        </motion.div>
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          className="absolute top-1/3 right-1/4 text-xl opacity-20"
        >
          ☕
        </motion.div>
      </div>

      <Header />

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
          transition={{ duration: 1 }}
        >
          <div className="mb-6 inline-flex items-center px-5 py-2 rounded-full bg-[#fffaf2]/90 backdrop-blur-sm border border-[#e0c9a6]/50 shadow-md">
            <span className="text-2xl mr-2">🎓</span>
            <span className="text-[#6b4226] font-medium">
              Your Learning Companion
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-extrabold mb-6 text-[#6b4226] leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-[#8c5e3c] to-[#b08968] bg-clip-text text-transparent animate-pulse">
              StudyBrew
            </span>
          </h2>

          <p className="text-[#6b4226]/80 max-w-2xl mx-auto text-lg md:text-xl mb-10 leading-relaxed font-medium">
            Your cozy corner to learn, grow, and brew knowledge ☕ <br />
            <span className="opacity-75 text-base md:text-lg">
              Stay motivated and enjoy your study journey with personalized
              learning experiences
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-14">
            <a
              href="/signup"
              className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-[#b08968] to-[#8c5e3c] text-white font-bold text-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition"
            >
              <span className="relative z-10">Get Started Free</span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#8c5e3c] to-[#6b4226] opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
            </a>
            <a
              href="/demo"
              className="px-8 py-4 rounded-full border-2 border-[#d4b996] bg-[#fdfaf7]/80 text-[#6b4226] font-bold text-lg shadow hover:shadow-xl hover:bg-[#fffaf2] hover:border-[#b08968] transform hover:-translate-y-1 transition"
            >
              Watch Demo
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
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
            ].map((feature, i) => (
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
        </motion.div>
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
