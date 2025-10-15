import React, { useState } from "react";
import {
  BookOpen,
  DollarSign,
  Tag,
  Image,
  X,
  Upload,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { courseApiFetch } from "../ApiFetch/courseApiFetch";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import {
  addInstructorCourse,
  setInstructorProfile,
} from "../redux/slicers/instructorProfileSlicer";
import { addCourse } from "../redux/slicers/courseSlicer";

const CreateCourseForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    base: 0,
    final: 0,
    currency: "",
    courseExpiry: "",
    difficulty: "",
    tags: [],
    category: "",
    thumbnail: "",
    isPublished: false,
    requirements: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [tagInput, setTagInput] = useState("");

  const dispatch = useDispatch();

  const instructorProfile = useSelector(
    (state) => state.instructorProfile.profile
  );

  const handleAddTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData({ ...formData, tags: [...formData.tags, newTag] });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };
  "instructor profile :", instructorProfile;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("base", formData.base);
    form.append("final", formData.final);
    form.append("currency", formData.currency);
    form.append("courseExpiry", formData.courseExpiry);
    form.append("difficulty", formData.difficulty.toLowerCase());
    form.append("category", formData.category);
    form.append("isPublished", formData.isPublished === "on" ? true : false);
    form.append("requirements", formData.requirements);
    formData.tags.forEach((tag) => {
      form.append("tags", tag);
    });

    if (formData.thumbnail) {
      form.append("thumbnail", formData.thumbnail);
    }

    try {
      const res = await courseApiFetch.createCourse(form);
      if (res.success) {
        toast.success(res?.data?.message || "course created successfully");
        dispatch(addInstructorCourse(res?.data?.data));
        dispatch(addCourse(res?.data?.data));
      } else {
        toast.error(res.error || 'failed to create course');

      }
    } catch (error) {
      toast.error(error.message || "something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5e6ca] via-[#fefaf5] to-[#e7d3b5]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-[#e0c9a6] sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#b08968] to-[#8c5e3c] flex items-center justify-center shadow-md">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#6b4226]">
                  Create New Course
                </h1>
                <p className="text-xs text-[#6b4226]/60">
                  Fill in the details below
                </p>
              </div>
            </div>
            <button className="text-sm text-[#6b4226]/60 hover:text-[#b08968] transition font-medium">
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-[#e0c9a6] p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#e0c9a6]/50">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#b08968] to-[#8c5e3c] flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-lg font-bold text-[#6b4226]">
                Basic Information
              </h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-[#6b4226] mb-2">
                  Course Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                  }}
                  className="w-full px-4 py-3 bg-[#fdfaf7] border border-[#e0c9a6] rounded-lg text-[#6b4226] placeholder-[#6b4226]/40 focus:outline-none transition"
                  placeholder="Enter course title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#6b4226] mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows="5"
                  value={formData.description}
                  onChange={(e) => {
                    setFormData({ ...formData, description: e.target.value });
                  }}
                  className="w-full px-4 py-3 bg-[#fdfaf7] border border-[#e0c9a6] rounded-lg text-[#6b4226] placeholder-[#6b4226]/40 focus:outline-none transition resize-none"
                  placeholder="Describe your course in detail..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#6b4226] mb-2">
                  Requirements <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows="4"
                  value={formData.requirements}
                  onChange={(e) =>
                    setFormData({ ...formData, requirements: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#fdfaf7] border border-[#e0c9a6] rounded-lg text-[#6b4226] placeholder-[#6b4226]/40 focus:outline-none transition resize-none"
                  placeholder="What are the prerequisites or requirements for this course?"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#6b4226] mb-2">
                  Course Thumbnail <span className="text-red-500">*</span>
                </label>
                <div className="flex items-start gap-4">
                  <label className="w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed border-[#e0c9a6] rounded-lg bg-[#fdfaf7] cursor-pointer hover:border-[#b08968] hover:bg-[#f9f3ec] transition">
                    <Image className="w-8 h-8 text-[#6b4226]/40 mb-2 transition" />
                    <span className="text-xs font-medium text-[#6b4226]/60">
                      {formData.thumbnail ? formData.thumbnail.name : "Upload"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          thumbnail: e.target.files[0],
                        })
                      }
                      className="hidden"
                    />
                  </label>
                  <div className="flex-1 bg-[#fdfaf7] rounded-lg p-4 border border-[#e0c9a6]">
                    <p className="text-xs text-[#6b4226]/70 leading-relaxed">
                      Upload a course thumbnail image.
                      <br />
                      <span className="font-semibold text-[#6b4226]">
                        Recommended:
                      </span>{" "}
                      1280x720px
                      <br />
                      <span className="font-semibold text-[#6b4226]">
                        Formats:
                      </span>{" "}
                      JPG, PNG, WEBP
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-[#6b4226] mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#fdfaf7] border border-[#e0c9a6] rounded-lg text-[#6b4226] cursor-pointer"
                  >
                    <option>Select category</option>
                    <option>Web Development</option>
                    <option>Mobile Development</option>
                    <option>Data Science</option>
                    <option>Design</option>
                    <option>Marketing</option>
                    <option>Business</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#6b4226] mb-2">
                    Difficulty Level
                  </label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) =>
                      setFormData({ ...formData, difficulty: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#fdfaf7] border border-[#e0c9a6] rounded-lg text-[#6b4226] cursor-pointer"
                  >
                    <option>Select difficulty</option>
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-[#e0c9a6] p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#e0c9a6]/50">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#b08968] to-[#8c5e3c] flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-lg font-bold text-[#6b4226]">Pricing</h2>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-[#6b4226] mb-2">
                    Base Price <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.base}
                    onChange={(e) =>
                      setFormData({ ...formData, base: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#fdfaf7] border border-[#e0c9a6] rounded-lg text-[#6b4226]"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#6b4226] mb-2">
                    Final Price <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.final}
                    onChange={(e) =>
                      setFormData({ ...formData, final: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#fdfaf7] border border-[#e0c9a6] rounded-lg text-[#6b4226]"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#6b4226] mb-2">
                    Currency <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.currency}
                    onChange={(e) =>
                      setFormData({ ...formData, currency: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#fdfaf7] border border-[#e0c9a6] rounded-lg text-[#6b4226] cursor-pointer"
                  >
                    <option>INR</option>
                    <option>USD</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#6b4226] mb-2">
                  Course Expiry Date
                </label>
                <input
                  type="date"
                  value={formData.courseExpiry}
                  onChange={(e) =>
                    setFormData({ ...formData, courseExpiry: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#fdfaf7] border border-[#e0c9a6] rounded-lg text-[#6b4226]"
                />
              </div>

              <div className="bg-gradient-to-r from-[#fdfaf7] to-[#f9f3ec] rounded-lg p-4 border border-[#e0c9a6]/50">
                <p className="text-sm text-[#6b4226] flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#b08968]" />
                  <span>
                    <span className="font-semibold">Pricing Tip:</span> Set a
                    competitive base price and offer a discounted final price to
                    attract more students.
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Tags Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-[#e0c9a6] p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#e0c9a6]/50">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#b08968] to-[#8c5e3c] flex items-center justify-center">
                <Tag className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-lg font-bold text-[#6b4226]">Tags</h2>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="flex-1 px-4 py-3 bg-[#fdfaf7] border border-[#e0c9a6] rounded-lg text-[#6b4226]"
                  placeholder="Add a tag (e.g., JavaScript, React)"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="px-6 py-3 bg-gradient-to-r from-[#b08968] to-[#8c5e3c] text-white font-semibold rounded-lg"
                >
                  Add Tag
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#b08968] to-[#8c5e3c] text-white text-sm font-medium rounded-full shadow-sm"
                  >
                    {tag}
                    <X
                      onClick={() => handleRemoveTag(tag)}
                      className="w-4 h-4 cursor-pointer"
                    />
                  </span>
                ))}
              </div>

              <div className="bg-[#fdfaf7] rounded-lg p-4 border border-[#e0c9a6]">
                <p className="text-xs text-[#6b4226]/70 flex items-start gap-2">
                  <Tag className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#b08968]" />
                  <span>
                    Add relevant tags to help students discover your course. Use
                    keywords that describe the topics covered.
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Publishing Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-[#e0c9a6] p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#6b4226] mb-1">
                  Publish Course
                </h3>
                <p className="text-sm text-[#6b4226]/60">
                  Make this course available to students
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  value={formData.isPublished}
                  onChange={(e) =>
                    setFormData({ ...formData, isPublished: e.target.checked })
                  }
                  type="checkbox"
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-[#e0c9a6] rounded-full peer-checked:bg-gradient-to-r peer-checked:from-[#b08968] peer-checked:to-[#8c5e3c] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:rounded-full after:h-6 after:w-6 after:transition-all"></div>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`flex-1 px-6 py-4 font-semibold text-base rounded-xl transition 
    ${
      isLoading
        ? "bg-[#d1bfa7] cursor-not-allowed text-white"
        : "bg-gradient-to-r from-[#b08968] to-[#8c5e3c] text-white hover:opacity-90"
    }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Brewing your course...
                </span>
              ) : (
                "Create Course"
              )}
            </button>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-[#e0c9a6] bg-white/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-center text-[#6b4226]/60">
            © 2025 Instructor Dashboard. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CreateCourseForm;
