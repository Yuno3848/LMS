import React, { useState } from "react";
import {
  BookOpen,
  Users,
  TrendingUp,
  Star,
  Award,
  DollarSign,
  Calendar,
  MessageSquare,
  Bell,
  Settings,
  Search,
  Plus,
  BarChart3,
  Clock,
  Video,
  FileText,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router";

const InstructorDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Sample data
  const stats = [
    {
      label: "Total Students",
      value: "2,547",
      icon: Users,
      change: "+12%",
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Active Courses",
      value: "12",
      icon: BookOpen,
      change: "+2",
      color: "from-amber-500 to-amber-600",
    },
  ];

  const courses = [
    "Advanced React Development",
    "Python for Data Science",
    "Web Design Masterclass",
    "JavaScript Fundamentals",
    "UI/UX Design Principles",
    "Mobile App Development",
    "Backend Development with Node.js",
    "Database Design & SQL",
    "Cloud Computing Basics",
    "Machine Learning Introduction",
    "Digital Marketing Strategy",
    "Graphic Design Essentials",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5e6ca] via-[#fefaf5] to-[#e7d3b5]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-[#e0c9a6] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#b08968] to-[#8c5e3c] flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#6b4226]">
                  Instructor Dashboard
                </h1>
                <p className="text-xs text-[#6b4226]/60">
                  Welcome back, Instructor
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b4226]/40" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="pl-10 pr-4 py-2 bg-[#fdfaf7] border border-[#e0c9a6] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#b08968]/20"
                />
              </div>
              <button className="relative p-2 hover:bg-[#fdfaf7] rounded-lg transition">
                <Bell className="w-5 h-5 text-[#6b4226]" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-[#fdfaf7] rounded-lg transition">
                <Settings className="w-5 h-5 text-[#6b4226]" />
              </button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#b08968] to-[#8c5e3c] flex items-center justify-center">
                <span className="text-white text-sm font-bold">I</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="mb-8 flex flex-wrap gap-3">
          <Link
            to="/create-course"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#b08968] to-[#8c5e3c] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5" />
            Create Course
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative rounded-2xl shadow-lg bg-white/80 backdrop-blur-sm border border-[#e0c9a6] overflow-hidden group hover:shadow-xl transition"
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold text-[#6b4226]/60 uppercase tracking-wide mb-1">
                      {stat.label}
                    </p>
                    <h3 className="text-3xl font-bold text-[#6b4226] mb-1">
                      {stat.value}
                    </h3>
                    <p className="text-sm text-green-600 font-medium">
                      {stat.change} this month
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#b08968]/5 to-transparent opacity-0 group-hover:opacity-100 transition pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Courses List */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-[#e0c9a6] p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#6b4226] flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              My Courses ({courses.length})
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {courses.map((course, index) => (
              <div
                key={index}
                className="p-4 bg-gradient-to-br from-[#fdfaf7] to-[#f9f3ec] rounded-xl border border-[#e0c9a6]/50 hover:shadow-md transition hover:border-[#b08968]/30 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#b08968] to-[#8c5e3c] flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-[#6b4226] text-sm">
                    {course}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-[#e0c9a6] bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-[#6b4226]/60">
              © 2025 Instructor Dashboard. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-sm text-[#6b4226]/60 hover:text-[#b08968] transition"
              >
                Help Center
              </a>
              <a
                href="#"
                className="text-sm text-[#6b4226]/60 hover:text-[#b08968] transition"
              >
                Documentation
              </a>
              <a
                href="#"
                className="text-sm text-[#6b4226]/60 hover:text-[#b08968] transition"
              >
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default InstructorDashboard;
