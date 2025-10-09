import { useEffect } from "react";
import { User, Shield } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loading from "../../../../../components/Loading";
import {
  setStudentLoading,
  setStudentProfile,
} from "../../../../../redux/slicers/studentProfileSlicer";
import { studentProfileApiFetch } from "../../../../../ApiFetch/studentProfileApiFetch";
import { useNavigate } from "react-router";

const VerifyStudent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const studentProfile = useSelector((state) => state.studentProfile.profile);
  const user = useSelector((state) => state.auth.user);

  // Fetch student profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      dispatch(setStudentLoading(true));
      try {
        const result = await studentProfileApiFetch.getStudentProfile();
        if (result.success) {
          dispatch(setStudentProfile(result.data.data));
        }
      } catch (err) {
        console.error("Failed to fetch student profile:", err);
      } finally {
        dispatch(setStudentLoading(false));
      }
    };
    fetchProfile();
  }, [dispatch]);

  if (!studentProfile) return <Loading />;

  const student = studentProfile?.[0];
  const username = studentProfile?.username;
  const email = student?.email;
  user;
  const handleVerify = async () => {
    dispatch(setStudentLoading(true));
    try {
      const result = await studentProfileApiFetch.verifyStudent();
      if (result.success) {
        toast.success(
          `${username || "Student"} verification sent successfully!`
        );
        dispatch(setStudentProfile(result.data.data));
        navigate("/student-verification");
      } else {
        toast.error(
          "A verification request for this student has already been submitted!"
        );
      }
    } catch (error) {
      toast.error("Student verification failed");
    } finally {
      dispatch(setStudentLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-[#A27957]/10 to-[#A27957]/20 py-12 px-6 flex items-center justify-center">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl border border-stone-200/60 p-8 w-full max-w-md text-center">
        {/* Avatar */}
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#A27957] via-stone-700 to-[#A27957] p-1 shadow-2xl mx-auto mb-4">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#A27957]/40 to-stone-300 flex items-center justify-center overflow-hidden">
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

        {/* Name & Email */}
        <h2 className="text-xl font-bold text-stone-800 mb-1">
          {user?.data?.username || "Unnamed"}
        </h2>
        <p className="text-stone-500 mb-6">
          {user?.data?.email || "No email provided"}
        </p>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#A27957] text-white font-semibold hover:bg-[#8d674b] transition-all"
        >
          <Shield className="w-5 h-5" /> Verify Student
        </button>
      </div>
    </div>
  );
};

export default VerifyStudent;
