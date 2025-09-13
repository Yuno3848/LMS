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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 p-4">
      <div className="w-full max-w-lg p-8 rounded-3xl shadow-2xl bg-white/90 backdrop-blur-sm border border-amber-200">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-4 shadow-lg">
            <Edit3 className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Edit Profile
          </h2>
          <p className="text-gray-600">Update your personal information</p>
        </div>

        <div className="space-y-6">
          {/* Avatar Upload Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-amber-200 shadow-lg bg-gradient-to-br from-amber-100 to-orange-100">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-16 h-16 text-amber-400" />
                  </div>
                )}
              </div>

              {/* Camera overlay */}
              <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                <Camera className="w-8 h-8 text-white" />
              </div>

              {/* Hidden file input */}
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer rounded-full"
              />
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">
                Click to change avatar
              </p>
              <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-5">
            {/* Full Name */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={formData.fullname}
                onChange={(e) => {
                  setFormData({ ...formData, fullname: e.target.value });
                }}
                className="w-full px-4 py-3 border-2 rounded-xl border-amber-200 bg-white/70 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus:outline-none transition-all duration-300 placeholder-gray-400"
              />
            </div>

            {/* Username */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                placeholder="Choose a unique username"
                value={formData.username}
                onChange={(e) => {
                  setFormData({ ...formData, username: e.target.value });
                }}
                className="w-full px-4 py-3 border-2 rounded-xl border-amber-200 bg-white/70 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 focus:outline-none transition-all duration-300 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Updating...</span>
              </div>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Your profile information is secure and private
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
