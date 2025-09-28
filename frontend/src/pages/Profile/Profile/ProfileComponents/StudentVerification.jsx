import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import Loading from "../../../../components/Loading";

const StudentVerification = () => {
  const user = useSelector((state) => state.auth.user);
  const studentProfile = useSelector((state) => state.studentProfile.profile);

  const verificationStatus =
    studentProfile?.data[0]?.studentProfile?.verificationStatus
      ?.trim()
      .toLowerCase();

  const statusConfig = {
    verified: {
      bg: "bg-[#e8f5e8] border-[#c3e6c3] text-[#2d5a2d]",
      icon: "✅",
      label: "Verified",
    },
    pending: {
      bg: "bg-[#fff8e6] border-[#ffe58f] text-[#ad6800]",
      icon: "⏳",
      label: "Pending",
    },
    "not requested": {
      bg: "bg-[#fdecea] border-[#f5c6cb] text-[#a94442]",
      icon: "❌",
      label: "Not Requested",
    },
    rejected: {
      bg: "bg-[#fff1f0] border-[#ffa39e] text-[#cf1322]",
      icon: "🚫",
      label: "Rejected",
    },
    profileNotCreated: {
      bg: "bg-[#fdecea] border-[#f5c6cb] text-[#a94442]",
      icon: "❌",
      label: "Profile not created",
    },
  };

  const { bg, icon, label } =
    statusConfig[verificationStatus] || statusConfig.profileNotCreated;

  return (
    <div className="border-t border-[#e0c9a6] pt-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[#6b4226] font-semibold">🎓 Student Status</span>
      </div>
      <div className={`${bg} border rounded-lg p-4 mb-3`}>
        <div className="flex items-center text-sm font-medium">
          <span className="mr-2">{icon}</span>
          {label}
        </div>
      </div>

      {!user?.data?.studentVerified && (
        <div className="bg-[#fdf8f0] border border-[#e8d4b8] rounded-lg p-4 mb-3">
          <p className="text-sm text-[#6b4226] mb-2">
            📚 Verify your student status to access exclusive benefits and
            discounts! First update your student profile
          </p>
          <Link
            to="/create-student-profile"
            className="block text-center w-full bg-gradient-to-r from-[#9c6644] to-[#7a4d30] text-white py-2 px-4 rounded-lg font-medium text-sm shadow-sm hover:shadow-md hover:from-[#7a4d30] hover:to-[#5d3623] transition transform hover:-translate-y-0.5"
          >
            🎯 Start Verification
          </Link>
        </div>
      )}

      {user?.data?.studentVerified && (
        <div className="bg-[#e8f5e8] border border-[#c3e6c3] rounded-lg p-4 mb-3">
          <div className="flex items-center text-sm text-[#2d5a2d]">
            <span className="text-green-500 mr-2">✅</span>
            Student status verified! You have access to all student benefits.
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentVerification;
