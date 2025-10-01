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
  Pencil,
  Shield,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"; 
import Loading from "../../../../../components/Loading";
import ShowStudentProfile from "../../../../../components/ShowStudentProfile";

const StudentProfilePage = () => {
  const user = useSelector((state) => state.auth.user);
  const studentProfile = useSelector((state) => state.studentProfile.profile);
  console.log(studentProfile);
  const instructorProfile = useSelector(
    (state) => state.instructorProfile.profile
  );

  if (!studentProfile) {
    return <Loading />;
  }

  const studentData = studentProfile[0]?.studentProfile || {};

  const { bio, skills, interests, education, socialLinks } = studentData;

  if (instructorProfile) return <ShowStudentProfile type="instructor" />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-amber-50 to-yellow-50 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* ===== LEFT SIDEBAR ===== */}
        <div className="space-y-6">
          {/* Avatar Card */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-stone-200/60 p-6 flex flex-col items-center relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-50/20 to-stone-50/20 rounded-3xl"></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-700 via-stone-700 to-amber-800 p-1 shadow-2xl">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-200 to-stone-300 flex items-center justify-center overflow-hidden">
                  {user?.data?.avatar?.url ? (
                    <img
                      src={user.data.avatar.url}
                      alt="avatar"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <User className="w-16 h-16 text-stone-700" />
                  )}
                </div>
              </div>
              <h2 className="mt-4 text-xl font-bold text-stone-800">
                {user?.data?.fullname || "Unnamed"}
              </h2>
              <p className="text-stone-500 text-sm">{user?.data?.email}</p>
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
                  to="/create-student-profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-amber-50 text-stone-700 font-medium"
                >
                  <Pencil className="w-4 h-4" /> Create Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/update-student-profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-amber-50 text-stone-700 font-medium"
                >
                  <Pencil className="w-4 h-4" /> Update Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/verify-student-profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-amber-50 text-stone-700 font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-badge-x-icon lucide-badge-x"
                  >
                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                    <line x1="15" x2="9" y1="9" y2="15" />
                    <line x1="9" x2="15" y1="9" y2="15" />
                  </svg>
                  <p>Verify Student</p>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-span-2 space-y-6">
          {/* About */}
          <ProfileCard
            icon={<BookOpen className="w-5 h-5 text-amber-700" />}
            title="About"
          >
            <p className="text-stone-600 leading-relaxed">
              {bio ||
                "Tell students about your background, journey, and style."}
            </p>
          </ProfileCard>

          {/* Skills & Interests */}
          <ProfileCard
            icon={<Star className="w-5 h-5 text-amber-700" />}
            title="Skills & Interests"
          >
            <div className="grid md:grid-cols-2 gap-4 text-stone-600">
              <p>
                <span className="font-semibold">Technical Skills:</span>{" "}
                {skills || "Not provided"}
              </p>
              <p>
                <span className="font-semibold">Interests:</span>{" "}
                {interests || "Not provided"}
              </p>
            </div>
          </ProfileCard>

          {/* Education */}
          <ProfileCard
            icon={<GraduationCap className="w-5 h-5 text-amber-700" />}
            title="Education"
          >
            <p className="text-stone-600">
              {education || "No education details added yet."}
            </p>
          </ProfileCard>

          {/* Social Links */}
          <ProfileCard
            icon={<Globe className="w-5 h-5 text-amber-700" />}
            title="Social Links"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <SocialField
                icon={<Linkedin className="w-4 h-4 text-sky-700" />}
                label="LinkedIn"
                url={socialLinks?.linkedin}
              />
              <SocialField
                icon={<Twitter className="w-4 h-4 text-sky-500" />}
                label="Twitter"
                url={socialLinks?.twitter}
              />
              <SocialField
                icon={<Facebook className="w-4 h-4 text-blue-600" />}
                label="Facebook"
                url={socialLinks?.facebook}
              />
              <SocialField
                icon={<Instagram className="w-4 h-4 text-pink-500" />}
                label="Instagram"
                url={socialLinks?.instagram}
              />
            </div>
          </ProfileCard>
        </div>
      </div>
    </div>
  );
};

/* ========== Reusable Card & Field Components ========== */
const ProfileCard = ({ icon, title, children }) => (
  <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-stone-200/60 p-6">
    <h3 className="flex items-center gap-2 text-stone-800 font-semibold mb-4 border-b border-stone-200 pb-2">
      {icon} {title}
    </h3>
    {children}
  </div>
);

const SocialField = ({ icon, label, url }) => (
  <div>
    <label className="flex items-center gap-2 text-sm font-semibold text-stone-700 mb-1">
      {icon} {label}
    </label>
    <a
      href={url || "#"}
      target="_blank"
      rel="noreferrer"
      className="block px-4 py-3 border-2 border-stone-200 rounded-xl bg-stone-50/50 text-stone-600 text-sm hover:border-amber-400 hover:text-amber-700 transition-all"
    >
      {url || `https://${label.toLowerCase()}.com/yourprofile`}
    </a>
  </div>
);

export default StudentProfilePage;
