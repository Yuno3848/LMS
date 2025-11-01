import React, { useEffect, useState } from "react";
import { courseApiFetch } from "../../../ApiFetch/courseApiFetch";
import { useParams } from "react-router";
import {
  Clock,
  Users,
  Award,
  CheckCircle,
  Play,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { addCourse } from "../../../redux/slicers/cartSlicer";

const CourseDetails = () => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const { courseId } = useParams();
  const [cart, setCart] = useState("Add To Cart");

  const dispatch = useDispatch();

  const handleCart = () => {
    setCart((prev) => (prev == "Add To Cart" ? "Go To Cart" : "Add To Cart"));
    if (cart == "Add To Cart") {
      dispatch(addCourse(course));
    }
  };

  useEffect(() => {
    const fetchCourseById = async () => {
      try {
        setLoading(true);
        const response = await courseApiFetch.getCourseById(courseId);
        const courseData = response?.data?.data;

        if (courseData && courseData._id === courseId) {
          const formattedCourse = {
            id: courseData._id,
            title: courseData.title || "Untitled Course",
            description: courseData.description || "No description available",
            instructor:
              courseData.instructor?.fullname ||
              courseData.instructor?.username ||
              "Unknown",
            instructorEmail: courseData.instructor?.email || "",
            instructorId: courseData.instructor?._id || "",
            level: courseData.difficulty
              ? courseData.difficulty.charAt(0).toUpperCase() +
                courseData.difficulty.slice(1)
              : "All Levels",
            lessons:
              courseData.itemSection?.reduce(
                (total, section) => total + (section.totalLectures || 0),
                0
              ) || 0,
            sections: courseData.itemSection?.length || 0,
            tags: courseData.tags || [],
            price: courseData.price?.final || 0,
            originalPrice: courseData.price?.base || 0,
            currency: courseData.price?.currency || "$",
            image:
              courseData.thumbnail?.url ||
              "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=450&fit=crop",
            category: courseData.category || "General",
            requirements:
              courseData.requirements || "No prerequisites required",
            isPublished: courseData.isPublished || false,
            createdAt: courseData.createdAt,
            updatedAt: courseData.updatedAt,
            itemSection: courseData.itemSection || [],
          };
          setCourse(formattedCourse);
        } else {
          setError("Course not found");
        }
      } catch (err) {
        setError("Failed to load course details");
      } finally {
        setLoading(false);
      }
    };
    fetchCourseById();
  }, [courseId]);

  const discount =
    course?.originalPrice > course?.price && course?.price > 0
      ? Math.round(
          ((course.originalPrice - course.price) / course.originalPrice) * 100
        )
      : 0;

  const handleClick = (sectionId) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  if (loading) {
    return (
      <div className="brew-page min-h-screen flex items-center justify-center">
        <div className="text-xl" style={{ color: "var(--latte-700)" }}>
          Loading course details...
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="brew-page min-h-screen flex items-center justify-center">
        <div className="text-xl" style={{ color: "#dc2626" }}>
          {error || "Course not found"}
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@700&display=swap');
        
        :root {
          --latte-50: #f9f5ee;
          --latte-100: #f6efe3;
          --latte-200: #efe2cd;
          --latte-300: #e6d2b3;
          --latte-400: #d9bd97;
          --latte-500: #caa47a;
          --latte-600: #a7855d;
          --latte-700: #866a49;
          --latte-800: #6b573e;
          --latte-900: #4a3d2b;
          --accent-500: #7c3aed;
          --accent-600: #6a2fd0;
          --radius-lg: 1.25rem;
          --shadow-card: 0 12px 30px rgba(26, 20, 12, 0.08);
        }

        .brew-page {
          background: linear-gradient(180deg, var(--latte-100) 0%, var(--latte-50) 100%);
          font-family: 'Inter', sans-serif;
          color: var(--latte-900);
          padding-bottom: 4rem;
        }

        .brew-container {
          max-width: 80rem;
          margin: 0 auto;
          padding: 2rem 1rem;
        }

        .brew-card, .brew-section {
          background: #fff;
          border: 1px solid var(--latte-100);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-card);
        }

        .brew-media {
          width: 100%;
          height: 12rem;
          object-fit: cover;
          border-radius: var(--radius-lg) var(--radius-lg) 0 0;
        }

        .font-display {
          font-family: 'Poppins', sans-serif;
        }

        .price {
          font-size: 1.875rem;
          font-weight: 800;
        }

        .cta {
          background: var(--accent-500);
          color: #fff;
          border: none;
          border-radius: 0.75rem;
          padding: 0.9rem;
          width: 100%;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }
        .cta:hover {
          background: var(--accent-600);
        }

        .cta-outline {
          background: transparent;
          border: 2px solid var(--latte-900);
          color: var(--latte-900);
          border-radius: 0.75rem;
          padding: 0.9rem;
          width: 100%;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
        }
        .cta-outline:hover {
          background: var(--latte-50);
        }

        .chip {
          background: var(--latte-100);
          color: var(--latte-900);
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.875rem;
        }

        .badge {
          display: inline-block;
          padding: 0.3rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--latte-900);
          background: #facc15;
        }

        .header {
          background: var(--latte-200);
          padding: 3rem 1rem;
          text-align: center;
          border-bottom: 1px solid var(--latte-100);
        }
      `}</style>

      <div className="brew-page">
        {/* Header Section */}
        <div className="header">
          <h1 className="font-display text-4xl mb-2">{course.title}</h1>
          <p className="text-lg" style={{ color: "var(--latte-700)" }}>
            {course.category} • {course.level}
          </p>
        </div>

        {/* Main Body */}
        <div className="brew-container grid lg:grid-cols-3 gap-8">
          {/* Left side content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="brew-section p-6">
              <h2 className="font-display text-2xl mb-3">Description</h2>
              <p>{course.description}</p>
            </div>

            <div className="brew-section p-6">
              <h2 className="font-display text-2xl mb-3">Requirements</h2>
              <p>{course.requirements}</p>
            </div>

            <div className="brew-section p-6">
              <h2 className="font-display text-2xl mb-4">Course Content</h2>
              <div className="text-sm text-muted mb-4">
                {course.sections} sections • {course.lessons} lectures
              </div>

              <div style={{ display: "grid", gap: ".5rem" }}>
                {course.itemSection.map((section) => (
                  <div
                    key={section._id}
                    className="brew-card"
                    style={{ overflow: "hidden" }}
                  >
                    <div
                      className="flex items-center justify-between p-4"
                      style={{
                        background: "var(--latte-50)",
                        cursor: "pointer",
                      }}
                      onClick={() => handleClick(section._id)}
                    >
                      <div className="flex items-center gap-3">
                        {openSections[section._id] ? (
                          <ChevronUp />
                        ) : (
                          <ChevronDown />
                        )}
                        <span className="font-bold">
                          Section {section.orderIndex + 1}: {section.title}
                        </span>
                      </div>
                      <div
                        className="text-sm"
                        style={{ color: "var(--latte-700)" }}
                      >
                        {section.totalLectures} lectures
                      </div>
                    </div>

                    {openSections[section._id] && (
                      <div className="p-4">
                        {section.subItemSection.map((item) => (
                          <div
                            key={item._id}
                            className="flex items-center justify-between p-3 rounded hover:bg-[var(--latte-50)]"
                          >
                            <div className="flex items-center gap-3">
                              {item.itemType === "video" && <Play size={16} />}
                              {item.itemType === "quiz" && (
                                <CheckCircle size={16} />
                              )}
                              {item.itemType === "assignment" && (
                                <Award size={16} />
                              )}
                              <span>{item.title}</span>
                            </div>
                            <span className="text-xs uppercase text-gray-500">
                              {item.itemType}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="brew-section p-6">
              <h2 className="font-display text-2xl mb-3">Instructor</h2>
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                  style={{ background: "var(--accent-500)" }}
                >
                  {course.instructor.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-bold">{course.instructor}</h3>
                  <p className="text-sm text-gray-600">
                    {course.instructorEmail}
                  </p>
                </div>
              </div>
            </div>

            {course.tags && course.tags.length > 0 && (
              <div className="brew-section p-6">
                <h2 className="font-display text-2xl mb-3">Tags</h2>
                <div className="flex gap-2 flex-wrap">
                  {course.tags.map((tag, i) => (
                    <span key={i} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Side Price Card */}
          <div className="brew-card p-6 h-fit sticky top-6">
            <img src={course.image} alt={course.title} className="brew-media" />
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="price">
                  {course.currency}
                  {course.price}
                </span>
                {discount > 0 && (
                  <>
                    <span className="line-through text-gray-400 text-lg">
                      {course.currency}
                      {course.originalPrice}
                    </span>
                    <span className="text-red-600 text-sm font-bold">
                      {discount}% off
                    </span>
                  </>
                )}
              </div>
              {course.price > 0 ? (
                <>
                  <button onClick={handleCart} className="cta mb-2">
                    {cart}
                  </button>
                  <button className="cta-outline">Buy now</button>
                </>
              ) : (
                <button
                  className="cta"
                  style={{ background: "#16a34a", color: "#fff" }}
                >
                  Enroll for Free
                </button>
              )}
              <p className="text-center text-xs text-gray-500 mt-3">
                30-Day Money-Back Guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
