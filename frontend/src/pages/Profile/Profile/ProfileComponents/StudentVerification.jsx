import React from "react";
import { useSelector } from "react-redux";

const StudentVerification = () => {
    const user = useSelector((state)=>state.auth.user)
  return (
    <div className="border-t border-[#e0c9a6] pt-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[#6b4226] font-semibold">🎓 Student Status</span>
        <span className="text-sm text-[#8c5e3c] bg-[#f5e6ca] px-2 py-1 rounded-full">
          {user?.data?.studentVerified ? "Verified" : "Not Verified"}
        </span>
      </div>

      {!user?.data?.studentVerified && (
        <div className="bg-[#fdf8f0] border border-[#e8d4b8] rounded-lg p-4 mb-3">
          <p className="text-sm text-[#6b4226] mb-2">
            📚 Verify your student status to access exclusive benefits and
            discounts!
          </p>
          <button
            type="button"
            className="w-full bg-gradient-to-r from-[#9c6644] to-[#7a4d30] text-white py-2 px-4 rounded-lg font-medium text-sm shadow-sm hover:shadow-md hover:from-[#7a4d30] hover:to-[#5d3623] transition transform hover:-translate-y-0.5"
          >
            🎯 Start Verification
          </button>
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
