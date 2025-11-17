import React from "react";
import { useNavigate } from "react-router-dom";
import { TrendingUp, Play } from "lucide-react";
import useInitDetailedEnrolledCourses from "../../EffectsForApp/useInitDetailedEnrolledCourse";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";

const EnrolledCourses = () => {
  useInitDetailedEnrolledCourses();

  const courseDetails = useSelector((state) => state.enrolled.detailedCourse);
  const navigate = useNavigate();
  

  if (!courseDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdf7ef]">
        <Loading text="Loading your courses..." />
      </div>
    );
  }

  const courses = courseDetails
    .map((c) =>
      c.courseIds.map(
        ({ _id, title, tags, instructor, thumbnail, itemSection }) => {
          const totalLectures = itemSection?.reduce(
            (sum, sec) => sum + (sec.totalLectures || 0),
            0
          );

          return {
            _id,
            title,
            tags,
            instructor,
            thumbnail,
            totalLectures,
          };
        }
      )
    )
    .flat();

  return (
    <div className="min-h-screen bg-[#fdf7ef] px-6 py-10 text-[#5a3d2b]">
      <h1 className="text-3xl font-bold mb-10 ml-2 tracking-tight">
        Your Enrolled Courses
      </h1>

      <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
        {courses.map((course, i) => (
          <div
            key={course._id}
            onClick={() => navigate(`/learn/${course._id}`)}
            className="
              group
              bg-[#fffaf3]/80
              backdrop-blur-sm
              rounded-[22px]
              p-5
              border border-[#e8dccc]
              shadow-[0_4px_12px_rgba(170,145,120,0.12)]
              hover:shadow-[0_8px_20px_rgba(170,145,120,0.22)]
              hover:-translate-y-1
              transition-all duration-300
              cursor-pointer
            "
          >
            {/* Thumbnail */}
            <div className="overflow-hidden rounded-xl">
              <img
                src={course?.thumbnail?.url}
                alt={course.title}
                className="
                  w-full h-44 object-cover 
                  rounded-xl 
                  bg-[#e8d7c5]
                  transition-all duration-300
                  group-hover:scale-[1.05]
                "
              />
            </div>

            {/* Title */}
            <h2 className="text-lg font-semibold mt-4 leading-snug group-hover:text-[#5d402e] transition">
              {course.title}
            </h2>

            {/* Instructor */}
            <p className="text-sm text-[#8b6b55] mt-1">
              {course.instructor?.username}
            </p>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap mt-3">
              {course.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2 py-[3px] text-xs rounded-md bg-[#f1e3d3] text-[#7b5434] border border-[#e6d6c4]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="flex justify-between items-center text-sm mt-6 text-[#7d5b43]">
              <span className="flex items-center gap-1">
                <Play size={15} /> {course.totalLectures} Lectures
              </span>

              <span className="flex items-center gap-1">
                <TrendingUp size={15} />
                Progress: 0%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnrolledCourses;
