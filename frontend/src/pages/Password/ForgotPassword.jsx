import React, { useState } from "react";
import { Mail, ArrowLeft, Send, CheckCircle, AlertCircle } from "lucide-react";
import { authApi } from "../../ApiFetch/authApiFetch";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slicers/authSlicer";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);

    try {
      const result = await authApi.forgotPassword(email);
      if (result.success) {
        setIsSubmitted(true);
        toast.success(result?.data?.message || "Forgot password successfully");
      } else {
        toast.error(result?.error || "Invalid credential");
      }
    } catch (error) {
      toast.error(error.message || "something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = async () => {
    setEmail("");
    setIsSubmitted(false);
    setIsLoading(false);

    try {
      await authApi.logout();
    } catch (error) {
      toast.error(error.message);
    }
    dispatch(logout());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5e6ca] via-[#fefaf5] to-[#e7d3b5] flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-[#fffaf2] rounded-2xl shadow-xl border border-[#e0c9a6] p-8">
        {!isSubmitted ? (
          <>
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-[#b08968] to-[#8c5e3c] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Mail className="w-8 h-8 text-[#fffaf2]" />
              </div>
              <h2 className="text-2xl font-extrabold text-[#6b4226] mb-2">
                🔑 Forgot Password?
              </h2>
              <p className="text-[#8c5e3c] text-sm leading-relaxed">
                No worries! Enter your email address and we'll send you a link
                to reset your password.
              </p>
            </div>

            {/* ✅ Wrapped inside form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-[#6b4226] font-bold mb-2 text-sm">
                  <Mail className="w-4 h-4" />
                  📧 Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border rounded-lg border-[#d4b996] bg-[#fdfaf7] focus:ring-2 focus:ring-[#c19a6b] focus:outline-none transition"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !email}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#b08968] to-[#8c5e3c] text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:from-[#8c5e3c] hover:to-[#6b4226] transition transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Reset Link
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <button
                onClick={handleBackToLogin}
                type="button"
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
              ✅ Email Sent!
            </h2>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-green-800">
                  <p className="font-medium mb-1">Check your email!</p>
                  <p className="text-green-700">
                    We've sent a password reset link to{" "}
                    <span className="font-medium">{email}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#fdfaf7] border border-[#d4b996] rounded-lg p-4 mb-6">
              <h3 className="font-bold text-[#6b4226] text-sm mb-2">
                📝 Next Steps:
              </h3>
              <ul className="text-xs text-[#8c5e3c] space-y-1 text-left">
                <li>• Check your email inbox and spam folder</li>
                <li>• Click the reset link in the email</li>
                <li>• Create your new password</li>
                <li>• Sign in with your new password</li>
              </ul>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleBackToLogin}
                type="button"
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#b08968] to-[#8c5e3c] text-white font-bold rounded-lg shadow-md hover:shadow-lg hover:from-[#8c5e3c] hover:to-[#6b4226] transition transform hover:-translate-y-0.5"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Login
              </button>

              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail("");
                }}
                type="button"
                className="w-full px-6 py-2 text-[#8c5e3c] hover:text-[#6b4226] font-medium transition border border-[#d4b996] rounded-lg hover:bg-[#fdfaf7]"
              >
                Send Another Email
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
