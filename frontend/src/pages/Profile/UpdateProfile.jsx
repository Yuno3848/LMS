import React from "react";
import { authApi } from "../../ApiFetch";
import toast from "react-hot-toast";

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
  });

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const handleUpdateProfile = async () => {
      try {
        const result = await authApi.updateProfile(formData);
        if (result.success) {
          setFormData(result.formData);
          console.log("updateProfile", result.formData);
          toast.success("profile updated");
        } else {
          console.log | ("update profile failed", error.message);
        }
      } catch (error) {
        toast.error("update profile failed");
      } finally {
        setLoading(false);
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5e6ca] via-[#fefaf5] to-[#e7d3b5]">
      {loading ? (
        <div className="text-lg font-semibold text-[#6b4226] animate-pulse">
          Loading your profile...
        </div>
      ) : (
        <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-[#fffaf2] border border-[#e0c9a6]">
          <h2 className="text-3xl font-extrabold text-center text-[#6b4226] mb-4">
            ✏️ Edit Profile
          </h2>

          <form className="space-y-5">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 border rounded-lg border-[#d4b996] bg-[#fdfaf7] focus:ring-2 focus:ring-[#c19a6b] focus:outline-none transition"
            />

            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-3 border rounded-lg border-[#d4b996] bg-[#fdfaf7] focus:ring-2 focus:ring-[#c19a6b] focus:outline-none transition"
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#b08968] to-[#8c5e3c] text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:from-[#8c5e3c] hover:to-[#6b4226] transition transform hover:-translate-y-0.5"
            >
              Save Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateProfile;
