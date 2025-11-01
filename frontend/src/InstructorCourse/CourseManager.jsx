import React from "react";
import {
  BookOpen,
  PlusCircle,
  Settings,
  ChevronRight,
  Layers,
} from "lucide-react";
import { Link, useParams } from "react-router";

const CourseManager = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-[#f9f4ef] flex">
      <aside className="w-64 bg-gradient-to-b from-[#b08968] to-[#8c5e3c] text-white flex flex-col justify-between shadow-xl">
        <div>
          <div className="px-6 py-6 border-b border-white/20">
            <h1 className="text-2xl font-bold tracking-wide">
              Instructor Panel
            </h1>
            <p className="text-sm opacity-80 mt-1">Course Manager</p>
          </div>

          <nav className="mt-6 space-y-2">
            <Link
              to="#"
              className="flex items-center gap-3 px-6 py-3 hover:bg-white/10 transition-all"
            >
              <BookOpen className="w-5 h-5" />
              <span>Overview</span>
            </Link>
            <Link
              to="#"
              className="flex items-center gap-3 px-6 py-3 hover:bg-white/10 transition-all"
            >
              <Layers className="w-5 h-5" />
              <span>Sections</span>
            </Link>
            <Link
              to="#"
              className="flex items-center gap-3 px-6 py-3 hover:bg-white/10 transition-all"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </Link>
          </nav>
        </div>

        <div className="px-6 py-4 border-t border-white/20 text-sm opacity-70">
          © {new Date().getFullYear()} Bull Academy
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <header className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#6b4226]">
                Course Builder
              </h2>
              <p className="text-[#6b4226]/70 text-sm">
                Manage your course content, sections, and structure.
              </p>
            </div>

            <button className="flex items-center gap-2 bg-gradient-to-r from-[#b08968] to-[#8c5e3c] text-white px-4 py-2 rounded-lg shadow-md hover:scale-[1.02] transition-all">
              <PlusCircle className="w-5 h-5" />
              <span>Add Section</span>
            </button>
          </header>

          <div className="space-y-4">
            {[1, 2, 3].map((section) => (
              <div
                key={section}
                className="bg-white border border-[#e0c9a6] rounded-xl p-5 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-[#6b4226]">
                      Section {section}: Title Placeholder
                    </h3>
                    <p className="text-sm text-[#6b4226]/70 mt-1">
                      Description for this section goes here.
                    </p>
                  </div>

                  <button className="flex items-center text-[#8c5e3c] hover:underline">
                    Manage <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </form>
      </main>
    </div>
  );
};

export default CourseManager;
