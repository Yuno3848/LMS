import React, { useEffect, useState } from "react";
import { authApi } from "../../../ApiFetch/authApiFetch";

import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import StudentVerification from "./ProfileComponents/StudentVerification";
import EmailVerification from "./ProfileComponents/EmailVerification";
import VerifyStudentProfile from "./ProfileComponents/VerifyStudentProfile";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const avatar = useSelector((state) => state.auth.avatar);
  
  


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5e6ca] via-[#fefaf5] to-[#e7d3b5]">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-[#fffaf2] border border-[#e0c9a6]  ">
        <h2 className="text-3xl font-extrabold text-center text-[#6b4226] mb-2">
          👤 Your Profile
        </h2>

        <form className="space-y-5 relative ">
          <div className="flex justify-center mt-5">
            {(avatar?.url || user?.data?.avatar?.url) && (
              <img
                src={avatar?.url || user?.data?.avatar?.url}
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
            value={user?.data?.username ?? ""}
          />
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 border rounded-lg border-[#d4b996] bg-[#fdfaf7] focus:ring-2 focus:ring-[#c19a6b] focus:outline-none transition"
            readOnly
            value={user?.data?.fullname ?? ""}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-lg border-[#d4b996] bg-[#fdfaf7] focus:ring-2 focus:ring-[#c19a6b] focus:outline-none transition"
            readOnly
            value={user?.data?.email ?? ""}
          />
          <input
            type="text"
            placeholder="Role"
            className="w-full px-4 py-3 border rounded-lg border-[#d4b996] bg-[#fdfaf7] focus:ring-2 focus:ring-[#c19a6b] focus:outline-none transition"
            readOnly
            value={user?.data?.role ?? ""}
          />
          <EmailVerification />
          <StudentVerification />
          <Link
            to="/update-profile"
            className="block w-full text-center bg-gradient-to-r from-[#b08968] to-[#8c5e3c] text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:from-[#8c5e3c] hover:to-[#6b4226] transition transform hover:-translate-y-0.5"
          >
            Update Profile
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Profile;
