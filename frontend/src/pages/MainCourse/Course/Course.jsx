import React, { useState, useEffect } from "react";
import {
  Clock,
  Users,
  Star,
  BookOpen,
  Grid3X3,
  List,
  Coffee,
  Search,
  Filter,
} from "lucide-react";
import { courseApiFetch } from "../../../ApiFetch/courseApiFetch";
import { Link } from "react-router";

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("all");

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        const response = await courseApiFetch.showCourses();
        const courseList = response?.data?.data || [];

        const formattedCourses = courseList.map((course, index) => ({
          id: course._id || index,
          title: course.title || "Untitled Course",
          description: course.description || "No description available",
          instructor: course.instructorName || course.instructor || "Unknown",
          level: course.difficulty
            ? course.difficulty.charAt(0).toUpperCase() +
              course.difficulty.slice(1)
            : "All Levels",
          lessons: course.itemSection?.length || 0,
          students: course.enrolled || 0,
          duration: course.duration || "",
          tags: course.tags || [],
          price: course.price?.final || course.price?.base || 0,
          currency: course.price?.currency || "USD",
          rating: parseFloat(course.rating) || 0,
          isPopular: course.isPopular || false,
          image: course.thumbnail?.url || "",
        }));

        setCourses(formattedCourses);
        setFilteredCourses(formattedCourses);
      } catch (err) {
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  useEffect(() => {
    let result = courses;

    if (searchTerm) {
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedLevel !== "all") {
      result = result.filter((course) => course.level === selectedLevel);
    }

    setFilteredCourses(result);
  }, [searchTerm, selectedLevel, courses]);

  const levels = ["All Levels", "Beginner", "Intermediate", "Advance"];

  const CourseCard = ({ course, isList }) => {
    return (
      <Link to={`/course-details/${course.id}`}
      
        className={`${
          isList ? "flex gap-6 items-center" : ""
        } p-6 bg-[#fffaf2]/80 rounded-2xl border border-[#e0c9a6]/40 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer`}
      >
        <div
          className={`${
            isList ? "w-20 h-20 flex-shrink-0" : "w-full h-48 mb-4"
          } bg-gradient-to-br from-[#b08968]/20 to-[#8c5e3c]/20 rounded-xl flex items-center justify-center overflow-hidden`}
        >
          {course.image ? (
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className={isList ? "text-4xl" : "text-6xl"}>📚</span>
          )}
        </div>

        <div className={isList ? "flex-1" : ""}>
          <div
            className={
              isList ? "flex justify-between items-start mb-2" : "mb-4"
            }
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                {course.isPopular && (
                  <span className="px-3 py-1 bg-gradient-to-r from-[#b08968] to-[#8c5e3c] text-white text-xs font-semibold rounded-full">
                    Popular
                  </span>
                )}
                <span className="px-3 py-1 bg-[#e0c9a6]/30 text-[#6b4226] text-xs font-medium rounded-full">
                  {course.level}
                </span>
              </div>
              <h3
                className={`text-[#6b4226] font-bold ${
                  isList ? "text-lg" : "text-xl"
                } mb-2 hover:text-[#8c5e3c] transition-colors`}
              >
                {course.title}
              </h3>
              <p className="text-[#6b4226]/70 text-sm mb-2">
                by {course.instructor}
              </p>
            </div>

            {isList && (
              <div className="text-right ml-4">
                <div className="text-2xl font-bold text-[#8c5e3c] mb-1">
                  {course.price > 0
                    ? `${course.currency} ${course.price}`
                    : "Free"}
                </div>
                {course.rating > 0 && (
                  <div className="flex items-center gap-1 text-sm text-[#b08968]">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{course.rating.toFixed(1)}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {!isList && (
            <p className="text-[#6b4226]/60 text-sm mb-4 line-clamp-2">
              {course.description}
            </p>
          )}

          <div
            className={isList ? "flex items-center justify-between" : "mb-4"}
          >
            <div className="flex items-center gap-4 text-sm text-[#6b4226]/70 flex-wrap">
              {course.duration && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
              )}
              {course.lessons > 0 && (
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{course.lessons} lessons</span>
                </div>
              )}
              {course.students > 0 && (
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{course.students.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>

          {!isList && (
            <>
              {course.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.tags.slice(0, 4).map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-[#e0c9a6]/20 text-[#6b4226]/80 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-[#b08968]">
                  {course.rating > 0 && (
                    <>
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium">
                        {course.rating.toFixed(1)}
                      </span>
                    </>
                  )}
                </div>
                <div className="text-2xl font-bold text-[#8c5e3c]">
                  {course.price > 0
                    ? `${course.currency} ${course.price}`
                    : "Free"}
                </div>
              </div>
            </>
          )}
        </div>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5e6ca] via-[#fefaf5] to-[#e7d3b5]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="mb-6 inline-flex items-center px-6 py-3 rounded-full bg-[#fffaf2]/90 border border-[#e0c9a6]/50 shadow-lg">
            <Coffee className="w-6 h-6 mr-3 text-[#8c5e3c]" />
            <span className="text-[#6b4226] font-semibold text-lg">
              Course Catalog
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#6b4226] mb-6">
            Discover Your Next{" "}
            <span className="bg-gradient-to-r from-[#8c5e3c] to-[#b08968] bg-clip-text text-transparent">
              Learning Adventure
            </span>
          </h1>
        </div>

        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b4226]/40" />
            <input
              type="text"
              placeholder="Search courses, instructors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#fffaf2]/80 border border-[#e0c9a6]/40 rounded-xl text-[#6b4226] placeholder-[#6b4226]/40 focus:outline-none focus:ring-2 focus:ring-[#b08968]/50 transition-all"
            />
          </div>

          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2 bg-[#fffaf2]/80 border border-[#e0c9a6]/40 rounded-xl px-4 py-3">
              <Filter className="w-5 h-5 text-[#6b4226]/60" />
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="bg-transparent text-[#6b4226] text-sm font-medium focus:outline-none cursor-pointer"
              >
                <option value="all">All Levels</option>
                {levels
                  .filter((l) => l !== "All Levels")
                  .map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex bg-[#e0c9a6]/20 rounded-xl p-1">
              <button
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-[#b08968] text-white shadow-md"
                    : "text-[#6b4226]/60 hover:text-[#6b4226]"
                }`}
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                className={`p-2 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-[#b08968] text-white shadow-md"
                    : "text-[#6b4226]/60 hover:text-[#6b4226]"
                }`}
                onClick={() => setViewMode("list")}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {loading && (
          <div className="text-center text-[#6b4226]/70 text-lg py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#e0c9a6] border-t-[#8c5e3c] mb-4"></div>
            <p>Loading courses...</p>
          </div>
        )}

        {error && (
          <div className="text-center text-red-700 text-lg py-20 bg-red-50 rounded-xl border border-red-200">
            {error}
          </div>
        )}

        {!loading && !error && filteredCourses.length === 0 && (
          <div className="text-center text-[#6b4226]/70 text-lg py-20">
            <p className="text-2xl mb-2">📚</p>
            <p>No courses found matching your criteria</p>
          </div>
        )}

        {!loading && !error && filteredCourses.length > 0 && (
          <>
            <div className="mb-6 text-[#6b4226]/70 text-sm">
              Showing {filteredCourses.length}{" "}
              {filteredCourses.length === 1 ? "course" : "courses"}
            </div>
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  : "space-y-4"
              }
            >
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  isList={viewMode === "list"}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Course;
