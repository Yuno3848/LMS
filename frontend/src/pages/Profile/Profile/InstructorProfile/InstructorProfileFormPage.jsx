import React, { useEffect } from "react";
import {
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Camera,
  Save,
  BookOpen,
  Globe,
  Star,
  Award,
} from "lucide-react";
import { useSelector } from "react-redux";
import Loading from "../../../../components/Loading";

const InstructorProfileForm = ({
  title,
  formData,
  setFormData,
  handleSubmit,
  submitLabel,
  submitIcon,
}) => {
  const instructorProfile = useSelector(
    (state) => state.instructorProfile.profile
  );
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (instructorProfile?.data) {
      setFormData({
        bio: instructorProfile.bio || "",
        expertise: instructorProfile.expertise || "",
        socialLinks: {
          linkedin: instructorProfile.socialLinks?.linkedin || "",
          twitter: instructorProfile.socialLinks?.twitter || "",
          facebook: instructorProfile.socialLinks?.facebook || "",
          instagram: instructorProfile.socialLinks?.instagram || "",
        },
        rating: instructorProfile?.rating,
      });
    }
  }, [instructorProfile]);

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
                    {user?.data?.avatar?.url ? (
                      <img
                        src={user.data.avatar.url}
                        alt="Profile Avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-5xl">👨‍🏫</span>
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 w-10 h-10 bg-white rounded-full shadow-lg border-2 border-[#e0c9a6] flex items-center justify-center hover:scale-110 transition-transform">
                    <Camera className="w-5 h-5 text-[#6b4226]" />
                  </button>
                </div>
              </div>
              <div className="text-center md:text-left flex-1">
                <h1 className="text-4xl font-bold text-white mb-2">
                  {title || "Edit Instructor Profile"}
                </h1>
                <p className="text-white/90 text-lg">
                  {user?.data?.fullname || "Instructor Name"}
                </p>
                <div className="mt-3 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full">
                  <span className="text-white text-sm font-medium">
                    ✏️ Share your teaching journey
                  </span>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="relative p-8">
            <div className="space-y-6">
              {/* About Section */}
              <div className="bg-gradient-to-br from-[#fdfaf7] to-[#f9f3ec] p-6 rounded-2xl border border-[#e0c9a6] shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#b08968] to-[#8c5e3c] flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#6b4226]">
                    About You
                  </h3>
                </div>
                <textarea
                  value={formData?.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  rows={4}
                  placeholder="Tell students about your background, teaching philosophy, and what makes your approach unique..."
                  className="w-full px-4 py-3 border-2 border-[#e0c9a6] rounded-xl bg-white/70 focus:border-[#b08968] focus:bg-white focus:ring-4 focus:ring-[#b08968]/10 transition-all outline-none placeholder:text-[#6b4226]/40 text-[#6b4226] resize-none"
                />
              </div>

              <div className="bg-gradient-to-br from-[#fdfaf7] to-[#f9f3ec] p-6 rounded-2xl border border-[#e0c9a6] shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#b08968] to-[#8c5e3c] flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#6b4226]">
                    Expertise & Rating
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#6b4226]/60 uppercase tracking-wide mb-2">
                      Area of Expertise
                    </label>
                    <input
                      type="text"
                      value={formData?.expertise}
                      onChange={(e) =>
                        setFormData({ ...formData, expertise: e.target.value })
                      }
                      placeholder="e.g., Web Development, Data Science"
                      className="w-full px-4 py-3 border-2 border-[#e0c9a6] rounded-xl bg-white/70 focus:border-[#b08968] focus:bg-white focus:ring-4 focus:ring-[#b08968]/10 transition-all outline-none placeholder:text-[#6b4226]/40 text-[#6b4226]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#6b4226]/60 uppercase tracking-wide mb-2">
                      Rating (0-5)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={formData?.rating}
                      onChange={(e) =>
                        setFormData({ ...formData, rating: e.target.value })
                      }
                      placeholder="4.5"
                      className="w-full px-4 py-3 border-2 border-[#e0c9a6] rounded-xl bg-white/70 focus:border-[#b08968] focus:bg-white focus:ring-4 focus:ring-[#b08968]/10 transition-all outline-none placeholder:text-[#6b4226]/40 text-[#6b4226]"
                    />
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="bg-gradient-to-br from-[#fdfaf7] to-[#f9f3ec] p-6 rounded-2xl border border-[#e0c9a6] shadow-sm">
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
                        <input
                          type="url"
                          value={formData?.socialLinks[name]}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              socialLinks: {
                                ...formData?.socialLinks,
                                [name]: e.target.value,
                              },
                            })
                          }
                          placeholder={`https://${name}.com/yourprofile`}
                          className="w-full pl-11 pr-4 py-3 border-2 border-[#e0c9a6] rounded-xl bg-white/70 focus:border-[#b08968] focus:bg-white focus:ring-4 focus:ring-[#b08968]/10 transition-all outline-none placeholder:text-[#6b4226]/40 text-[#6b4226]"
                        />
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                          <Icon className={`w-5 h-5 ${color}`} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-[#b08968] to-[#8c5e3c] text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#8c5e3c] to-[#6b4226] opacity-0 group-hover:opacity-100 transition"></span>
                  {submitIcon || <Save className="w-5 h-5 relative" />}
                  <span className="relative">
                    {submitLabel || "Save Profile"}
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InstructorProfileForm;
