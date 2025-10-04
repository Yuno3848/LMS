import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  BookOpen,
  Globe,
  Edit3,
  Award,
  Star,
  BadgeCheck,
  ShieldCheck,
} from "lucide-react";
import Loading from "../../../../../components/Loading";

const InstructorProfileCard = () => {
  const profile = useSelector((state) => state.instructorProfile.profile);
  const userDetails = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.instructorProfile.loading);

  const username = userDetails?.data?.username;
  const fullname = userDetails?.data?.fullname;
  const avatar = userDetails?.data?.avatar?.url;

  if (loading) return <Loading />;
  const instructorVerified = profile?.isVerifiedInstructor;
  const socialPlatforms = [
    { name: "linkedin", icon: Linkedin, color: "text-blue-600" },
    { name: "twitter", icon: Twitter, color: "text-sky-500" },
    { name: "facebook", icon: Facebook, color: "text-blue-700" },
    { name: "instagram", icon: Instagram, color: "text-pink-600" },
  ];

  return (
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
                    {avatar ? (
                      <img
                        src={avatar}
                        alt="Instructor Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-5xl">👨‍🏫</span>
                    )}
                  </div>
                  {profile?.isVerifiedInstructor === "verified" && (
                    <div className="absolute bottom-1 right-1 w-8 h-8 bg-blue-500 rounded-full border-4 border-white flex items-center justify-center">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </div>
              <div className="text-center md:text-left flex-1">
                <h1 className="text-4xl font-bold text-white mb-2">
                  {fullname || username || "Instructor Name"}
                </h1>
                <p className="text-white/90 text-lg">
                  @{username || "username"}
                </p>
                <div className="mt-3 flex flex-wrap gap-2 justify-center md:justify-start">
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full">
                    <span className="text-white text-sm font-medium">
                      👨‍🏫 Instructor
                    </span>
                  </div>
                  {profile?.expertise && (
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full">
                      <span className="text-white text-sm font-medium">
                        {profile.expertise}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="relative p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Left Column - About */}
              <div className="lg:col-span-2 space-y-4">
                {/* About Section */}
                <div className="bg-gradient-to-br from-[#fdfaf7] to-[#f9f3ec] p-5 rounded-2xl border border-[#e0c9a6] shadow-sm hover:shadow-md transition">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#b08968] to-[#8c5e3c] flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-[#6b4226]">About</h3>
                  </div>
                  <p className="text-[#6b4226]/80 leading-relaxed whitespace-pre-line">
                    {profile?.bio ||
                      "Tell students about your background, teaching style, and journey as an educator."}
                  </p>
                </div>

                {/* Social Links */}
                <div className="bg-gradient-to-br from-[#fdfaf7] to-[#f9f3ec] p-5 rounded-2xl border border-[#e0c9a6] shadow-sm hover:shadow-md transition">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#b08968] to-[#8c5e3c] flex items-center justify-center">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-[#6b4226]">
                      Social Links
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {socialPlatforms.map(({ name, icon: Icon, color }) => (
                      <div key={name}>
                        <label className="flex items-center gap-2 text-xs font-semibold text-[#6b4226]/60 uppercase tracking-wide mb-2">
                          <Icon className={`w-4 h-4 ${color}`} />
                          {name.charAt(0).toUpperCase() + name.slice(1)}
                        </label>
                        <div className="relative">
                          {profile?.socialLinks?.[name] ? (
                            <a
                              href={profile.socialLinks[name]}
                              target="_blank"
                              rel="noreferrer"
                              className="block w-full pl-11 pr-4 py-3 border-2 border-[#e0c9a6] rounded-xl bg-white/70 hover:bg-white hover:border-[#b08968] transition-all text-[#6b4226] text-sm truncate"
                            >
                              {profile.socialLinks[name]}
                            </a>
                          ) : (
                            <div className="w-full pl-11 pr-4 py-3 border-2 border-[#e0c9a6] rounded-xl bg-white/50 text-[#6b4226]/40 text-sm">
                              Not added
                            </div>
                          )}
                          <div className="absolute left-3 top-1/2 -translate-y-1/2">
                            <Icon className={`w-5 h-5 ${color}`} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Stats & Actions */}
              <div className="space-y-4">
                {/* Stats Card */}
                <div className="bg-gradient-to-br from-[#fdfaf7] to-[#f9f3ec] p-5 rounded-2xl border border-[#e0c9a6] shadow-sm">
                  <h3 className="text-sm font-bold text-[#6b4226] mb-3 flex items-center gap-2">
                    <Star className="w-4 h-4" /> Instructor Stats
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#6b4226]/60 uppercase tracking-wide">
                        Rating
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                        <span className="text-[#6b4226] font-bold">
                          {profile?.rating || "N/A"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#6b4226]/60 uppercase tracking-wide">
                        Verification
                      </span>
                      {profile?.isVerifiedInstructor === "verified" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          <Award className="w-3 h-3" />
                          Verified
                        </span>
                      ) : profile?.isVerifiedInstructor === "pending" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                          Pending
                        </span>
                      ) : profile?.isVerifiedInstructor === "rejected" ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                          Rejected
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                          Not Requested
                        </span>
                      )}
                    </div>

                    {profile?.expertise && (
                      <div className="pt-2 border-t border-[#e0c9a6]">
                        <span className="text-xs font-semibold text-[#6b4226]/60 uppercase tracking-wide block mb-1">
                          Expertise
                        </span>
                        <span className="text-[#6b4226] font-medium text-sm">
                          {profile.expertise}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-br from-[#fdfaf7] to-[#f9f3ec] p-5 rounded-2xl border border-[#e0c9a6] shadow-sm">
                  <h3 className="text-sm font-bold text-[#6b4226] mb-3 flex items-center gap-2">
                    <span>⚡</span> Quick Actions
                  </h3>
                  <Link
                    to="/update-instructor-profile"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/50 hover:bg-white border border-[#e0c9a6]/50 text-[#6b4226] text-sm font-medium transition w-full"
                  >
                    <Edit3 className="w-4 h-4" />
                    Update Profile
                  </Link>
                  {instructorVerified == "verified" ? (
                    <Link
                      to="/instructor-dashboard"
                      className="flex items-center mt-1.5 gap-2 px-3 py-2 rounded-lg bg-white/50 hover:bg-white border border-[#e0c9a6]/50 text-[#6b4226] text-sm font-medium transition w-full"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      Instructor Dashboard
                    </Link>
                  ) : (
                    <Link
                      to="/instructor-verification"
                      className="flex items-center mt-1.5 gap-2 px-3 py-2 rounded-lg bg-white/50 hover:bg-white border border-[#e0c9a6]/50 text-[#6b4226] text-sm font-medium transition w-full"
                    >
                      <BadgeCheck className="w-4 h-4" />
                      {profile?.isVerifiedInstructor === "not_requested"
                        ? "Request Instructor Role"
                        : profile?.isVerifiedInstructor === "pending"
                        ? "Verification Pending"
                        : profile?.isVerifiedInstructor === "verified"
                        ? "Verified Instructor"
                        : "Request Again"}
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-center">
              <Link
                to="/update-instructor-profile"
                className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-[#b08968] to-[#8c5e3c] text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#8c5e3c] to-[#6b4226] opacity-0 group-hover:opacity-100 transition"></span>
                <Edit3 className="w-5 h-5 relative" />
                <span className="relative">Update Your Profile</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfileCard;
