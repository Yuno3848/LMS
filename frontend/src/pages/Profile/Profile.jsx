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
    avatar: null,
  });

  const [avatarPreview, setAvatarPreview] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        fullname: user?.fullname || "",
        username: user?.username || "",
        avatar: null,
      });
      setAvatarPreview(user?.avatar || "");
    }
  }, [user]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, avatar: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const result = await authApi.updateProfile(formData);
      console.log("result", result);
      if (result?.data?.success) {
        setFormData({
          fullname: result?.data?.data?.fullname || "",
          username: result?.data?.data?.username || "",
          avatar: null,
        });
        dispatch(updateUser(result?.data?.data));
        toast.success("Profile updated successfully!");
      } else {
        console.log("update profile failed", result?.message);
        toast.error("Failed to update profile");
      }
    } catch (error) {
      toast.error("Update profile failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes steam {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 0.7;
            }
            50% {
              transform: translateY(-10px) rotate(5deg);
              opacity: 0.9;
            }
            100% {
              transform: translateY(-20px) rotate(-5deg);
              opacity: 0;
            }
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-8px) rotate(2deg);
            }
          }
          
          @keyframes bubble {
            0% {
              transform: scale(0) translateY(0);
              opacity: 0;
            }
            50% {
              opacity: 0.8;
            }
            100% {
              transform: scale(1) translateY(-30px);
              opacity: 0;
            }
          }

          .steam {
            animation: steam 2s infinite;
          }
          
          .steam:nth-child(2) {
            animation-delay: 0.5s;
          }
          
          .steam:nth-child(3) {
            animation-delay: 1s;
          }
          
          .chai-float {
            animation: float 3s ease-in-out infinite;
          }
          
          .bubble {
            animation: bubble 1.5s infinite;
          }
          
          .bubble:nth-child(2) {
            animation-delay: 0.3s;
          }
          
          .bubble:nth-child(3) {
            animation-delay: 0.6s;
          }
        `}
      </style>

      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{
          background: `linear-gradient(135deg, #d4b996 0%, #f5e6ca 50%, #d4b996 100%)`,
        }}
      >
        <div
          className="w-full max-w-md backdrop-blur-sm rounded-3xl shadow-2xl border overflow-hidden"
          style={{
            backgroundColor: "rgba(255, 250, 242, 0.9)",
            borderColor: "rgba(212, 185, 150, 0.3)",
          }}
        >
          <div
            className="px-8 py-8 text-center border-b relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, rgba(212, 185, 150, 0.2) 0%, rgba(212, 185, 150, 0.1) 100%)`,
              borderColor: "rgba(212, 185, 150, 0.2)",
            }}
          >
            <div className="chai-float w-20 h-20 mx-auto mb-4 relative">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden"
                style={{
                  background: `linear-gradient(145deg, #d4b996, #c19a6b)`,
                }}
              >
                <div
                  className="absolute bottom-2 left-2 right-2 h-8 rounded-lg"
                  style={{ backgroundColor: "#6b4226" }}
                />

                <div
                  className="absolute -right-2 top-4 w-4 h-6 border-2 rounded-full"
                  style={{ borderColor: "#d4b996" }}
                />

                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <div
                    className="steam w-1 h-3 rounded-full opacity-60"
                    style={{ backgroundColor: "#d4b996" }}
                  ></div>
                  <div
                    className="steam w-1 h-3 rounded-full opacity-60 ml-1"
                    style={{ backgroundColor: "#d4b996" }}
                  ></div>
                  <div
                    className="steam w-1 h-3 rounded-full opacity-60 ml-1"
                    style={{ backgroundColor: "#d4b996" }}
                  ></div>
                </div>

                <div className="absolute bottom-3 left-3">
                  <div
                    className="bubble w-1 h-1 rounded-full"
                    style={{ backgroundColor: "rgba(212, 185, 150, 0.8)" }}
                  ></div>
                  <div
                    className="bubble w-1 h-1 rounded-full ml-2"
                    style={{ backgroundColor: "rgba(212, 185, 150, 0.8)" }}
                  ></div>
                  <div
                    className="bubble w-1 h-1 rounded-full ml-1"
                    style={{ backgroundColor: "rgba(212, 185, 150, 0.8)" }}
                  ></div>
                </div>

                <Edit3
                  className="w-6 h-6 relative z-10"
                  style={{ color: "#6b4226" }}
                />
              </div>
            </div>

            <h1
              className="text-2xl font-bold mb-2"
              style={{ color: "#6b4226" }}
            >
              ☕ Update Your Profile
            </h1>
            <p className="text-sm opacity-80" style={{ color: "#6b4226" }}>
              Keep your information fresh like morning chai
            </p>
          </div>

          <div className="p-8 space-y-6">
            <div className="text-center">
              <label
                className="block text-sm font-semibold mb-3"
                style={{ color: "#6b4226" }}
              >
                Profile Picture
              </label>

              <div className="relative inline-block group cursor-pointer">
                <div
                  className="w-24 h-24 rounded-2xl overflow-hidden border-3 shadow-lg mx-auto transition-transform duration-300 group-hover:scale-105"
                  style={{
                    background: `linear-gradient(145deg, rgba(212, 185, 150, 0.3), rgba(212, 185, 150, 0.1))`,
                    borderColor: "rgba(212, 185, 150, 0.5)",
                  }}
                >
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User
                        className="w-10 h-10"
                        style={{ color: "#d4b996" }}
                      />
                    </div>
                  )}
                </div>

                <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Camera className="w-6 h-6 text-white" />
                </div>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>

              <p
                className="text-xs mt-2 opacity-70"
                style={{ color: "#6b4226" }}
              >
                Click to upload new picture
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="w-full px-4 py-4 border rounded-2xl transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:scale-[1.02]"
                  style={{
                    backgroundColor: "rgba(212, 185, 150, 0.1)",
                    borderColor: "rgba(212, 185, 150, 0.5)",
                    color: "#6b4226",
                    focusRingColor: "rgba(212, 185, 150, 0.5)",
                  }}
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.fullname}
                  onChange={(e) =>
                    setFormData({ ...formData, fullname: e.target.value })
                  }
                  className="w-full px-4 py-4 border rounded-2xl transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:scale-[1.02]"
                  style={{
                    backgroundColor: "rgba(212, 185, 150, 0.1)",
                    borderColor: "rgba(212, 185, 150, 0.5)",
                    color: "#6b4226",
                  }}
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
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

            {/* Footer Link */}
            <div className="text-center pt-4">
              <p className="text-sm opacity-70" style={{ color: "#6b4226" }}>
                Enjoying your chai break? ☕
                <span
                  className="hover:opacity-100 cursor-pointer font-medium ml-1 transition-opacity duration-300"
                  style={{ color: "#6b4226" }}
                >
                  Get Support
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
