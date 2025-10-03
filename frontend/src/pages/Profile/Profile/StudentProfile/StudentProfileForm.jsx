import React, { useEffect } from "react";
import {
  User,
  BookOpen,
  Star,
  GraduationCap,
  Globe,
  Camera,
  Save,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
} from "lucide-react";
import { useSelector } from "react-redux";
import Loading from "../../../../components/Loading";

const StudentProfileForm = ({
  title,
  formData,
  setFormData,
  handleSubmit,
  submitLabel,
  submitIcon,
}) => {
  const user = useSelector((state) => state.auth.user);
  const studentProfile = useSelector((state) => state.studentProfile.profile);
  const isLoading = useSelector((state) => state.studentProfile.loading);

  if (isLoading || !studentProfile) return <Loading />;

  const socialPlatforms = ["linkedin", "twitter", "facebook", "instagram"];
  const socialColors = {
    linkedin: "text-blue-600",
    twitter: "text-sky-500",
    facebook: "text-blue-600",
    instagram: "text-pink-500",
  };

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
                    {user?.data?.avatar ? (
                      <img
                        src={user?.data?.avatar?.url}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-20 h-20 text-stone-700" />
                    )}
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-3 shadow-lg border-2 border-stone-200 hover:scale-110 transition-transform cursor-pointer">
                  <Camera className="w-6 h-6 text-stone-600" />
                </div>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-stone-800">
                {user?.data?.fullname || "Student Name"}
              </h2>
              <p className="text-stone-500">{studentProfile?.education}</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* About / Bio */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-stone-200/60 p-6">
            <h3 className="text-xl font-bold flex items-center gap-2 text-stone-800 border-b border-stone-200 pb-3 mb-4">
              <BookOpen className="w-5 h-5 text-amber-700" /> About
            </h3>
            <textarea
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              rows={4}
              placeholder="Tell students about yourself..."
              className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl bg-stone-50/50 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100 transition-all outline-none placeholder:text-stone-400"
            />
          </div>

          {/* Skills & Interests */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-stone-200/60 p-6">
            <h3 className="text-xl font-bold flex items-center gap-2 text-stone-800 border-b border-stone-200 pb-3 mb-4">
              <Star className="w-5 h-5 text-amber-700" /> Skills & Interests
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={formData.skills}
                onChange={(e) =>
                  setFormData({ ...formData, skills: e.target.value })
                }
                placeholder="Technical Skills"
                className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl bg-stone-50/50 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100 transition-all outline-none placeholder:text-stone-400"
              />
              <input
                type="text"
                value={formData.interests}
                onChange={(e) =>
                  setFormData({ ...formData, interests: e.target.value })
                }
                placeholder="Interests & Hobbies"
                className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl bg-stone-50/50 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100 transition-all outline-none placeholder:text-stone-400"
              />
            </div>
          </div>

          {/* Education */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-stone-200/60 p-6">
            <h3 className="text-xl font-bold flex items-center gap-2 text-stone-800 border-b border-stone-200 pb-3 mb-4">
              <GraduationCap className="w-5 h-5 text-amber-700" /> Education
            </h3>
            <input
              type="text"
              value={formData.education}
              onChange={(e) =>
                setFormData({ ...formData, education: e.target.value })
              }
              placeholder="Degree, University"
              className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl bg-stone-50/50 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100 transition-all outline-none placeholder:text-stone-400"
            />
          </div>

          {/* Social Links */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-stone-200/60 p-6">
            <h3 className="text-xl font-bold flex items-center gap-2 text-stone-800 border-b border-stone-200 pb-3 mb-4">
              <Globe className="w-5 h-5 text-amber-700" /> Social Links
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {socialPlatforms.map((platform) => {
                const Icon = {
                  linkedin: Linkedin,
                  twitter: Twitter,
                  facebook: Facebook,
                  instagram: Instagram,
                }[platform];
                return (
                  <div key={platform} className="relative">
                    <input
                      type="url"
                      value={formData.socialLinks[platform]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socialLinks: {
                            ...formData.socialLinks,
                            [platform]: e.target.value,
                          },
                        })
                      }
                      placeholder={`${platform}.com/yourprofile`}
                      className="w-full pl-10 px-4 py-3 border-2 border-stone-200 rounded-xl bg-stone-50/50 focus:border-amber-400 focus:bg-white focus:ring-4 focus:ring-amber-100 transition-all outline-none placeholder:text-stone-400"
                    />
                    <Icon
                      className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${socialColors[platform]}`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="group relative px-10 py-3 bg-gradient-to-r from-stone-800 via-stone-700 to-stone-800 text-white font-bold rounded-2xl shadow-xl flex items-center gap-2 hover:scale-105 transition-transform"
            >
              {submitIcon || <Save className="w-5 h-5" />} {submitLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileForm;
