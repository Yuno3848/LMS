import {
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  User,
  BookOpen,
  Globe,
  Star,
  GraduationCap,
  Mail,
  Camera,
} from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { authApi } from "../../../../../ApiFetch/authApiFetch";
import Loading from "../../../../../components/Loading";

const StudentProfilePage = () => {
  const user = useSelector((state) => state.auth.user);
  const studentProfile = useSelector((state) => state.studentProfile.profile);
  console.log("student profile inside studentprofile page :", studentProfile);
  if (!studentProfile) {
    return <Loading />;
  }
  const { bio, skills, interests, education, socialLinks } =
    studentProfile?.data[0]?.studentProfile;

  console.log("student profile user", user.data.avatar.url);
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-amber-50 to-yellow-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-stone-200/50 p-8 mb-8 relative overflow-hidden">
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
              Discover the student’s journey and achievements
            </p>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-stone-200/50 overflow-hidden">
          <div className="bg-gradient-to-r from-stone-100 to-amber-100 p-8 text-center relative">
            <div className="absolute inset-0 bg-gradient-to-br from-stone-50/50 to-amber-50/50"></div>
            <div className="relative inline-block">
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-amber-600 via-stone-600 to-amber-700 p-1 shadow-2xl">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-200 to-stone-300 flex items-center justify-center overflow-hidden">
                  <img
                    src={user.data.avatar.url}
                    alt="User Avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-stone-800 flex items-center gap-3 border-b border-stone-200 pb-3">
                <div className="p-2 bg-stone-100 rounded-lg">
                  <User className="w-5 h-5 text-stone-600" />
                </div>
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoItem
                  icon={<User className="w-4 h-4" />}
                  label="Full Name"
                  value={user?.data?.fullname}
                />
                <InfoItem
                  icon={<Mail className="w-4 h-4" />}
                  label="Email Address"
                  value={user?.data?.email}
                />
              </div>
              <InfoItem
                icon={<BookOpen className="w-4 h-4" />}
                label="Bio"
                value={bio || "Not provided"}
                multiline
              />
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-stone-800 flex items-center gap-3 border-b border-stone-200 pb-3">
                <div className="p-2 bg-stone-100 rounded-lg">
                  <Star className="w-5 h-5 text-stone-600" />
                </div>
                Skills & Interests
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InfoItem
                  icon={<Star className="w-4 h-4" />}
                  label="Technical Skills"
                  value={skills || "Not provided"}
                />
                <InfoItem
                  icon={<Globe className="w-4 h-4" />}
                  label="Interests & Hobbies"
                  value={interests || "Not provided"}
                />
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-stone-800 flex items-center gap-3 border-b border-stone-200 pb-3">
                <div className="p-2 bg-stone-100 rounded-lg">
                  <GraduationCap className="w-5 h-5 text-stone-600" />
                </div>
                Education
              </h2>
              <InfoItem
                icon={<BookOpen className="w-4 h-4" />}
                label="Education"
                value={education || "Not provided"}
              />
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-stone-800 flex items-center gap-3 border-b border-stone-200 pb-3">
                <div className="p-2 bg-stone-100 rounded-lg">
                  <Globe className="w-5 h-5 text-stone-600" />
                </div>
                Social Links
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SocialLink platform="linkedin" url={socialLinks?.linkedin} />
                <SocialLink platform="twitter" url={socialLinks?.twitter} />
                <SocialLink platform="facebook" url={socialLinks?.facebook} />
                <SocialLink platform="instagram" url={socialLinks?.instagram} />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

/* 🔹 Reusable Info Display */
const InfoItem = ({ icon, label, value, multiline }) => (
  <div className="space-y-2">
    <label className="text-sm font-semibold text-stone-700 flex items-center gap-2">
      {icon} {label}
    </label>
    {multiline ? (
      <p className="px-4 py-3 border-2 border-stone-200 rounded-xl bg-stone-50/50 text-stone-700 whitespace-pre-wrap">
        {value}
      </p>
    ) : (
      <p className="px-4 py-3 border-2 border-stone-200 rounded-xl bg-stone-50/50 text-stone-700">
        {value}
      </p>
    )}
  </div>
);

const SocialLink = ({ platform, url }) => {
  const Icon = {
    linkedin: Linkedin,
    twitter: Twitter,
    facebook: Facebook,
    instagram: Instagram,
  }[platform];

  if (!url) return null;

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-stone-700 flex items-center gap-2">
        <Icon
          className={`w-4 h-4 ${
            platform === "twitter"
              ? "text-sky-500"
              : platform === "instagram"
              ? "text-pink-500"
              : "text-blue-600"
          }`}
        />
        {platform.charAt(0).toUpperCase() + platform.slice(1)}
      </label>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="block px-4 py-3 border-2 border-stone-200 rounded-xl bg-stone-50/50 text-stone-700 hover:text-amber-700 hover:border-amber-300 transition-all"
      >
        {url}
      </a>
    </div>
  );
};

export default StudentProfilePage;
