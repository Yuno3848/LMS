import React from "react";
import { useSelector } from "react-redux";

const VerifyStudentProfile = () => {
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
      label: "Pending Verification",
    },
    "not verified": {
      bg: "bg-[#fdecea] border-[#f5c6cb] text-[#a94442]",
      icon: "❌",
      label: "Not Verified",
    },
    rejected: {
      bg: "bg-[#fff1f0] border-[#ffa39e] text-[#cf1322]",
      icon: "🚫",
      label: "Rejected",
    },
    unknown: {
      bg: "bg-gray-100 border-gray-300 text-gray-600",
      icon: "❓",
      label: "Unknown",
    },
  };

  const { bg, icon, label } =
    statusConfig[verificationStatus] || statusConfig.unknown;

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
    </div>
  );
};

export default VerifyStudentProfile;
