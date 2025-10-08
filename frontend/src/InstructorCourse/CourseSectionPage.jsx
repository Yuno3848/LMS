import React, { useState } from "react";
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
  List,
  GripVertical,
} from "lucide-react";

const CourseSectionPage = () => {
  const [sections, setSections] = useState([]);
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);

  const [newSection, setNewSection] = useState({
    title: "",
    totalLectures: 0,
    orderIndex: 0,
  });

  const [newSubItem, setNewSubItem] = useState({
    title: "",
    type: "lecture",
    duration: "",
  });

  const handleAddSection = () => {
    if (!newSection.title.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      const section = {
        id: Date.now(),
        title: newSection.title,
        totalLectures: 0,
        orderIndex: sections.length,
        subItemSection: [],
        createdAt: new Date().toISOString(),
      };

      setSections([...sections, section]);
      setNewSection({ title: "", totalLectures: 0, orderIndex: 0 });
      setIsAddingSection(false);
      setIsLoading(false);
    }, 500);
  };

  const handleDeleteSection = (sectionId) => {
    setSections(sections.filter((section) => section.id !== sectionId));
  };

  const handleAddSubItem = (sectionId) => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5e6ca] via-[#fefaf5] to-[#e7d3b5]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-[#e0c9a6] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#b08968] to-[#8c5e3c] flex items-center justify-center shadow-md">
                <List className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#6b4226]">
                  Course Sections
                </h1>
                <p className="text-xs text-[#6b4226]/60">
                  Manage your course curriculum
                </p>
              </div>
            </div>
            <button className="text-sm text-[#6b4226]/60 hover:text-[#b08968] transition font-medium">
              Back to Course
            </button>
          </div>
        </div>
      </header>

   
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
                    (acc, section) => acc + section.totalLectures,
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
                      ...newSection,
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
                    setNewSection({
                      title: "",
                      totalLectures: 0,
                      orderIndex: 0,
                    });
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
                            {section.orderIndex + 1}
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

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-[#e0c9a6] bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-center text-[#6b4226]/60">
            © 2025 Instructor Dashboard. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CourseSectionPage;
