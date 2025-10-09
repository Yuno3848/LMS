import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  BookOpen,
  Star,
  GraduationCap,
  Globe,
  Edit3,
  PlusCircle,
  CheckCircle,
} from "lucide-react";
import Loading from "../../../../../components/Loading";
import ShowStudentProfile from "../../../../../components/ShowStudentProfile";

const StudentProfilePage = () => {
  const user = useSelector((state) => state.auth.user);
  const studentProfile = useSelector((state) => state.studentProfile.profile);
  const instructorProfile = useSelector(
    (state) => state.instructorProfile.profile
  );

  if (!studentProfile) {
    return <Loading />;
  }

  const studentData =
    (Array.isArray(studentProfile) && studentProfile[0]?.studentProfile) ||
    (studentProfile?.data &&
      Array.isArray(studentProfile.data) &&
      studentProfile.data[0]?.studentProfile) ||
    studentProfile ||
    {};

  const { bio, skills, interests, education, socialLinks } = studentData;

  return instructorProfile ? (
    <ShowStudentProfile type="instructor" />
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5e6ca] via-[#fefaf5] to-[#e7d3b5] p-4">
      <div className="w-full max-w-5xl">
        {/* Main Card with Glass Effect */}
        <div className="relative rounded-3xl shadow-2xl bg-white/80 backdrop-blur-sm border border-[#e0c9a6] overflow-hidden">
          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #b08968 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            ></div>
          </div>

          {/* Hero Section with Avatar */}
          <div className="relative bg-gradient-to-r from-[#b08968] via-[#9c7556] to-[#8c5e3c] p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative group">
                <div className="relative">
                  <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-50 group-hover:opacity-70 transition"></div>
                  <div className="relative w-32 h-32 rounded-full border-4 border-white shadow-2xl ring-4 ring-white/30 bg-gradient-to-br from-[#fdfaf7] to-[#f9f3ec] flex items-center justify-center overflow-hidden">
                    {user?.data?.avatar?.url ? (
                      <img
                        src={user.data.avatar.url}
                        alt="Profile Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-5xl">👤</span>
                    )}
                  </div>
                  <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-400 rounded-full border-4 border-white"></div>
                </div>
              </div>
              <div className="text-center md:text-left flex-1">
                <h1 className="text-4xl font-bold text-white mb-2">
                  {user?.data?.fullname || "Student Name"}
                </h1>
                <p className="text-white/90 text-lg">
                  {user?.data?.email || "student@email.com"}
                </p>
                <div className="mt-3 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full">
                  <span className="text-white text-sm font-medium">
                    🎓 Student Profile
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="relative p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Left Column - About & Skills */}
              <div className="lg:col-span-2 space-y-4">
                {/* About Section */}
                <div className="bg-gradient-to-br from-[#fdfaf7] to-[#f9f3ec] p-5 rounded-2xl border border-[#e0c9a6] shadow-sm hover:shadow-md transition">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#b08968] to-[#8c5e3c] flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-[#6b4226]">
                      About Me
                    </h3>
                  </div>
                  <p className="text-[#6b4226]/80 leading-relaxed">
                    {bio ||
                      "Share your story, interests, and what drives your passion for learning."}
                  </p>
                </div>

                {/* Skills & Interests */}
                <div className="bg-gradient-to-br from-[#fdfaf7] to-[#f9f3ec] p-5 rounded-2xl border border-[#e0c9a6] shadow-sm hover:shadow-md transition">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#b08968] to-[#8c5e3c] flex items-center justify-center">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-[#6b4226]">
                      Skills & Interests
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-[#6b4226]/60 uppercase tracking-wide mb-1">
                        Technical Skills
                      </p>
                      <p className="text-[#6b4226]/80">
                        {skills || "Add your technical skills and expertise"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#6b4226]/60 uppercase tracking-wide mb-1">
                        Interests
                      </p>
                      <p className="text-[#6b4226]/80">
                        {interests || "Share what you're passionate about"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div className="bg-gradient-to-br from-[#fdfaf7] to-[#f9f3ec] p-5 rounded-2xl border border-[#e0c9a6] shadow-sm hover:shadow-md transition">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#b08968] to-[#8c5e3c] flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-[#6b4226]">
                      Education
                    </h3>
                  </div>
                  <p className="text-[#6b4226]/80 leading-relaxed">
                    {education ||
                      "Add your educational background and qualifications"}
                  </p>
                </div>
              </div>

              {/* Right Column - Social Links & Actions */}
              <div className="space-y-4">
                {/* Social Links */}
                <div className="bg-gradient-to-br from-[#fdfaf7] to-[#f9f3ec] p-5 rounded-2xl border border-[#e0c9a6] shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#b08968] to-[#8c5e3c] flex items-center justify-center">
                      <Globe className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-[#6b4226]">
                      Social Links
                    </h3>
                  </div>
                  <div className="space-y-3">
                    <SocialLink
                      icon={<Linkedin className="w-4 h-4" />}
                      label="LinkedIn"
                      url={socialLinks?.linkedin}
                      color="text-blue-600"
                    />
                    <SocialLink
                      icon={<Twitter className="w-4 h-4" />}
                      label="Twitter"
                      url={socialLinks?.twitter}
                      color="text-sky-500"
                    />
                    <SocialLink
                      icon={<Facebook className="w-4 h-4" />}
                      label="Facebook"
                      url={socialLinks?.facebook}
                      color="text-blue-700"
                    />
                    <SocialLink
                      icon={<Instagram className="w-4 h-4" />}
                      label="Instagram"
                      url={socialLinks?.instagram}
                      color="text-pink-600"
                    />
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-br from-[#fdfaf7] to-[#f9f3ec] p-5 rounded-2xl border border-[#e0c9a6] shadow-sm">
                  <h3 className="text-sm font-bold text-[#6b4226] mb-3 flex items-center gap-2">
                    <span>⚡</span> Quick Actions
                  </h3>
                  <div className="space-y-2">
                    <Link
                      to="/create-student-profile"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/50 hover:bg-white border border-[#e0c9a6]/50 text-[#6b4226] text-sm font-medium transition"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Create Profile
                    </Link>
                    <Link
                      to="/update-student-profile"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/50 hover:bg-white border border-[#e0c9a6]/50 text-[#6b4226] text-sm font-medium transition"
                    >
                      <Edit3 className="w-4 h-4" />
                      Update Profile
                    </Link>
                    <Link
                      to="/verify-student-profile"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/50 hover:bg-white border border-[#e0c9a6]/50 text-[#6b4226] text-sm font-medium transition"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Verify Student
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SocialLink = ({ icon, label, url, color }) => (
  <div className="flex items-center gap-2">
    <div className={`${color}`}>{icon}</div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-[#6b4226]/60 font-medium">{label}</p>
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-[#6b4226] hover:text-[#8c5e3c] transition truncate block"
        >
          View Profile
        </a>
      ) : (
        <p className="text-xs text-[#6b4226]/40">Not added</p>
      )}
    </div>
  </div>
);

export default StudentProfilePage;
