import {
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  Camera,
  Save,
  User,
  BookOpen,
  Globe,
  Star,
  GraduationCap,
  Mail,
  Phone,
,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { studentProfileApiFetch } from "../../../../ApiFetch/studentProfileApiFetch";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { setStudentProfile } from "../../../../redux/slicers/studentProfileSlicer";

const StudentProfile = () => {
  const [formData, setFormData] = useState({
    bio: "",
    skills: "",
    socialLinks: {
      linkedin: "",
      twitter: "",
      facebook: "",
      instagram: "",
    },
    education: "",
    interests: "",
  });

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const studentProfile = useSelector((state) => state.studentProfile.profile);

  useEffect(() => {
    if (studentProfile._id || studentProfile.id ) {
      setFormData(studentProfile);
    }
  }, [studentProfile]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let result;
      if (studentProfile) {
        result = await studentProfileApiFetch.updateStudentProfile(formData);
      } else {
        result = await studentProfileApiFetch.createStudentProfile(formData);
      }

      if (result.success) {
        toast.success(result?.data?.message);
        dispatch(setStudentProfile(result.data));
      } else {
        toast.error(result?.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-amber-50 to-yellow-50 py-12 px-4">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-stone-200/50 p-8 mb-8 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-stone-200/20 to-amber-200/20 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-yellow-100/20 to-stone-200/20 rounded-full translate-y-12 -translate-x-12"></div>

          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-amber-700 to-stone-700 rounded-2xl shadow-lg">
                <User className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-stone-700 to-amber-800 bg-clip-text text-transparent">
                Student Profile
              </h1>
            </div>
            <p className="text-stone-600/80 text-lg font-medium">
              Showcase your academic journey and achievements
            </p>
          </div>
        </div>
        {/* Main Profile Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-stone-200/50 overflow-hidden">
          {/* Profile Picture Section */}
          <div className="bg-gradient-to-r from-stone-100 to-amber-100 p-8 text-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-stone-50/50 to-amber-50/50"></div>
            <div className="absolute top-4 left-4 w-8 h-8 bg-stone-200/30 rounded-full"></div>
            <div className="absolute top-8 right-8 w-6 h-6 bg-amber-200/30 rounded-full"></div>
            <div className="absolute bottom-6 left-8 w-4 h-4 bg-yellow-200/30 rounded-full"></div>

            <div className="relative inline-block group">
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-amber-600 via-stone-600 to-amber-700 p-1 shadow-2xl">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-200 to-stone-300 flex items-center justify-center overflow-hidden">
                  <User className="w-20 h-20 text-stone-700" />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-3 shadow-lg border-2 border-stone-200 group-hover:scale-110 transition-transform cursor-pointer">
                <Camera className="w-6 h-6 text-stone-600" />
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Basic Information */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-stone-800 flex items-center gap-3 border-b border-stone-200 pb-3">
                <div className="p-2 bg-stone-100 rounded-lg">
                  <User className="w-5 h-5 text-stone-600" />
                </div>
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-stone-700 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={user.data.fullname || ""}
                    readOnly
                    className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl bg-stone-50/50 focus:border-stone-400 focus:bg-white focus:ring-4 focus:ring-stone-100 transition-all duration-200 outline-none placeholder:text-stone-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-stone-700 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user.data.email || ""}
                    readOnly
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl bg-stone-50/50 focus:border-stone-400 focus:bg-white focus:ring-4 focus:ring-stone-100 transition-all duration-200 outline-none placeholder:text-stone-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-stone-700 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => {
                    setFormData({ ...formData, bio: e.target.value });
                  }}
                  className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl bg-stone-50/50 focus:border-stone-400 focus:bg-white focus:ring-4 focus:ring-stone-100 transition-all duration-200 outline-none resize-none placeholder:text-stone-400"
                  rows="4"
                  placeholder="Tell us about yourself, your goals, and what makes you unique..."
                />
              </div>
            </section>

            {/* Skills & Interests */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-stone-800 flex items-center gap-3 border-b border-stone-200 pb-3">
                <div className="p-2 bg-stone-100 rounded-lg">
                  <Star className="w-5 h-5 text-stone-600" />
                </div>
                Skills & Interests
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-stone-700 flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Technical Skills
                  </label>
                  <input
                    type="text"
                    value={formData.skills}
                    onChange={(e) => {
                      setFormData({ ...formData, skills: e.target.value });
                    }}
                    placeholder="JavaScript, Python, React, Node.js..."
                    className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl bg-stone-50/50 focus:border-stone-400 focus:bg-white focus:ring-4 focus:ring-stone-100 transition-all duration-200 outline-none placeholder:text-stone-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-stone-700 flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Interests & Hobbies
                  </label>
                  <input
                    type="text"
                    value={formData.interests}
                    onChange={(e) => {
                      setFormData({ ...formData, interests: e.target.value });
                    }}
                    placeholder="Machine Learning, Photography, Music..."
                    className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl bg-stone-50/50 focus:border-stone-400 focus:bg-white focus:ring-4 focus:ring-stone-100 transition-all duration-200 outline-none placeholder:text-stone-400"
                  />
                </div>
              </div>
            </section>

            {/* Education & Verification */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-stone-800 flex items-center gap-3 border-b border-stone-200 pb-3">
                <div className="p-2 bg-stone-100 rounded-lg">
                  <GraduationCap className="w-5 h-5 text-stone-600" />
                </div>
                Education & Status
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-stone-700 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Education
                  </label>
                  <input
                    type="text"
                    value={formData.education}
                    onChange={(e) => {
                      setFormData({ ...formData, education: e.target.value });
                    }}
                    placeholder="B.Sc in Computer Science, University Name"
                    className="w-full px-4 py-3 border-2 border-stone-200 rounded-xl bg-stone-50/50 focus:border-stone-400 focus:bg-white focus:ring-4 focus:ring-stone-100 transition-all duration-200 outline-none placeholder:text-stone-400"
                  />
                </div>
              </div>
            </section>

            {/* Social Links */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-stone-800 flex items-center gap-3 border-b border-stone-200 pb-3">
                <div className="p-2 bg-stone-100 rounded-lg">
                  <Globe className="w-5 h-5 text-stone-600" />
                </div>
                Social Links
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-stone-700 flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-blue-600" />
                    LinkedIn
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      value={formData.socialLinks.linkedin}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          socialLinks: {
                            ...formData.socialLinks,
                            linkedin: e.target.value,
                          },
                        });
                      }}
                      placeholder="https://linkedin.com/in/yourprofile"
                      className="w-full px-4 py-3 pl-12 border-2 border-stone-200 rounded-xl bg-stone-50/50 focus:border-stone-400 focus:bg-white focus:ring-4 focus:ring-stone-100 transition-all duration-200 outline-none placeholder:text-stone-400"
                    />
                    <Linkedin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-600" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-stone-700 flex items-center gap-2">
                    <Twitter className="w-4 h-4 text-sky-500" />
                    Twitter
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      value={formData.socialLinks.twitter}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          socialLinks: {
                            ...formData.socialLinks,
                            twitter: e.target.value,
                          },
                        });
                      }}
                      placeholder="https://twitter.com/yourusername"
                      className="w-full px-4 py-3 pl-12 border-2 border-stone-200 rounded-xl bg-stone-50/50 focus:border-stone-400 focus:bg-white focus:ring-4 focus:ring-stone-100 transition-all duration-200 outline-none placeholder:text-stone-400"
                    />
                    <Twitter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-sky-500" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-stone-700 flex items-center gap-2">
                    <Facebook className="w-4 h-4 text-blue-600" />
                    Facebook
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      value={formData.socialLinks.facebook}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          socialLinks: {
                            ...formData.socialLinks,
                            facebook: e.target.value,
                          },
                        });
                      }}
                      placeholder="https://facebook.com/yourprofile"
                      className="w-full px-4 py-3 pl-12 border-2 border-stone-200 rounded-xl bg-stone-50/50 focus:border-stone-400 focus:bg-white focus:ring-4 focus:ring-stone-100 transition-all duration-200 outline-none placeholder:text-stone-400"
                    />
                    <Facebook className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-600" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-stone-700 flex items-center gap-2">
                    <Instagram className="w-4 h-4 text-pink-500" />
                    Instagram
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      value={formData.socialLinks.instagram}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          socialLinks: {
                            ...formData.socialLinks,
                            instagram: e.target.value,
                          },
                        });
                      }}
                      placeholder="https://instagram.com/yourusername"
                      className="w-full px-4 py-3 pl-12 border-2 border-stone-200 rounded-xl bg-stone-50/50 focus:border-stone-400 focus:bg-white focus:ring-4 focus:ring-stone-100 transition-all duration-200 outline-none placeholder:text-stone-400"
                    />
                    <Instagram className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-pink-500" />
                  </div>
                </div>
              </div>
            </section>

            {/* Save Button */}
            <div className="flex justify-center pt-8">
              <button className="group relative px-8 py-4 bg-stone-800 hover:bg-stone-900 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <Save className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  Save Profile
                </div>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StudentProfile;
