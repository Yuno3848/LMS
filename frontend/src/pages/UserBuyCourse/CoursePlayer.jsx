import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  Play,
  CheckCircle,
  Circle,
  ChevronDown,
  ChevronUp,
  FileText,
  FileVideo,
  HelpCircle,
} from "lucide-react";

import useInitDetailedEnrolledCourses from "../../EffectsForApp/useInitDetailedEnrolledCourse";
import Loading from "../../components/Loading";

const CoursePlayer = () => {
  useInitDetailedEnrolledCourses();

  const { courseId } = useParams();
  const courseDetails = useSelector((state) => state.enrolled.detailedCourse);

  if (!courseDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f9f3eb]">
        <Loading text="Loading course..." />
      </div>
    );
  }

  const allCourses = courseDetails.flatMap((c) => c.courseIds);
  const selectedCourse = allCourses.find((course) => course._id == courseId);

  if (!selectedCourse) {
    return <div className="text-brown-700 p-10">Course not found</div>;
  }

  const itemSections = selectedCourse.itemSection;

  const [openSection, setOpenSection] = useState(null);
  const [activeLecture, setActiveLecture] = useState(null);

  return (
    <div className="flex h-screen bg-[#fdf8f3] text-[#5a3e2b]">
      {/* LEFT PLAYER */}
      <div className="flex-1 flex flex-col bg-[#fffaf5] shadow-inner">
        <div className="h-[60vh] bg-[#fff3e7] border-b border-[#e7d9c8] p-6 rounded-lg m-4 shadow-lg flex items-center justify-center">
          {activeLecture ? (
            activeLecture.itemType === "video" ? (
              <video
                src={activeLecture?.contentUrl?.url}
                controls
                className="w-full h-full rounded-lg shadow-lg"
              />
            ) : activeLecture.itemType === "assignment" ? (
              <div className="text-center">
                <h2 className="text-xl mb-4 font-semibold text-[#6b4b33]">
                  Assignment
                </h2>
                <a
                  href={activeLecture?.contentUrl?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#a06b43] underline text-lg font-medium"
                >
                  📄 Open Assignment PDF
                </a>
              </div>
            ) : activeLecture.itemType === "quiz" ? (
              <div className="text-left text-[#5a3e2b] max-w-2xl mx-auto bg-[#fff7ef] p-6 rounded-xl shadow-md border border-[#ead6c2]">
                <h2 className="text-2xl font-semibold mb-6">Quiz</h2>
                <div className="mb-6 p-4 bg-[#fff1dc] rounded-lg shadow-sm">
                  {activeLecture.content}
                </div>
              </div>
            ) : (
              <div className="text-[#8c6a55]">Unsupported content type</div>
            )
          ) : (
            <div className="text-[#a3846b] text-lg">
              Select a lecture to begin
            </div>
          )}
        </div>

        {/* COURSE TITLE */}
        <div className="px-8 py-6">
          <h1 className="text-3xl font-bold text-[#543a26]">
            {selectedCourse.title}
          </h1>
          <p className="text-[#8c6a55] mt-2">{selectedCourse.description}</p>
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="w-[350px] bg-[#fff3e7] border-l border-[#e5d3c3] overflow-y-scroll shadow-xl">
        <div className="p-4 border-b border-[#e5d3c3] bg-[#fff8f2]">
          <h2 className="text-lg font-semibold text-[#543a26]">
            Course content
          </h2>
        </div>

        {itemSections?.map((section, sectionIndex) => (
          <div key={sectionIndex} className="border-b border-[#ecdacb]">
            {/* SECTION HEADER */}
            <button
              onClick={() =>
                setOpenSection(
                  openSection === sectionIndex ? null : sectionIndex
                )
              }
              className="w-full flex items-center justify-between p-4 bg-[#fff8f2] hover:bg-[#faeedf] transition rounded-sm"
            >
              <span className="font-medium text-[#5a3e2b]">
                {section.title}
              </span>
              {openSection === sectionIndex ? (
                <ChevronUp className="text-[#8c6a55]" />
              ) : (
                <ChevronDown className="text-[#8c6a55]" />
              )}
            </button>

            {/* LECTURE LIST */}
            {openSection === sectionIndex && (
              <div className="bg-[#fff8f2]">
                {section.subItemSection.length === 0 && (
                  <div className="text-[#a3846b] p-4 text-sm">
                    No lectures added.
                  </div>
                )}

                {section.subItemSection.map((lecture, lectureIndex) => {
                  const Icon =
                    lecture.itemType === "video"
                      ? FileVideo
                      : lecture.itemType === "assignment"
                      ? FileText
                      : lecture.itemType === "quiz"
                      ? HelpCircle
                      : Play;

                  return (
                    <div
                      key={lectureIndex}
                      onClick={() => setActiveLecture(lecture)}
                      className={`p-4 flex items-center gap-3 cursor-pointer 
                        rounded-md transition 
                        ${
                          activeLecture?._id === lecture._id
                            ? "bg-[#f3e4d6] shadow-sm"
                            : "hover:bg-[#f8ebdf]"
                        }`}
                    >
                      <Icon className="w-5 h-5 text-[#a06b43]" />

                      <div className="flex-1">
                        <p className="font-medium text-[#543a26]">
                          {lecture.title}
                        </p>
                        <p className="text-[#9d7f66] text-sm">
                          {lecture.itemType}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursePlayer;
