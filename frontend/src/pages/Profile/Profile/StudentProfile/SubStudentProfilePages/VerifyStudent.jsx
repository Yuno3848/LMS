import { User, Shield } from "lucide-react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loading from "../../../../../components/Loading";

const VerifyStudent = () => {
  const studentProfile = useSelector((state) => state.studentProfile.profile);
  console.log(studentProfile);

  if (!studentProfile) return <Loading />;


  const user =
    Array.isArray(studentProfile) && studentProfile.length > 0
      ? studentProfile[0].studentProfile
      : {};

  const handleVerify = () => {
    toast.success(
      `${studentProfile?.fullname || "Student"} verified successfully!`
    );
   
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-amber-50 to-yellow-50 py-12 px-6 flex items-center justify-center">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-stone-200/60 p-8 w-full max-w-md text-center">
        {/* Avatar */}
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-700 via-stone-700 to-amber-800 p-1 shadow-2xl mx-auto mb-4">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-amber-200 to-stone-300 flex items-center justify-center overflow-hidden">
            {user?.avatar?.url ? (
              <img
                src={user.avatar.url}
                alt="avatar"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <User className="w-16 h-16 text-stone-700" />
            )}
          </div>
        </div>

        {/* Name & Email */}
        <h2 className="text-xl font-bold text-stone-800 mb-1">
          {studentProfile[0]?.username || "Unnamed"}
        </h2>
        <p className="text-stone-500 mb-6">
          {studentProfile[0]?.email || "No email provided"}
        </p>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-amber-600 text-white font-semibold hover:bg-amber-700 transition-all"
        >
          <Shield className="w-5 h-5" /> Verify Student
        </button>
      </div>
    </div>
  );
};

export default VerifyStudent;
