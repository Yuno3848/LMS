import React from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import StudentVerification from "./ProfileComponents/StudentVerification";
import EmailVerification from "./ProfileComponents/EmailVerification";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const avatar = useSelector((state) => state.auth.avatar);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5e6ca] via-[#fefaf5] to-[#e7d3b5] p-4">
      <div className="w-full max-w-5xl">
        {/* Main Card with Glass Effect */}
        <div className="relative rounded-3xl shadow-2xl bg-white/80 backdrop-blur-sm border border-[#e0c9a6] overflow-hidden">
          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #b08968 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            ></div>
          </div>

          {/* Hero Section with Avatar */}
          <div className="relative bg-gradient-to-r from-[#b08968] via-[#9c7556] to-[#8c5e3c] p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative group">
                {(avatar?.url || user?.data?.avatar?.url) && (
                  <div className="relative">
                    <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-50 group-hover:opacity-70 transition"></div>
                    <img
                      src={avatar?.url || user?.data?.avatar?.url}
                      alt="Profile Avatar"
                      className="relative w-32 h-32 object-cover rounded-full border-4 border-white shadow-2xl ring-4 ring-white/30"
                    />
                    <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-400 rounded-full border-4 border-white"></div>
                  </div>
                )}
              </div>
              <div className="text-center md:text-left flex-1">
                <h1 className="text-4xl font-bold text-white mb-2">
                  {user?.data?.fullname ?? "User"}
                </h1>
                <p className="text-white/90 text-lg">
                  @{user?.data?.username ?? "username"}
                </p>
                <div className="mt-3 inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full">
                  <span className="text-white text-sm font-medium">
                    {user?.data?.role ?? "Role"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="relative p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Left Column - Contact Info */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-gradient-to-br from-[#fdfaf7] to-[#f9f3ec] p-5 rounded-2xl border border-[#e0c9a6] shadow-sm hover:shadow-md transition">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#b08968] to-[#8c5e3c] flex items-center justify-center">
                      <span className="text-white text-lg">📧</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-[#6b4226]/60 uppercase tracking-wide">
                        Email Address
                      </p>
                      <p className="text-[#6b4226] font-medium">
                        {user?.data?.email ?? ""}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#fdfaf7] to-[#f9f3ec] p-5 rounded-2xl border border-[#e0c9a6] shadow-sm hover:shadow-md transition">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#b08968] to-[#8c5e3c] flex items-center justify-center">
                      <span className="text-white text-lg">👤</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-[#6b4226]/60 uppercase tracking-wide">
                        Username
                      </p>
                      <p className="text-[#6b4226] font-medium">
                        {user?.data?.username ?? ""}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Verification Status */}
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-[#fdfaf7] to-[#f9f3ec] p-5 rounded-2xl border border-[#e0c9a6] shadow-sm">
                  <h3 className="text-sm font-bold text-[#6b4226] mb-3 flex items-center gap-2">
                    <span>🛡️</span> Verification Status
                  </h3>
                  <div className="space-y-3">
                    <EmailVerification />
                    <StudentVerification />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-center">
              <Link
                to="/update-profile"
                className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-[#b08968] to-[#8c5e3c] text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#8c5e3c] to-[#6b4226] opacity-0 group-hover:opacity-100 transition"></span>
                <span className="relative">✏️ Update Profile</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
