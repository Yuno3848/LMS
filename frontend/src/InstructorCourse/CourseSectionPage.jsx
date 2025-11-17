import { useEffect, useState } from "react";
import {
  BookOpen,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  FileText,
  Video,
  Loader2,
  GripVertical,
} from "lucide-react";
import { FaExternalLinkAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { itemSectionApiFetch } from "../ApiFetch/itemSectionApiFetch";
import { subItemApiFetch } from "../ApiFetch/subItemApiFetch";
import {
  deleteItemCourse,
  setItem,
  addItemCourse,
  addSubItemToSection,
  removeSubItemFromSection,
} from "../redux/slicers/itemSlicer";

const CourseSectionPage = () => {
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [expandedSection, setExpandedSection] = useState(null);
  const [isAddLoading, setIsAddLoading] = useState(false);
  const [newSection, setNewSection] = useState({ title: "" });

  const [newSubItem, setNewSubItem] = useState({
    title: "",
    type: "",
    content: "",
    contentUrl: "",
  });

  const { courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get sections from Redux store
  const sections = useSelector((state) => state.itemCourse.item || []);

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
          const formattedSections = (res.data.sections || []).map(
            (section) => ({
              id: section._id,
              _id: section._id,
              title: section.title,
              orderIndex: section.orderIndex,
              totalLectures: section.totalLectures || 0,
              subItemSection: (section.subItems || []).map((item) => ({
                id: item._id,
                _id: item._id,
                title: item.title || "",
                type: item.itemType,
                content: item.content || null,
                contentUrl: item.contentUrl || null,
              })),
            })
          );

          dispatch(setItem(formattedSections));
        } else {
          toast.error("Failed to load sections");
        }
      } catch (error) {
        console.error("Failed to fetch sections:", error);
        toast.error("Failed to load sections");
      } finally {
        setIsFetchingData(false);
      }
    };

    fetchSections();
  }, [courseId, navigate, dispatch]);

  const handleAddSection = async () => {
    if (!courseId) {
      toast.error("Course ID is missing");
      return;
    }

    const trimmedTitle = newSection.title?.trim();
    if (!trimmedTitle) {
      toast.error("Section title is required");
      return;
    }

    setIsLoading(true);
    try {
      const res = await itemSectionApiFetch.createItemSection(courseId, {
        title: trimmedTitle,
      });
      console.log("create item data response :", res);

      if (res.success && res.data) {
        const formattedSection = {
          id: res.data._id,
          _id: res.data._id,
          title: res.data.title,
          orderIndex: res.data.orderIndex,
          totalLectures: res.data.totalLectures || 0,
          subItemSection: [],
        };
        dispatch(addItemCourse(formattedSection));
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
        dispatch(deleteItemCourse(sectionId));
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
    const trimmedTitle = newSubItem.title.trim();

    if (!trimmedTitle) {
      toast.error("Title is required");
      return;
    }

    if (!newSubItem.type) {
      toast.error("Please select a type");
      return;
    }

    try {
      setIsAddLoading(true);

      const formData = new FormData();
      formData.append("title", trimmedTitle);
      formData.append("itemType", newSubItem.type);

      if (newSubItem.type === "quiz") {
        formData.append("content", newSubItem.content);
      }

      // Handle video URL
      if (newSubItem.type === "video" || newSubItem.type === "assignment") {
        formData.append("file", newSubItem.contentUrl);
      }

      const res = await subItemApiFetch.createSubItem(sectionId, formData);
      if (res.success) {
        const createdItem = res?.data?.data;

        const newSubItem = {
          id: createdItem._id,
          _id: createdItem._id,
          title: createdItem.title,
          type: createdItem.itemType,
          content: createdItem.content,
          contentUrl: createdItem.contentUrl,
        };

        dispatch(addSubItemToSection({ sectionId, subItem: newSubItem }));
        console.log("dispatching subitem to redux :", newSubItem);
        toast.success("Item added successfully");
        setNewSubItem({
          title: "",
          type: "",
          content: "",
          contentUrl: "",
          file: null,
        });
      } else {
        toast.error("Forgot to choose file?");
      }
    } catch (error) {
      console.error("Error adding sub item :", error.message);
      toast.error(error.message || "An error occurred while adding sub item");
    } finally {
      setIsAddLoading(false);
    }
  };

  const handleDeleteSubItem = async (sectionId, itemId) => {
    try {
      const response = await subItemApiFetch.deleteSubItem(itemId);
      if (response?.success) {
        dispatch(removeSubItemFromSection({ sectionId, itemId }));
        toast.success("Lecture / content removed" || response.message);
      } else {
        toast.error(response.error || "Failed to remove Lecture / Content ");
      }
    } catch (error) {
      toast.error(error.message || "something went wrong!");
    }
  };

  const toggleSection = (sectionId) => {
    setExpandedSection((prev) => (prev === sectionId ? null : sectionId));
  };

  const moveSection = (index, direction) => {
    const newSections = [...sections];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= newSections.length) return;

    [newSections[index], newSections[newIndex]] = [
      newSections[newIndex],
      newSections[index],
    ];

    const updatedSections = newSections.map((section, idx) => ({
      ...section,
      orderIndex: idx,
    }));

    dispatch(setItem(updatedSections));
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
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fadeIn">
        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="glass-card p-5 flex items-center justify-between shadow-md">
            <div>
              <p className="text-sm text-[#6b4226]/60 mb-1">Total Sections</p>
              <h2 className="text-3xl font-bold text-[#6b4226]">
                {sections.length}
              </h2>
            </div>
            <BookOpen className="w-9 h-9 text-[#b08968]" />
          </div>

          <div className="glass-card p-5 flex items-center justify-between shadow-md">
            <div>
              <p className="text-sm text-[#6b4226]/60 mb-1">Total Lectures</p>
              <h2 className="text-3xl font-bold text-[#6b4226]">
                {sections.reduce(
                  (acc, section) => acc + (section.totalLectures || 0),
                  0
                )}
              </h2>
            </div>
            <Video className="w-9 h-9 text-[#b08968]" />
          </div>
        </div>

        {/* Add Section Button */}
        <div className="mb-6">
          <button
            onClick={() => setIsAddingSection(!isAddingSection)}
            className="px-6 py-3 bg-gradient-to-r from-[#b08968] to-[#8c5e3c] text-white font-semibold
                   rounded-xl shadow-lg hover:scale-[1.02] hover:shadow-xl transition-all duration-200 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> Add New Section
          </button>
        </div>

        {/* Add Section Form */}
        {isAddingSection && (
          <div className="glass-card border border-[#e0c9a6] rounded-2xl p-6 shadow-xl mb-10 animate-scaleIn">
            <h2 className="text-lg font-bold text-[#6b4226] mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#b08968]" /> Create Section
            </h2>

            <input
              type="text"
              value={newSection.title}
              onChange={(e) => setNewSection({ title: e.target.value })}
              placeholder="Section title..."
              className="w-full px-4 py-3 rounded-lg bg-white/70 focus:bg-white border border-[#e0c9a6]
                     focus:border-[#b08968] outline-none transition shadow-sm"
            />

            <div className="flex gap-3 mt-4">
              <button
                onClick={handleAddSection}
                disabled={isLoading || !newSection.title.trim()}
                className={`px-6 py-3 rounded-lg text-white transition shadow-md ${
                  !newSection.title.trim()
                    ? "bg-[#d1bfa7]/70 cursor-not-allowed"
                    : "bg-gradient-to-r from-[#b08968] to-[#8c5e3c] hover:scale-[1.03]"
                }`}
              >
                {isLoading ? "Adding..." : "Add Section"}
              </button>

              <button
                onClick={() => {
                  setIsAddingSection(false);
                  setNewSection({ title: "" });
                }}
                className="px-6 py-3 bg-[#e0c9a6] text-[#6b4226] rounded-lg hover:bg-[#d1bfa7] transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Section List */}
        {sections.length === 0 ? (
          <div className="glass-card text-center py-16 border border-[#e0c9a6] rounded-2xl shadow-lg">
            <BookOpen className="w-16 h-16 text-[#b08968]/50 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-[#6b4226]">
              No Sections Yet
            </h3>
            <p className="text-sm text-[#6b4226]/60">
              Start by adding your first section
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="glass-card border border-[#e0c9a6] rounded-2xl shadow-xl transition-all hover:shadow-2xl"
              >
                {/* Section Header */}
                <div className="flex items-start justify-between p-6">
                  {/* Left: reorder + title */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="flex flex-col gap-1 pt-1">
                      {/* Up */}
                      <button
                        onClick={() => moveSection(index, "up")}
                        disabled={index === 0}
                        className={`p-1 rounded transition ${
                          index === 0
                            ? "text-[#6b4226]/20"
                            : "text-[#6b4226]/60 hover:bg-white/40"
                        }`}
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>

                      <GripVertical className="w-4 h-4 text-[#6b4226]/40" />

                      {/* Down */}
                      <button
                        onClick={() => moveSection(index, "down")}
                        disabled={index === sections.length - 1}
                        className={`p-1 rounded transition ${
                          index === sections.length - 1
                            ? "text-[#6b4226]/20"
                            : "text-[#6b4226]/60 hover:bg-white/40"
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <div className="flex items-center gap-3">
                        <span
                          className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#b08968] to-[#8c5e3c]
                                     text-white flex items-center justify-center font-bold"
                        >
                          {index + 1}
                        </span>

                        <h1 className="text-base font-bold text-[#6b4226]">
                          {section.title}
                        </h1>

                        <span
                          className="px-3 py-1 text-xs bg-white/50 border border-[#e0c9a6]
                                     rounded-full text-[#6b4226]/70"
                        >
                          {section.totalLectures}{" "}
                          {section.totalLectures === 1 ? "lecture" : "lectures"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: toggle + delete */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="p-2 rounded-lg hover:bg-white/40 transition"
                    >
                      {expandedSection === section.id ? (
                        <ChevronUp className="w-5 h-5 text-[#6b4226]" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[#6b4226]" />
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

                {/* Expanded Section */}
                {expandedSection === section.id && (
                  <div className="border-t border-[#e0c9a6] bg-white/40 p-6 animate-slideDown">
                    {/* Add Sub Item */}
                    <div className="glass-card border border-[#e0c9a6] rounded-xl p-4 mb-4">
                      <h4 className="text-sm font-semibold text-[#6b4226] mb-3">
                        Add Lecture / Content
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
                          placeholder="Lecture title..."
                          className="px-3 py-2 rounded-lg bg-white/60 border border-[#e0c9a6] focus:border-[#b08968] outline-none"
                        />

                        <select
                          value={newSubItem.type}
                          onChange={(e) =>
                            setNewSubItem({
                              ...newSubItem,
                              type: e.target.value,
                            })
                          }
                          className="px-3 py-2 rounded-lg bg-white/60 border border-[#e0c9a6]"
                        >
                          <option value="">Select type</option>
                          <option value="video">Video</option>
                          <option value="quiz">Quiz</option>
                          <option value="assignment">Assignment</option>
                        </select>

                        {/* Video Upload */}
                        {newSubItem.type === "video" && (
                          <input
                            type="file"
                            accept="video/*"
                            onChange={(e) =>
                              setNewSubItem({
                                ...newSubItem,
                                contentUrl: e.target.files[0],
                              })
                            }
                            className="md:col-span-3 px-3 py-2 rounded-lg bg-white/60 border border-[#e0c9a6]"
                          />
                        )}

                        {/* PDF Upload */}
                        {newSubItem.type === "assignment" && (
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) =>
                              setNewSubItem({
                                ...newSubItem,
                                contentUrl: e.target.files[0],
                              })
                            }
                            className="md:col-span-3 px-3 py-2 rounded-lg bg-white/60 border border-[#e0c9a6]"
                          />
                        )}

                        {/* Quiz Content */}
                        {newSubItem.type === "quiz" && (
                          <textarea
                            rows="6"
                            onChange={(e) =>
                              setNewSubItem({
                                ...newSubItem,
                                content: e.target.value,
                              })
                            }
                            className="md:col-span-3 px-3 py-2 rounded-lg bg-white/60 border border-[#e0c9a6]"
                            placeholder="Enter quiz content..."
                          />
                        )}

                        <button
                          onClick={() => handleAddSubItem(section.id)}
                          disabled={isAddLoading}
                          className={`px-4 py-2 rounded-lg text-white font-semibold transition ${
                            !newSubItem.title.trim()
                              ? "bg-[#d1bfa7]/60 cursor-not-allowed"
                              : "bg-gradient-to-r from-[#b08968] to-[#8c5e3c] hover:scale-[1.03]"
                          }`}
                        >
                          {isAddLoading ? (
                            "Adding..."
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Sub Items */}
                    {section.subItemSection.length > 0 ? (
                      <div className="space-y-3">
                        {section.subItemSection.map((item, itemIndex) => (
                          <div
                            key={item._id}
                            className="flex items-center justify-between bg-white/70 p-4 rounded-lg border border-[#e0c9a6]
                               hover:shadow-md transition"
                          >
                            <div className="flex-1">
                              <p className="text-lg font-semibold text-[#6b4226] mb-2">
                                {itemIndex + 1}. {item.title}
                              </p>

                              {/* Quiz */}
                              {item.type === "quiz" && item.content && (
                                <div className="p-3 bg-white/60 rounded-lg border border-[#e0c9a6]">
                                  <pre className="whitespace-pre-wrap text-sm text-[#6b4226]">
                                    {item.content}
                                  </pre>
                                </div>
                              )}

                              {/* Video / Assignment */}
                              {item.contentUrl?.url && (
                                <div className="mt-2">
                                  {item.type === "video" ? (
                                    <video
                                      controls
                                      src={item.contentUrl.url}
                                      className="w-full rounded-xl h-dvh"
                                    ></video>
                                  ) : (
                                    <a
                                      href={item.contentUrl.url}
                                      className="text-[#6b4226] underline flex items-center gap-2"
                                    >
                                      {item.title} <FaExternalLinkAlt />
                                    </a>
                                  )}
                                </div>
                              )}
                            </div>

                            <button
                              onClick={() =>
                                handleDeleteSubItem(section.id, item.id)
                              }
                              className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 rounded-lg bg-white/50 border border-dashed border-[#e0c9a6]">
                        <FileText className="w-10 h-10 text-[#b08968]/40 mx-auto mb-2" />
                        <p className="text-sm text-[#6b4226]/60">
                          No lectures added yet...
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default CourseSectionPage;
