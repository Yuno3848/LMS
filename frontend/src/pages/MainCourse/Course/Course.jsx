import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Clock,
  Users,
  Star,
  BookOpen,
  PlayCircle,
  Award,
  TrendingUp,
  ChevronDown,
  Grid3X3,
  List,
  Coffee,
} from "lucide-react";

const Course = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    "All",
    "Programming",
    "Mathematics",
    "Science",
    "Business",
    "Languages",
    "Design",
    "Psychology",
    "History",
    "Literature",
  ];

  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  const courses = [
    {
      id: 1,
      title: "Complete JavaScript Mastery",
      instructor: "Sarah Chen",
      category: "Programming",
      level: "Intermediate",
      duration: "12 hours",
      students: 2847,
      rating: 4.8,
      price: 89,
      image: "🚀",
      description:
        "Master modern JavaScript from basics to advanced concepts with hands-on projects",
      lessons: 45,
      isPopular: true,
      progress: 0,
      tags: ["JavaScript", "Web Development", "ES6+"],
    },
    {
      id: 2,
      title: "Advanced Calculus & Analysis",
      instructor: "Dr. Michael Torres",
      category: "Mathematics",
      level: "Advanced",
      duration: "20 hours",
      students: 1523,
      rating: 4.9,
      price: 120,
      image: "📐",
      description:
        "Deep dive into calculus concepts with real-world applications",
      lessons: 68,
      isPopular: false,
      progress: 0,
      tags: ["Calculus", "Analysis", "Mathematics"],
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      instructor: "Emma Rodriguez",
      category: "Design",
      level: "Beginner",
      duration: "8 hours",
      students: 3241,
      rating: 4.7,
      price: 65,
      image: "🎨",
      description:
        "Learn the principles of user-centered design and create stunning interfaces",
      lessons: 32,
      isPopular: true,
      progress: 0,
      tags: ["UI Design", "UX Design", "Figma"],
    },
    {
      id: 4,
      title: "Introduction to Psychology",
      instructor: "Prof. James Wilson",
      category: "Psychology",
      level: "Beginner",
      duration: "15 hours",
      students: 1876,
      rating: 4.6,
      price: 75,
      image: "🧠",
      description:
        "Explore the fascinating world of human behavior and mental processes",
      lessons: 52,
      isPopular: false,
      progress: 0,
      tags: ["Psychology", "Behavior", "Mental Health"],
    },
    {
      id: 5,
      title: "Business Strategy & Analytics",
      instructor: "Lisa Kumar",
      category: "Business",
      level: "Intermediate",
      duration: "18 hours",
      students: 2156,
      rating: 4.8,
      price: 110,
      image: "📊",
      description: "Master strategic thinking and data-driven decision making",
      lessons: 61,
      isPopular: true,
      progress: 0,
      tags: ["Strategy", "Analytics", "Business"],
    },
    {
      id: 6,
      title: "Spanish Conversation Mastery",
      instructor: "Carlos Martinez",
      category: "Languages",
      level: "Intermediate",
      duration: "10 hours",
      students: 1634,
      rating: 4.7,
      price: 55,
      image: "🗣️",
      description: "Achieve fluency through immersive conversation practice",
      lessons: 40,
      isPopular: false,
      progress: 0,
      tags: ["Spanish", "Conversation", "Language"],
    },
    {
      id: 7,
      title: "Quantum Physics Explained",
      instructor: "Dr. Anna Peterson",
      category: "Science",
      level: "Advanced",
      duration: "25 hours",
      students: 987,
      rating: 4.9,
      price: 140,
      image: "⚛️",
      description:
        "Unravel the mysteries of quantum mechanics with clear explanations",
      lessons: 75,
      isPopular: false,
      progress: 0,
      tags: ["Physics", "Quantum", "Science"],
    },
    {
      id: 8,
      title: "Creative Writing Workshop",
      instructor: "Rachel Green",
      category: "Literature",
      level: "Beginner",
      duration: "6 hours",
      students: 2234,
      rating: 4.5,
      price: 45,
      image: "✍️",
      description: "Develop your creative voice and storytelling skills",
      lessons: 28,
      isPopular: false,
      progress: 0,
      tags: ["Writing", "Creativity", "Literature"],
    },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || course.category === selectedCategory;
    const matchesLevel =
      selectedLevel === "All" || course.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.students - a.students;
      case "rating":
        return b.rating - a.rating;
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "newest":
        return b.id - a.id;
      default:
        return 0;
    }
  });

  const CourseCard = ({ course, isListView = false }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: isListView ? 1.01 : 1.03, y: -5 }}
      className={`group p-6 bg-[#fffaf2]/80 backdrop-blur-sm rounded-2xl border border-[#e0c9a6]/40 shadow-lg hover:shadow-xl transition-all cursor-pointer ${
        isListView ? "flex gap-6 items-center" : ""
      }`}
    >
      {/* Course Image/Icon */}
      <div
        className={`${
          isListView ? "w-20 h-20 flex-shrink-0" : "w-full h-48 mb-4"
        } bg-gradient-to-br from-[#b08968]/20 to-[#8c5e3c]/20 rounded-xl flex items-center justify-center text-6xl ${
          isListView ? "text-4xl" : ""
        }`}
      >
        {course.image}
      </div>

      <div className={isListView ? "flex-1" : ""}>
        {/* Course Header */}
        <div
          className={`${
            isListView ? "flex justify-between items-start mb-2" : "mb-4"
          }`}
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              {course.isPopular && (
                <span className="px-2 py-1 bg-gradient-to-r from-[#b08968] to-[#8c5e3c] text-white text-xs font-semibold rounded-full">
                  Popular
                </span>
              )}
              <span className="px-2 py-1 bg-[#e0c9a6]/30 text-[#6b4226] text-xs font-medium rounded-full">
                {course.level}
              </span>
            </div>
            <h3
              className={`text-[#6b4226] font-bold ${
                isListView ? "text-lg" : "text-xl"
              } mb-2 group-hover:text-[#8c5e3c] transition`}
            >
              {course.title}
            </h3>
            <p className="text-[#6b4226]/70 text-sm mb-2">
              by {course.instructor}
            </p>
          </div>
          {isListView && (
            <div className="text-right">
              <div className="text-2xl font-bold text-[#8c5e3c] mb-1">
                ${course.price}
              </div>
              <div className="flex items-center gap-1 text-sm text-[#b08968]">
                <Star className="w-4 h-4 fill-current" />
                <span>{course.rating}</span>
              </div>
            </div>
          )}
        </div>

        {/* Course Description */}
        {!isListView && (
          <p className="text-[#6b4226]/60 text-sm mb-4 line-clamp-2">
            {course.description}
          </p>
        )}

        {/* Course Stats */}
        <div
          className={`${
            isListView ? "flex items-center justify-between" : "mb-4"
          }`}
        >
          <div className="flex items-center gap-4 text-sm text-[#6b4226]/70">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>{course.lessons} lessons</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{course.students.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Course Tags */}
        {!isListView && (
          <div className="flex flex-wrap gap-2 mb-4">
            {course.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-[#e0c9a6]/20 text-[#6b4226]/80 text-xs rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Course Footer */}
        {!isListView && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-[#b08968]">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-medium">{course.rating}</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-[#8c5e3c]">
              ${course.price}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5e6ca] via-[#fefaf5] to-[#e7d3b5] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#d4b996]/20 to-[#b08968]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-[#8c5e3c]/15 to-[#6b4226]/10 rounded-full blur-2xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <div className="mb-6 inline-flex items-center px-6 py-3 rounded-full bg-[#fffaf2]/90 backdrop-blur-sm border border-[#e0c9a6]/50 shadow-lg">
            <Coffee className="w-6 h-6 mr-3 text-[#8c5e3c]" />
            <span className="text-[#6b4226] font-semibold text-lg">
              Course Catalog
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#6b4226] mb-6 leading-tight">
            Discover Your Next
            <span className="bg-gradient-to-r from-[#8c5e3c] to-[#b08968] bg-clip-text text-transparent block">
              Learning Adventure
            </span>
          </h1>
          <p className="text-[#6b4226]/70 text-xl max-w-3xl mx-auto leading-relaxed">
            Explore our carefully curated collection of courses designed to brew
            knowledge and accelerate your growth
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-[#fffaf2]/80 backdrop-blur-sm rounded-2xl border border-[#e0c9a6]/40 p-6 shadow-lg">
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#6b4226]/60 w-5 h-5" />
              <input
                type="text"
                placeholder="Search courses, instructors, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-[#fffaf2]/60 border border-[#e0c9a6]/30 rounded-xl focus:outline-none focus:border-[#b08968] text-[#6b4226] placeholder-[#6b4226]/50"
              />
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                {/* Category Filter */}
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="appearance-none bg-[#fffaf2] border border-[#e0c9a6]/30 rounded-lg px-4 py-2 pr-8 text-[#6b4226] focus:outline-none focus:border-[#b08968]"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6b4226]/60 pointer-events-none" />
                </div>

                {/* Level Filter */}
                <div className="relative">
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="appearance-none bg-[#fffaf2] border border-[#e0c9a6]/30 rounded-lg px-4 py-2 pr-8 text-[#6b4226] focus:outline-none focus:border-[#b08968]"
                  >
                    {levels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6b4226]/60 pointer-events-none" />
                </div>

                {/* Sort By */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-[#fffaf2] border border-[#e0c9a6]/30 rounded-lg px-4 py-2 pr-8 text-[#6b4226] focus:outline-none focus:border-[#b08968]"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest First</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#6b4226]/60 pointer-events-none" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[#6b4226]/70 text-sm">
                  {sortedCourses.length} courses found
                </span>
                <div className="flex bg-[#e0c9a6]/20 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded ${
                      viewMode === "grid"
                        ? "bg-[#b08968] text-white"
                        : "text-[#6b4226]/60"
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded ${
                      viewMode === "list"
                        ? "bg-[#b08968] text-white"
                        : "text-[#6b4226]/60"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Course Grid/List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`${
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "space-y-4"
          }`}
        >
          {sortedCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CourseCard course={course} isListView={viewMode === "list"} />
            </motion.div>
          ))}
        </motion.div>

        {/* No Results */}
        {sortedCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">☕</div>
            <h3 className="text-2xl font-bold text-[#6b4226] mb-2">
              No courses found
            </h3>
            <p className="text-[#6b4226]/70">
              Try adjusting your search criteria or browse our popular
              categories
            </p>
          </motion.div>
        )}

        {/* Load More Button (if needed) */}
        {sortedCourses.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
          >
            <button className="px-8 py-4 bg-gradient-to-r from-[#b08968] to-[#8c5e3c] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition">
              Load More Courses
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Course;
