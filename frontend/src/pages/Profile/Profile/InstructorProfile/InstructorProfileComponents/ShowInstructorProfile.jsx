import {
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  User,
  BookOpen,
  Globe,
  CheckCircle,
  Camera,
  Pencil,
} from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../../../../components/Loading";

const InstructorProfileCard = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.instructorProfile.profile);
  const userDetails = useSelector((state) => state.auth.user);

  const username = userDetails?.data?.username;
  const loading = useSelector((state) => state.instructorProfile.loading);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-amber-50 to-yellow-50 py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          {/* Profile Card */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-stone-200/60 p-6 text-center relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-50/20 to-stone-50/20 rounded-3xl"></div>
            <div className="relative z-10">
              <div className="inline-block relative">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-amber-700 via-stone-700 to-amber-800 p-1 shadow-2xl">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-200 to-stone-300 flex items-center justify-center overflow-hidden">
                    <User className="w-20 h-20 text-stone-700" />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-3 shadow-lg border-2 border-stone-200 hover:scale-110 transition-transform cursor-pointer">
                  <Camera className="w-6 h-6 text-stone-600" />
                </div>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-stone-800">
                {username || "Instructor Name"}
              </h2>
              <p className="text-stone-500">{profile?.expertise}</p>
            </div>
          </div>

          {/* Status Card */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-stone-200/60 p-6 space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2 text-stone-800">
              <CheckCircle className="w-5 h-5 text-amber-600" /> Status
            </h3>
            <div className="flex justify-between text-stone-600 font-medium">
              <span>Rating:</span>
              <span>{profile?.rating || "—"}</span>
            </div>
            <div className="flex justify-between text-stone-600 font-medium">
              <span>Verified:</span>
              <span>{profile?.isVerifiedInstructor ? "Yes" : "No"}</span>
            </div>
          </div>

          {/* Sidebar Navigation */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-stone-200/60 p-6 space-y-4">
            <h3 className="text-lg font-bold text-stone-800 mb-3">
              Navigation
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/update-instructor-profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-amber-50 text-stone-700 font-medium"
                >
                  <Pencil className="w-4 h-4" /> Update Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Bio */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-stone-200/60 p-6">
            <h3 className="text-xl font-bold flex items-center gap-2 text-stone-800 border-b border-stone-200 pb-3 mb-4">
              <BookOpen className="w-5 h-5 text-amber-700" /> About
            </h3>
            <p className="text-stone-600 leading-relaxed whitespace-pre-line">
              {profile?.bio ||
                "Tell students about your background, teaching style, and journey."}
            </p>
          </div>

          {/* Social Links */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-stone-200/60 p-6">
            <h3 className="text-xl font-bold flex items-center gap-2 text-stone-800 border-b border-stone-200 pb-3 mb-4">
              <Globe className="w-5 h-5 text-amber-700" /> Social Links
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {["linkedin", "twitter", "facebook", "instagram"].map(
                (platform) => {
                  const Icon = {
                    linkedin: Linkedin,
                    twitter: Twitter,
                    facebook: Facebook,
                    instagram: Instagram,
                  }[platform];
                  return (
                    <div key={platform} className="space-y-1">
                      <label className="text-sm font-semibold text-stone-700 flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        {platform.charAt(0).toUpperCase() + platform.slice(1)}
                      </label>
                      <input
                        type="url"
                        value={profile?.socialLinks?.[platform] || ""}
                        readOnly
                        placeholder={`https://${platform}.com/yourprofile`}
                        className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl bg-stone-50/50 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100 transition-all outline-none placeholder:text-stone-400"
                      />
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfileCard;
