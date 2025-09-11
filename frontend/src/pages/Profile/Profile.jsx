import React, { useEffect, useState } from "react";
import { authApi } from "../../ApiFetch";
import toast from "react-hot-toast";
import { Link } from "react-router";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleProfile = async () => {
      try {
        const result = await authApi.profile();
        if (result.success) {
          setUser(result.data.data);
          console.log(result.data.data);
        } else {
          console.log("profile fetch failed", result.error);
        }
      } catch (error) {
        toast.error("profile fetched failed");
        console.log("unexpected error while fetching profile", error.message);
      } finally {
        setLoading(false);
      }
    };
    handleProfile();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5e6ca] via-[#fefaf5] to-[#e7d3b5]">
      {loading ? (
        <div className="text-lg font-semibold text-[#6b4226] animate-pulse">
          Loading your profile...
        </div>
      ) : (
        <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-[#fffaf2] border border-[#e0c9a6]  ">
          <h2 className="text-3xl font-extrabold text-center text-[#6b4226] mb-2">
            👤 Your Profile
          </h2>

          <form className="space-y-5 relative ">
            <div className="flex justify-center mt-5">
              {user?.avatar?.url && (
                <img
                  src={user.avatar.url}
                  alt="Profile Avatar"
                  className="w-30 h-30 object-cover rounded-full border border-[#d4b996] mb-3 shadow-md "
                />
              )}
            </div>

            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-3 border rounded-lg border-[#d4b996] bg-[#fdfaf7] focus:ring-2 focus:ring-[#c19a6b] focus:outline-none transition"
              readOnly
              value={user?.username ?? ""}
            />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 border rounded-lg border-[#d4b996] bg-[#fdfaf7] focus:ring-2 focus:ring-[#c19a6b] focus:outline-none transition"
              readOnly
              value={user?.fullname ?? ""}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border rounded-lg border-[#d4b996] bg-[#fdfaf7] focus:ring-2 focus:ring-[#c19a6b] focus:outline-none transition"
              readOnly
              value={user?.email ?? ""}
            />

            <Link
              to="/updateprofile"
              className="block w-full text-center bg-gradient-to-r from-[#b08968] to-[#8c5e3c] text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:from-[#8c5e3c] hover:to-[#6b4226] transition transform hover:-translate-y-0.5"
            >
              Update Profile
            </Link>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
