import React, { useState } from "react";
import { Lock, ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../ApiFetch/authApiFetch";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slicers/authSlicer";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    ("submitted the form");
    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields");
      setIsLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      setIsLoading(false);
      return;
    }
    if (!token) {
      toast.error("Invalid or missing token");
      setIsLoading(false);
      return;
    }
    "token", token;
    try {
      const result = await authApi.resetPassword({
        token,
        newPassword: password,
        confirmPassword: confirmPassword,
      });

      if (result?.data?.success) {
        setIsSubmitted(true);
        dispatch(logout());
        authApi.logout();
        toast.success(result?.data?.message || "reset password successfully");
      } else {
        toast.error(result?.error);
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5e6ca] via-[#fefaf5] to-[#e7d3b5] flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-[#fffaf2] rounded-2xl shadow-xl border border-[#e0c9a6] p-8">
        {!isSubmitted ? (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-[#b08968] to-[#8c5e3c] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Lock className="w-8 h-8 text-[#fffaf2]" />
              </div>
              <h2 className="text-2xl font-extrabold text-[#6b4226] mb-2">
                🔒 Reset Password
              </h2>
              <p className="text-[#8c5e3c] text-sm leading-relaxed">
                Please enter your new password below and confirm it.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[#6b4226] font-bold mb-2 text-sm">
                  New Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full px-4 py-3 border rounded-lg border-[#d4b996] bg-[#fdfaf7] focus:ring-2 focus:ring-[#c19a6b] focus:outline-none transition"
                  required
                />
              </div>

              <div>
                <label className="block text-[#6b4226] font-bold mb-2 text-sm">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full px-4 py-3 border rounded-lg border-[#d4b996] bg-[#fdfaf7] focus:ring-2 focus:ring-[#c19a6b] focus:outline-none transition"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#b08968] to-[#8c5e3c] text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:from-[#8c5e3c] hover:to-[#6b4226] transition transform hover:-translate-y-0.5 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Updating...
                  </>
                ) : (
                  <>Update Password</>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 text-[#8c5e3c] hover:text-[#6b4226] font-medium transition mx-auto"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </button>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>

            <h2 className="text-2xl font-extrabold text-[#6b4226] mb-3">
              ✅ Password Updated!
            </h2>

            <p className="text-[#8c5e3c] mb-6 text-sm">
              Your password has been successfully changed. You can now log in
              with your new credentials.
            </p>

            <button
              onClick={() => navigate("/login")}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#b08968] to-[#8c5e3c] text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:from-[#8c5e3c] hover:to-[#6b4226] transition transform hover:-translate-y-0.5"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
