import React, { useState } from "react";
import {
  BookOpen,
  DollarSign,
  Tag,
  Image,
  X,
  Upload,
  AlertCircle,
} from "lucide-react";

const CreateCourseForm = () => {
  const [tags, setTags] = useState(["JavaScript", "React", "Frontend"]);
  const [newTag, setNewTag] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(URL.createObjectURL(file));
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
        <div className="space-y-6">
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
                  className="w-full px-4 py-3 bg-[#fdfaf7] border border-[#e0c9a6] rounded-lg text-[#6b4226] placeholder-[#6b4226]/40 focus:outline-none focus:ring-2 focus:ring-[#b08968]/20 focus:border-[#b08968] transition"
                  placeholder="Enter course title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#6b4226] mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows="5"
                  className="w-full px-4 py-3 bg-[#fdfaf7] border border-[#e0c9a6] rounded-lg text-[#6b4226] placeholder-[#6b4226]/40 focus:outline-none focus:ring-2 focus:ring-[#b08968]/20 focus:border-[#b08968] transition resize-none"
                  placeholder="Describe your course in detail..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#6b4226] mb-2">
                  Course Thumbnail <span className="text-red-500">*</span>
                </label>
                <div className="flex items-start gap-4">
                  <label className="w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed border-[#e0c9a6] rounded-lg bg-[#fdfaf7] cursor-pointer hover:border-[#b08968] hover:bg-[#f9f3ec] transition group relative overflow-hidden">
                    {thumbnail ? (
                      <>
                        <img
                          src={thumbnail}
                          alt="Thumbnail"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                          <Upload className="w-6 h-6 text-white" />
                        </div>
                      </>
                    ) : (
                      <>
                        <Image className="w-8 h-8 text-[#6b4226]/40 mb-2 group-hover:text-[#b08968] transition" />
                        <span className="text-xs font-medium text-[#6b4226]/60">
                          Upload
                        </span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleThumbnailChange}
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
                  <select className="w-full px-4 py-3 bg-[#fdfaf7] border border-[#e0c9a6] rounded-lg text-[#6b4226] focus:outline-none focus:ring-2 focus:ring-[#b08968]/20 focus:border-[#b08968] transition appearance-none cursor-pointer">
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
                  <select className="w-full px-4 py-3 bg-[#fdfaf7] border border-[#e0c9a6] rounded-lg text-[#6b4226] focus:outline-none focus:ring-2 focus:ring-[#b08968]/20 focus:border-[#b08968] transition appearance-none cursor-pointer">
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
                    className="w-full px-4 py-3 bg-[#fdfaf7] border border-[#e0c9a6] rounded-lg text-[#6b4226] placeholder-[#6b4226]/40 focus:outline-none focus:ring-2 focus:ring-[#b08968]/20 focus:border-[#b08968] transition"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#6b4226] mb-2">
                    Final Price <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 bg-[#fdfaf7] border border-[#e0c9a6] rounded-lg text-[#6b4226] placeholder-[#6b4226]/40 focus:outline-none focus:ring-2 focus:ring-[#b08968]/20 focus:border-[#b08968] transition"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#6b4226] mb-2">
                    Currency <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-4 py-3 bg-[#fdfaf7] border border-[#e0c9a6] rounded-lg text-[#6b4226] focus:outline-none focus:ring-2 focus:ring-[#b08968]/20 focus:border-[#b08968] transition appearance-none cursor-pointer">
                    <option>INR (₹)</option>
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                    <option>GBP (£)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#6b4226] mb-2">
                  Course Expiry Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 bg-[#fdfaf7] border border-[#e0c9a6] rounded-lg text-[#6b4226] focus:outline-none focus:ring-2 focus:ring-[#b08968]/20 focus:border-[#b08968] transition"
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
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                  className="flex-1 px-4 py-3 bg-[#fdfaf7] border border-[#e0c9a6] rounded-lg text-[#6b4226] placeholder-[#6b4226]/40 focus:outline-none focus:ring-2 focus:ring-[#b08968]/20 focus:border-[#b08968] transition"
                  placeholder="Add a tag (e.g., JavaScript, React)"
                />
                <button
                  onClick={handleAddTag}
                  className="px-6 py-3 bg-gradient-to-r from-[#b08968] to-[#8c5e3c] text-white font-semibold rounded-lg hover:shadow-lg transition transform hover:-translate-y-0.5"
                >
                  Add Tag
                </button>
              </div>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#b08968] to-[#8c5e3c] text-white text-sm font-medium rounded-full shadow-sm"
                    >
                      {tag}
                      <X
                        className="w-4 h-4 cursor-pointer hover:bg-white/20 rounded-full transition"
                        onClick={() => handleRemoveTag(tag)}
                      />
                    </span>
                  ))}
                </div>
              )}

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
                <input type="checkbox" className="sr-only peer" />
                <div className="w-14 h-7 bg-[#e0c9a6] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#b08968]/20 rounded-full peer peer-checked:after:translate-x-7 peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-[#e0c9a6] after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#b08968] peer-checked:to-[#8c5e3c]"></div>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button className="flex-1 px-6 py-4 bg-gradient-to-r from-[#b08968] to-[#8c5e3c] text-white font-semibold text-base rounded-xl hover:shadow-xl transition transform hover:-translate-y-0.5">
              Create Course
            </button>
            <button className="px-6 py-4 bg-white text-[#6b4226] font-semibold text-base rounded-xl border border-[#e0c9a6] hover:bg-[#fdfaf7] transition shadow-sm hover:shadow-md">
              Save as Draft
            </button>
          </div>
        </div>
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
