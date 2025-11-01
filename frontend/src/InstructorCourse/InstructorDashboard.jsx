import React from "react";
import { BookOpen, Plus, ChevronRight, Sparkles } from "lucide-react";
import { Link } from "react-router";
import { useSelector } from "react-redux";

const InstructorDashboard = () => {
  const instructorCourses = useSelector(
    (state) => state.course.instructorCourses
  );

  console.log("instructor dashboard courses : ", instructorCourses)
  const instructorProfile = useSelector(
    (state) => state.instructorProfile.profile
  );


  const stats = [
    {
      label: "Active Courses",
      value: instructorCourses?.length || 0,
      icon: BookOpen,
      color: "from-amber-500 to-amber-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5e6ca] via-[#fefaf5] to-[#e7d3b5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#6b4226] mb-2 flex items-center gap-2">
                Welcome back, {instructorProfile?.name || "Instructor"}!
                <Sparkles className="w-6 h-6 text-amber-500" />
              </h1>
              <p className="text-[#6b4226]/70">
                Here's what's happening with your courses today
              </p>
            </div>
            <Link
              to="/create-course"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#b08968] to-[#8c5e3c] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5"
            >
              <Plus className="w-5 h-5" />
              Create New Course
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative rounded-2xl shadow-lg bg-white backdrop-blur-sm border border-[#e0c9a6] overflow-hidden group hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#6b4226]/30 group-hover:text-[#6b4226]/60 transition" />
                </div>
                <p className="text-sm font-medium text-[#6b4226]/60 mb-1">
                  {stat.label}
                </p>
                <h3 className="text-3xl font-bold text-[#6b4226]">
                  {stat.value}
                </h3>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-[#b08968]/5 to-transparent opacity-0 group-hover:opacity-100 transition pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Courses List */}
        <div className="bg-white backdrop-blur-sm rounded-2xl shadow-lg border border-[#e0c9a6] overflow-hidden">
          <div className="p-6 border-b border-[#e0c9a6]/50 bg-gradient-to-r from-[#fdfaf7] to-[#f9f3ec]">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#6b4226] flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                My Courses
              </h2>
              <span className="px-3 py-1 bg-[#b08968]/10 text-[#6b4226] rounded-full text-sm font-semibold">
                {instructorCourses?.length || 0}{" "}
                {instructorCourses?.length === 1 ? "Course" : "Courses"}
              </span>
            </div>
          </div>

          <div className="p-6">
            {instructorCourses && instructorCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {instructorCourses.map((course) => (
                  <Link
                    key={course._id}
                    to={`/course-section/${course._id}`}
                    className="block bg-gradient-to-br from-[#fdfaf7] to-[#f9f3ec] rounded-xl border border-[#e0c9a6]/50 hover:shadow-lg transition-all duration-300 hover:border-[#b08968]/30 group overflow-hidden"
                  >
                    {/* Thumbnail */}
                    <div className="relative h-48 bg-gradient-to-br from-[#b08968] to-[#8c5e3c] overflow-hidden p-3">
                      {course.thumbnail?.url ? (
                        <img
                          src={course.thumbnail.url}
                          alt={course.title}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <BookOpen className="w-12 h-12 text-white/80" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-[#6b4226] text-base mb-1 line-clamp-2 group-hover:text-[#8c5e3c] transition">
                            {course.title}
                          </h3>
                          <p className="text-sm text-[#6b4226]/60">
                            {course.category || "Uncategorized"}
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-[#6b4226]/30 group-hover:text-[#6b4226] group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#e0c9a6]/30 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-[#6b4226]/40" />
                </div>
                <h3 className="text-lg font-semibold text-[#6b4226] mb-2">
                  No courses yet
                </h3>
                <p className="text-[#6b4226]/60 mb-4">
                  Create your first course to get started
                </p>
                <Link
                  to="/create-course"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#b08968] to-[#8c5e3c] text-white rounded-lg font-medium hover:shadow-lg transition"
                >
                  <Plus className="w-4 h-4" />
                  Create Course
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
