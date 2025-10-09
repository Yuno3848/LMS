import React from "react";
import { useDispatch, useSelector } from "react-redux";

const EmailVerification = () => {
  const user = useSelector((state) => state.auth.user);

  user;
  return (
    <div className="border-t border-[#e0c9a6] pt-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[#6b4226] font-semibold">🎓 Email Status</span>
        <span className="text-sm text-[#8c5e3c] bg-[#f5e6ca] px-2 py-1 rounded-full">
          {user?.data?.isEmailVerified ? "Verified" : "Not Verified"}
        </span>
      </div>

      {user?.data?.isEmailVerified && (
        <div className="bg-[#e8f5e8] border border-[#c3e6c3] rounded-lg p-4 mb-3">
          <div className="flex items-center text-sm text-[#2d5a2d]">
            <span className="text-green-500 mr-2">✅</span>
            Email status verified!
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailVerification;
