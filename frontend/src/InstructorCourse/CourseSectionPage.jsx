import React, { useEffect, useState } from "react";
import {
  BookOpen,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  FileText,
  Video,
  CheckCircle,
  Loader2,
  GripVertical,
} from "lucide-react";
import { itemSectionApiFetch } from "../ApiFetch/itemSectionApiFetch";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";

const CourseSectionPage = () => {
  const [sections, setSections] = useState([]);
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [expandedSection, setExpandedSection] = useState(null);

  const [newSection, setNewSection] = useState({ title: "" });

  const [newSubItem, setNewSubItem] = useState({
    title: "",
    type: "lecture",
    duration: "",
  });
  const { courseId } = useParams();
  const navigate = useNavigate();

  // Fetch existing sections when component mounts
  useEffect(() => {
    const fetchSections = async () => {
      if (!courseId) {
        toast.error("Invalid course ID");
        navigate("/instructor-dashboard");
        return;
      }

      setIsFetchingData(true);
      try {
        const res = await itemSectionApiFetch.getAllItemSection(courseId);

        if (res.success && res.data) {
          // Map backend data to frontend format
          const formattedSections = (res.data.itemSection || []).map(
            (section) => ({
              id: section._id,
              _id: section._id,
              title: section.title,
              orderIndex: section.orderIndex,
              totalLectures: section.totalLectures || 0,
              subItemSection: section.subItemSection || [],
            })
          );

          setSections(formattedSections);
        }
      } catch (error) {
        console.error("Failed to fetch sections:", error);
        toast.error("Failed to load sections");
      } finally {
        setIsFetchingData(false);
      }
    };

    fetchSections();
  }, [courseId, navigate]);

  const handleAddSection = async () => {
    if (!courseId) {
      toast.error("Course ID is missing");
      return;
    }

    if (!newSection.title.trim()) {
      toast.error("Section title is required");
      return;
    }

    setIsLoading(true);
    try {
      const res = await itemSectionApiFetch.createItemSection(courseId, {
        title: newSection.title,
      });

      if (res.success && res.data) {
        // Format the new section to match frontend structure
        const formattedSection = {
          id: res.data._id,
          _id: res.data._id,
          title: res.data.title,
          orderIndex: res.data.orderIndex,
          totalLectures: res.data.totalLectures || 0,
          subItemSection: [],
        };

        setSections([...sections, formattedSection]);
        toast.success("Section created successfully");
        setNewSection({ title: "" });
        setIsAddingSection(false);
      } else {
        toast.error(res.error || "Failed to create section");
      }
    } catch (error) {
      console.error("Section creation error:", error);
      toast.error(error.message || "Failed to create section");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSection = async (sectionId) => {
    try {
      const res = await itemSectionApiFetch.deleteItemSection(sectionId);

      if (res.success) {
        setSections(sections.filter((section) => section.id !== sectionId));
        toast.success("Section deleted successfully");
      } else {
        toast.error(res.error || "Failed to delete section");
      }
    } catch (error) {
      console.error("Delete section error:", error);
      toast.error("Failed to delete section");
    }
  };

  const handleAddSubItem = async (sectionId) => {
    if (!newSubItem.title.trim()) return;

    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          const updatedSubItems = [
            ...section.subItemSection,
            { ...newSubItem, id: Date.now() },
          ];
          return {
            ...section,
            subItemSection: updatedSubItems,
            totalLectures: updatedSubItems.length,
          };
        }
        return section;
      })
    );

    setNewSubItem({ title: "", type: "lecture", duration: "" });
  };

  const handleDeleteSubItem = (sectionId, itemId) => {
    setSections(
      sections.map((section) => {
        if (section.id === sectionId) {
          const updatedSubItems = section.subItemSection.filter(
            (item) => item.id !== itemId
          );
          return {
            ...section,
            subItemSection: updatedSubItems,
            totalLectures: updatedSubItems.length,
          };
        }
        return section;
      })
    );
  };

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const moveSection = (index, direction) => {
    const newSections = [...sections];
    const newIndex = direction === "up" ? index - 1 : index + 1;

    if (newIndex < 0 || newIndex >= sections.length) return;

    [newSections[index], newSections[newIndex]] = [
      newSections[newIndex],
      newSections[index],
    ];

    newSections.forEach((section, idx) => {
      section.orderIndex = idx;
    });

    setSections(newSections);
  };

  if (isFetchingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f5e6ca] via-[#fefaf5] to-[#e7d3b5] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#b08968] animate-spin mx-auto mb-4" />
          <p className="text-[#6b4226] font-semibold">Loading sections...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5e6ca] via-[#fefaf5] to-[#e7d3b5]">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Bar */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-[#e0c9a6] p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6b4226]/60 mb-1">Total Sections</p>
                <p className="text-2xl font-bold text-[#6b4226]">
                  {sections.length}
                </p>
              </div>
              <BookOpen className="w-8 h-8 text-[#b08968]" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-[#e0c9a6] p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6b4226]/60 mb-1">Total Lectures</p>
                <p className="text-2xl font-bold text-[#6b4226]">
                  {sections.reduce(
                    (acc, section) => acc + (section.totalLectures || 0),
                    0
                  )}
                </p>
              </div>
              <Video className="w-8 h-8 text-[#b08968]" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-[#e0c9a6] p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#6b4226]/60 mb-1">Completion</p>
                <p className="text-2xl font-bold text-[#6b4226]">
                  {sections.length > 0 ? "100%" : "0%"}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-[#b08968]" />
            </div>
          </div>
        </div>

        {/* Add Section Button */}
        <div className="mb-6">
          <button
            onClick={() => setIsAddingSection(!isAddingSection)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#b08968] to-[#8c5e3c] text-white font-semibold rounded-xl hover:opacity-90 transition shadow-md"
          >
            <Plus className="w-5 h-5" />
            Add New Section
          </button>
        </div>

        {isAddingSection && (
          <div className="mb-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-[#e0c9a6] p-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#e0c9a6]/50">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#b08968] to-[#8c5e3c] flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-lg font-bold text-[#6b4226]">
                New Section Details
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#6b4226] mb-2">
                  Section Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newSection.title}
                  onChange={(e) =>
                    setNewSection({
                      title: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-[#fdfaf7] border border-[#e0c9a6] rounded-lg text-[#6b4226] placeholder-[#6b4226]/40 focus:outline-none focus:border-[#b08968] transition"
                  placeholder="e.g., Introduction to React Hooks"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddSection}
                  disabled={isLoading || !newSection.title.trim()}
                  className={`px-6 py-3 font-semibold rounded-lg transition ${
                    isLoading || !newSection.title.trim()
                      ? "bg-[#d1bfa7] cursor-not-allowed text-white"
                      : "bg-gradient-to-r from-[#b08968] to-[#8c5e3c] text-white hover:opacity-90"
                  }`}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Adding...
                    </span>
                  ) : (
                    "Add Section"
                  )}
                </button>
                <button
                  onClick={() => {
                    setIsAddingSection(false);
                    setNewSection({ title: "" });
                  }}
                  className="px-6 py-3 bg-[#e0c9a6] text-[#6b4226] font-semibold rounded-lg hover:bg-[#d1bfa7] transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Sections List */}
        <div className="space-y-4">
          {sections.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-[#e0c9a6] p-12 text-center">
              <BookOpen className="w-16 h-16 text-[#b08968] mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-bold text-[#6b4226] mb-2">
                No Sections Yet
              </h3>
              <p className="text-sm text-[#6b4226]/60">
                Start building your course by adding your first section
              </p>
            </div>
          ) : (
            sections.map((section, index) => (
              <div
                key={section.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-[#e0c9a6] overflow-hidden"
              >
                {/* Section Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="flex flex-col gap-1 pt-1">
                        <button
                          onClick={() => moveSection(index, "up")}
                          disabled={index === 0}
                          className={`p-1 rounded ${
                            index === 0
                              ? "text-[#6b4226]/20 cursor-not-allowed"
                              : "text-[#6b4226]/60 hover:bg-[#fdfaf7]"
                          }`}
                        >
                          <ChevronUp className="w-4 h-4" />
                        </button>
                        <GripVertical className="w-4 h-4 text-[#6b4226]/40" />
                        <button
                          onClick={() => moveSection(index, "down")}
                          disabled={index === sections.length - 1}
                          className={`p-1 rounded ${
                            index === sections.length - 1
                              ? "text-[#6b4226]/20 cursor-not-allowed"
                              : "text-[#6b4226]/60 hover:bg-[#fdfaf7]"
                          }`}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#b08968] to-[#8c5e3c] text-white text-sm font-bold">
                            {index + 1}
                          </span>
                          <h3 className="text-base font-bold text-[#6b4226]">
                            {section.title}
                          </h3>
                          <span className="text-xs text-[#6b4226]/60 bg-[#fdfaf7] px-3 py-1 rounded-full border border-[#e0c9a6]">
                            {section.totalLectures}{" "}
                            {section.totalLectures === 1
                              ? "lecture"
                              : "lectures"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="p-2 text-[#6b4226] hover:bg-[#fdfaf7] rounded-lg transition"
                      >
                        {expandedSection === section.id ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>
                      <button
                        onClick={() => handleDeleteSection(section.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedSection === section.id && (
                  <div className="border-t border-[#e0c9a6] bg-[#fdfaf7]/50">
                    <div className="p-6 space-y-4">
                      {/* Add Sub-Item Form */}
                      <div className="bg-white rounded-lg p-4 border border-[#e0c9a6]">
                        <h4 className="text-sm font-semibold text-[#6b4226] mb-3">
                          Add Lecture/Content
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <input
                            type="text"
                            value={newSubItem.title}
                            onChange={(e) =>
                              setNewSubItem({
                                ...newSubItem,
                                title: e.target.value,
                              })
                            }
                            className="px-3 py-2 bg-[#fdfaf7] border border-[#e0c9a6] rounded-lg text-sm text-[#6b4226] focus:outline-none focus:border-[#b08968]"
                            placeholder="Lecture title"
                          />
                          <select
                            value={newSubItem.type}
                            onChange={(e) =>
                              setNewSubItem({
                                ...newSubItem,
                                type: e.target.value,
                              })
                            }
                            className="px-3 py-2 bg-[#fdfaf7] border border-[#e0c9a6] rounded-lg text-sm text-[#6b4226] focus:outline-none focus:border-[#b08968]"
                          >
                            <option value="lecture">Lecture</option>
                            <option value="video">Video</option>
                            <option value="quiz">Quiz</option>
                            <option value="assignment">Assignment</option>
                          </select>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={newSubItem.duration}
                              onChange={(e) =>
                                setNewSubItem({
                                  ...newSubItem,
                                  duration: e.target.value,
                                })
                              }
                              className="flex-1 px-3 py-2 bg-[#fdfaf7] border border-[#e0c9a6] rounded-lg text-sm text-[#6b4226] focus:outline-none focus:border-[#b08968]"
                              placeholder="Duration (e.g., 10:30)"
                            />
                            <button
                              onClick={() => handleAddSubItem(section.id)}
                              disabled={!newSubItem.title.trim()}
                              className={`px-4 py-2 text-white text-sm font-semibold rounded-lg transition ${
                                !newSubItem.title.trim()
                                  ? "bg-[#d1bfa7] cursor-not-allowed"
                                  : "bg-gradient-to-r from-[#b08968] to-[#8c5e3c] hover:opacity-90"
                              }`}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Sub-Items List */}
                      {section.subItemSection.length > 0 ? (
                        <div className="space-y-2">
                          {section.subItemSection.map((item, itemIndex) => (
                            <div
                              key={item.id}
                              className="flex items-center justify-between p-3 bg-white rounded-lg border border-[#e0c9a6] hover:border-[#b08968] transition"
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-xs font-semibold text-[#6b4226]/40 w-6">
                                  {itemIndex + 1}
                                </span>
                                {item.type === "video" ? (
                                  <Video className="w-5 h-5 text-[#b08968]" />
                                ) : item.type === "quiz" ? (
                                  <CheckCircle className="w-5 h-5 text-[#b08968]" />
                                ) : (
                                  <FileText className="w-5 h-5 text-[#b08968]" />
                                )}
                                <div>
                                  <p className="text-sm font-semibold text-[#6b4226]">
                                    {item.title}
                                  </p>
                                  <p className="text-xs text-[#6b4226]/60">
                                    {item.type.charAt(0).toUpperCase() +
                                      item.type.slice(1)}
                                    {item.duration && ` • ${item.duration}`}
                                  </p>
                                </div>
                              </div>
                              <button
                                onClick={() =>
                                  handleDeleteSubItem(section.id, item.id)
                                }
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 bg-white rounded-lg border border-dashed border-[#e0c9a6]">
                          <FileText className="w-12 h-12 text-[#b08968]/40 mx-auto mb-2" />
                          <p className="text-sm text-[#6b4226]/60">
                            No lectures added yet. Add your first lecture above.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default CourseSectionPage;
