import React, { useEffect, useState } from "react";
import { authApi } from "../../ApiFetch";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, updateUser } from "../../redux/authSlicer";
import { Camera, User, Edit3 } from "lucide-react";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
  });

  const [avatarPreview, setAvatarPreview] = useState("");

  useEffect(() => {
    return () => {
      if (avatarPreview && avatarPreview.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  useEffect(() => {
    if (user) {

      const userData = user.data || user;
      setFormData({
        fullname: userData?.fullname || "",
        username: userData?.username || "",
      });
      setAvatarPreview(userData?.avatar?.url || "");
    }
  }, [user]);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAvatarPreview(URL.createObjectURL(file));

    try {
      const form = new FormData();
      form.append("avatar", file);

      const result = await authApi.updateAvatar(form);
      if (result?.success) {
        toast.success("Avatar changed successfully");
        const newAvatarData = result?.data?.data?.avatar;
 

        const currentUserData = user?.data || user;


        const updatedUserData = {
          ...currentUserData,
          avatar: newAvatarData,
        };

        if (user?.data) {
          dispatch(updateUser({ ...user, data: updatedUserData }));
        } else {
          dispatch(updateUser(updatedUserData));
        }

      
        setAvatarPreview(newAvatarData?.url || "");
      } else {
        toast.error(result.error || "Failed to change the avatar");
      
        const userData = user?.data || user;
        setAvatarPreview(userData?.avatar?.url || "");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
     
      const userData = user?.data || user;
      setAvatarPreview(userData?.avatar?.url || "");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const result = await authApi.updateProfile(formData);
      if (result?.data?.success) {
        const currentUserData = user?.data || user;
        const updatedProfileData = {
          ...currentUserData,
          ...result.data.data,
     
          avatar: result.data.data.avatar || currentUserData?.avatar,
        };

        setFormData({
          fullname: updatedProfileData.fullname || "",
          username: updatedProfileData.username || "",
        });
        
        if (user?.data) {
          dispatch(updateUser({ ...user, data: updatedProfileData }));
        } else {
          dispatch(updateUser(updatedProfileData));
        }

        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      toast.error("Update profile failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getCurrentAvatarUrl = () => {
    if (avatarPreview) return avatarPreview;
    const userData = user?.data || user;
    return userData?.avatar?.url || "";
  };

  return (
    <div>
   
      <style>{`
        @keyframes steam {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.7; }
          50% { transform: translateY(-10px) rotate(5deg); opacity: 0.9; }
          100% { transform: translateY(-20px) rotate(-5deg); opacity: 0; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(2deg); }
        }

        @keyframes bubble {
          0% { transform: scale(0) translateY(0); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: scale(1) translateY(-30px); opacity: 0; }
        }

        .steam { animation: steam 2s infinite; }
        .steam:nth-child(2) { animation-delay: 0.5s; }
        .steam:nth-child(3) { animation-delay: 1s; }
        .chai-float { animation: float 3s ease-in-out infinite; }
        .bubble { animation: bubble 1.5s infinite; }
        .bubble:nth-child(2) { animation-delay: 0.3s; }
        .bubble:nth-child(3) { animation-delay: 0.6s; }
      `}</style>

      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{
          background: `linear-gradient(135deg, #d4b996 0%, #f5e6ca 50%, #d4b996 100%)`,
        }}
      >
        <div
          className="w-full max-w-lg p-8 rounded-3xl shadow-2xl border overflow-hidden"
          style={{
            backgroundColor: "rgba(255, 250, 242, 0.9)",
            borderColor: "rgba(212, 185, 150, 0.3)",
          }}
        >
          {/* Header Section */}
          <div
            className="text-center mb-8 relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, rgba(212, 185, 150, 0.2) 0%, rgba(212, 185, 150, 0.1) 100%)`,
              marginLeft: "-2rem",
              marginRight: "-2rem",
              marginTop: "-2rem",
              padding: "2rem",
              borderBottom: "1px solid rgba(212, 185, 150, 0.2)",
            }}
          >
            {/* Chai Cup */}
            <div className="chai-float w-20 h-20 mx-auto mb-4 relative">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden"
                style={{
                  background: `linear-gradient(145deg, #d4b996, #c19a6b)`,
                }}
              >
                {/* Liquid */}
                <div
                  className="absolute bottom-2 left-2 right-2 h-8 rounded-lg"
                  style={{ backgroundColor: "#6b4226" }}
                />

                {/* Handle */}
                <div
                  className="absolute -right-2 top-4 w-4 h-6 border-2 rounded-full"
                  style={{ borderColor: "#d4b996" }}
                />

                {/* Steam */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  <div
                    className="steam w-1 h-3 rounded-full opacity-60"
                    style={{ backgroundColor: "#d4b996" }}
                  ></div>
                  <div
                    className="steam w-1 h-3 rounded-full opacity-60"
                    style={{ backgroundColor: "#d4b996" }}
                  ></div>
                  <div
                    className="steam w-1 h-3 rounded-full opacity-60"
                    style={{ backgroundColor: "#d4b996" }}
                  ></div>
                </div>

                {/* Bubbles */}
                <div className="absolute bottom-3 left-3 flex space-x-1">
                  <div
                    className="bubble w-1 h-1 rounded-full"
                    style={{ backgroundColor: "rgba(212, 185, 150, 0.8)" }}
                  ></div>
                  <div
                    className="bubble w-1 h-1 rounded-full"
                    style={{ backgroundColor: "rgba(212, 185, 150, 0.8)" }}
                  ></div>
                  <div
                    className="bubble w-1 h-1 rounded-full"
                    style={{ backgroundColor: "rgba(212, 185, 150, 0.8)" }}
                  ></div>
                </div>

                <Edit3
                  className="w-6 h-6 relative z-10"
                  style={{ color: "#6b4226" }}
                />
              </div>
            </div>

            <h2
              className="text-3xl font-bold mb-2"
              style={{ color: "#6b4226" }}
            >
              ☕ Edit Profile
            </h2>
            <p className="text-sm opacity-80" style={{ color: "#6b4226" }}>
              Keep your information fresh like morning chai
            </p>
          </div>

          {/* Avatar Upload */}
          <div className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative group">
                <div
                  className="w-32 h-32 rounded-full overflow-hidden border-4 shadow-lg transition-transform duration-300 group-hover:scale-105"
                  style={{
                    background: `linear-gradient(145deg, rgba(212, 185, 150, 0.3), rgba(212, 185, 150, 0.1))`,
                    borderColor: "rgba(212, 185, 150, 0.5)",
                  }}
                >
                  {getCurrentAvatarUrl() ? (
                    <img
                      src={getCurrentAvatarUrl()}
                      alt="Avatar preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User
                        className="w-16 h-16"
                        style={{ color: "#d4b996" }}
                      />
                    </div>
                  )}
                </div>

                <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                  <Camera className="w-8 h-8 text-white" />
                </div>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
                />
              </div>

              <div className="text-center">
                <p className="text-sm mb-1" style={{ color: "#6b4226" }}>
                  Click to change avatar
                </p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-5">
              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: "#6b4226" }}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullname}
                  onChange={(e) =>
                    setFormData({ ...formData, fullname: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:scale-[1.02]"
                  style={{
                    backgroundColor: "rgba(212, 185, 150, 0.1)",
                    borderColor: "rgba(212, 185, 150, 0.5)",
                    color: "#6b4226",
                  }}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  style={{ color: "#6b4226" }}
                >
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Choose a unique username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:scale-[1.02]"
                  style={{
                    backgroundColor: "rgba(212, 185, 150, 0.1)",
                    borderColor: "rgba(212, 185, 150, 0.5)",
                    color: "#6b4226",
                  }}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              onClick={handleSubmit}
              className="w-full font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              style={{
                background: loading
                  ? "#6b4226"
                  : `linear-gradient(135deg, #6b4226 0%, #8c5e3c 100%)`,
                color: "white",
              }}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div
                    className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin"
                    style={{
                      borderColor: "rgba(212, 185, 150, 0.3)",
                      borderTopColor: "transparent",
                    }}
                  />
                  <span>Updating...</span>
                </div>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs opacity-70" style={{ color: "#6b4226" }}>
              Enjoying your chai break? ☕ Your profile information is secure
              and private
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
