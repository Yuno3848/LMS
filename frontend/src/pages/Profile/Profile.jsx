import React, { useState } from "react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#f5e6ca] via-[#fefaf5] to-[#e7d3b5] p-4">
      {/* Sidebar */}
      <div className="w-64 bg-[#fffaf2] border border-[#e0c9a6] rounded-2xl p-6 shadow-lg flex flex-col space-y-4">
        <h2 className="text-2xl font-bold text-[#6b4226] mb-4">Settings</h2>
        <button
          className={`text-left px-4 py-2 rounded-lg transition ${
            activeTab === "profile"
              ? "bg-[#b08968] text-white"
              : "text-[#6b4226] hover:bg-[#e0c9a6]"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
        <button
          className={`text-left px-4 py-2 rounded-lg transition ${
            activeTab === "account"
              ? "bg-[#b08968] text-white"
              : "text-[#6b4226] hover:bg-[#e0c9a6]"
          }`}
          onClick={() => setActiveTab("account")}
        >
          Account & Security
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 ml-6 bg-[#fffaf2] border border-[#e0c9a6] rounded-2xl p-8 shadow-lg">
        {activeTab === "profile" && (
          <div className="space-y-5">
            <h2 className="text-3xl font-extrabold text-[#6b4226] mb-4">
              👤 Your Profile
            </h2>
            <div>
              <label className="block text-sm font-medium text-[#5c4636] mb-1">
                Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-gray-700
                 border border-[#d4b996] rounded-lg bg-[#fdf8f3] cursor-pointer
                 focus:outline-none focus:ring-2 focus:ring-[#b08968] focus:border-[#b08968]
                 file:mr-4 file:py-2.5 file:px-4
                 file:rounded-lg file:border-0
                 file:text-sm file:font-semibold
                 file:bg-[#b08968] file:text-white
                 hover:file:bg-[#8c5e3c]"
              />
            </div>
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-3 border rounded-lg border-[#d4b996] bg-[#fdfaf7] focus:ring-2 focus:ring-[#c19a6b] focus:outline-none transition"
              readOnly
              value="JohnDoe"
            />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 border rounded-lg border-[#d4b996] bg-[#fdfaf7] focus:ring-2 focus:ring-[#c19a6b] focus:outline-none transition"
              readOnly
              value="John Doe"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border rounded-lg border-[#d4b996] bg-[#fdfaf7] focus:ring-2 focus:ring-[#c19a6b] focus:outline-none transition"
              readOnly
              value="johndoe@example.com"
            />
            <button className="w-full bg-gradient-to-r from-[#b08968] to-[#8c5e3c] text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:from-[#8c5e3c] hover:to-[#6b4226] transition transform hover:-translate-y-0.5">
              Update Profile
            </button>
          </div>
        )}

        {activeTab === "account" && (
          <div className="space-y-5">
            <h2 className="text-3xl font-extrabold text-[#6b4226] mb-4">
              🔒 Account & Security
            </h2>
            <input
              type="password"
              placeholder="Current Password"
              className="w-full px-4 py-3 border rounded-lg border-[#d4b996] bg-[#fdfaf7] focus:ring-2 focus:ring-[#c19a6b] focus:outline-none transition"
              readOnly
              value="••••••••"
            />
            <input
              type="password"
              placeholder="New Password"
              className="w-full px-4 py-3 border rounded-lg border-[#d4b996] bg-[#fdfaf7] focus:ring-2 focus:ring-[#c19a6b] focus:outline-none transition"
              readOnly
              value="••••••••"
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full px-4 py-3 border rounded-lg border-[#d4b996] bg-[#fdfaf7] focus:ring-2 focus:ring-[#c19a6b] focus:outline-none transition"
              readOnly
              value="••••••••"
            />
            <button className="w-full bg-gradient-to-r from-[#b08968] to-[#8c5e3c] text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:from-[#8c5e3c] hover:to-[#6b4226] transition transform hover:-translate-y-0.5">
              Update Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
