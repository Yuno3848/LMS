import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { instructorProfileAPIFetch } from "../../../../../ApiFetch/instructorProfileApiFetch";
import Loading from "../../../../../components/Loading";
import { setInstructorProfile } from "../../../../../redux/slicers/instructorProfileSlicer";

const InstructorVerificationRequest = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const instructorProfile = useSelector(
    (state) => state.instructorProfile.profile
  );
  const loading = useSelector((state) => state.instructorProfile.loading);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [error, setError] = useState(null);

  // Fetch instructor profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await instructorProfileAPIFetch.getInstructorProfile();
        if (response.success) {
          dispatch(setInstructorProfile(response.data));
        }
      } catch (error) {
        console.error("Failed to fetch instructor profile:", error);
      }
    };

    fetchProfile();
  }, [dispatch]);

  const instructorData =
    (Array.isArray(instructorProfile) &&
      instructorProfile[0]?.instructorProfile) ||
    (instructorProfile?.data &&
      Array.isArray(instructorProfile.data) &&
      instructorProfile.data[0]?.instructorProfile) ||
    instructorProfile ||
    {};

  const verificationStatus = instructorData.isVerifiedInstructor
    ?.trim()
    .toLowerCase();

  const handleRequestVerification = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await instructorProfileAPIFetch.reqInstructorRole();

      if (response.success) {
        setRequestSent(true);

        const profileResponse =
          await instructorProfileAPIFetch.getInstructorProfile();
        if (profileResponse.success) {
          dispatch(setInstructorProfile(profileResponse.data));
        }
      } else {
        setError(response.message || "Failed to send verification request");
      }
    } catch (error) {
      console.error("Failed to send verification request:", error.message);
      setError(
        error.message || "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const userPhoto = user?.data?.avatar.url || "https://via.placeholder.com/120";
  const userName = user?.data?.username || "Instructor Name";
  const userEmail = user?.data?.email || "instructor@example.com";

  const isAlreadyRequested =
    verificationStatus === "pending" || verificationStatus === "verified";

  if (loading && !instructorProfile) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#faf8f5] to-[#f5f0e8] py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#6b4226] mb-2">
            Become a Verified Instructor
          </h1>
          <p className="text-[#8b6f47]">
            Request verification to unlock instructor privileges
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-[#e0c9a6] overflow-hidden">
          <div className="bg-gradient-to-r from-[#f5e6d3] to-[#f0dcc8] p-8 text-center">
            <div className="mb-4">
              <img
                src={userPhoto}
                alt={userName}
                className="w-32 h-32 rounded-full mx-auto border-4 border-white shadow-lg object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold text-[#6b4226] mb-1">
              {userName}
            </h2>
            <p className="text-[#8b6f47] flex items-center justify-center">
              <span className="mr-2">📧</span>
              {userEmail}
            </p>
          </div>

          <div className="p-8">
            {verificationStatus === "verified" && (
              <div className="bg-[#e8f5e8] border border-[#c3e6c3] rounded-lg p-4 mb-6">
                <div className="flex items-center text-[#2d5a2d]">
                  <span className="text-2xl mr-3">✅</span>
                  <div>
                    <p className="font-semibold">Already Verified!</p>
                    <p className="text-sm">You are a verified instructor</p>
                  </div>
                </div>
              </div>
            )}

            {verificationStatus === "pending" && (
              <div className="bg-[#fff8e6] border border-[#ffe58f] rounded-lg p-4 mb-6">
                <div className="flex items-center text-[#ad6800]">
                  <span className="text-2xl mr-3">⏳</span>
                  <div>
                    <p className="font-semibold">Request Pending</p>
                    <p className="text-sm">
                      Your verification request is under review
                    </p>
                  </div>
                </div>
              </div>
            )}

            {verificationStatus === "rejected" && (
              <div className="bg-[#fff1f0] border border-[#ffa39e] rounded-lg p-4 mb-6">
                <div className="flex items-center text-[#cf1322]">
                  <span className="text-2xl mr-3">🚫</span>
                  <div>
                    <p className="font-semibold">Request Rejected</p>
                    <p className="text-sm">You can submit a new request</p>
                  </div>
                </div>
              </div>
            )}

            {requestSent && !isAlreadyRequested && (
              <div className="bg-[#e8f5e8] border border-[#c3e6c3] rounded-lg p-4 mb-6">
                <div className="flex items-center text-[#2d5a2d]">
                  <span className="text-2xl mr-3">✅</span>
                  <div>
                    <p className="font-semibold">Request Submitted!</p>
                    <p className="text-sm">We'll review your request soon</p>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-[#fff1f0] border border-[#ffa39e] rounded-lg p-4 mb-6">
                <div className="flex items-center text-[#cf1322]">
                  <span className="text-2xl mr-3">⚠️</span>
                  <div>
                    <p className="font-semibold">Error</p>
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#6b4226] mb-4 flex items-center">
                <span className="mr-2">🎯</span>
                Instructor Benefits
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="text-green-600 mr-3 mt-1">✓</span>
                  <p className="text-[#6b4226]">
                    Create and publish unlimited courses
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-3 mt-1">✓</span>
                  <p className="text-[#6b4226]">
                    Access to instructor dashboard and analytics
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-3 mt-1">✓</span>
                  <p className="text-[#6b4226]">
                    Earn from your courses and reach global students
                  </p>
                </div>
                <div className="flex items-start">
                  <span className="text-green-600 mr-3 mt-1">✓</span>
                  <p className="text-[#6b4226]">
                    Verified instructor badge on your profile
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleRequestVerification}
              disabled={isSubmitting || isAlreadyRequested || requestSent}
              className={`w-full py-4 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center ${
                isSubmitting || isAlreadyRequested || requestSent
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#8b6f47] to-[#6b4226] hover:from-[#6b4226] hover:to-[#5a3820] shadow-lg hover:shadow-xl"
              }`}
            >
              {isSubmitting ? (
                <>
                  <span className="mr-2">⏳</span>
                  Submitting Request...
                </>
              ) : isAlreadyRequested ? (
                <>
                  <span className="mr-2">✓</span>
                  Request Already Submitted
                </>
              ) : requestSent ? (
                <>
                  <span className="mr-2">✓</span>
                  Request Sent Successfully
                </>
              ) : (
                <>
                  <span className="mr-2">🎓</span>
                  Request Instructor Verification
                </>
              )}
            </button>

            <p className="text-sm text-[#8b6f47] text-center mt-4">
              Our team will review your request within 2-3 business days
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-[#8b6f47]">
            Need help? Contact us at
            <a
              href="mailto:support@example.com"
              className="text-[#6b4226] font-semibold hover:underline"
            >
              support@example.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default InstructorVerificationRequest;
