import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authApi } from "../../../../ApiFetch";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { logout, updateUser } from "../../../../redux/authSlicer";

const EmailVerificationPage = () => {
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await authApi.verifyMail(token);

        if (response.success) {
          toast.success(
            response?.data?.message || "Email verified successfully"
          );
          setStatus("success");
          setMessage(
            response?.data?.message ||
              "Email verification successful! You can now access all features."
          );
          dispatch(updateUser(response.data));
        } else {
          toast.error("Email verification failed" || response.error);
          setStatus("error");
          setMessage(response.error);
        }
      } catch (error) {
        setStatus("error");
        setMessage(error.message || "Something went wrong");
      }
    };

    verifyEmail();
  }, [token]);

  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(() => {
        navigate("/profile");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5e6ca] via-[#fefaf5] to-[#e7d3b5]">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-[#fffaf2] border border-[#e0c9a6]">
        <div className="text-center">
          {status === "verifying" && (
            <div>
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6b4226] mx-auto mb-4"></div>
              <h2 className="text-2xl font-bold text-[#6b4226] mb-2">
                Verifying Email...
              </h2>
              <p className="text-[#8c5e3c]">
                Please wait while we verify your email address.
              </p>
            </div>
          )}

          {status === "success" && (
            <div>
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold text-[#2d5a2d] mb-2">
                Email Verified!
              </h2>
              <p className="text-[#2d5a2d] mb-4">{message}</p>
              <p className="text-sm text-[#8c5e3c]">
                Redirecting you to your profile...
              </p>
            </div>
          )}

          {status === "error" && (
            <div>
              <div className="text-6xl mb-4">❌</div>
              <h2 className="text-2xl font-bold text-[#721c24] mb-2">
                Verification Failed
              </h2>
              <p className="text-[#721c24] mb-6">{message}</p>
              <div className="space-y-3">
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full bg-gradient-to-r from-[#9c6644] to-[#7a4d30] text-white py-2 px-4 rounded-lg font-medium shadow-sm hover:shadow-md hover:from-[#7a4d30] hover:to-[#5d3623] transition transform hover:-translate-y-0.5"
                >
                  Go to Profile
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="w-full bg-gray-200 text-[#6b4226] py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition"
                >
                  Back to Login
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
