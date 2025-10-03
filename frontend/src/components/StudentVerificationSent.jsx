import React from "react";
import { CheckCircle } from "lucide-react"; // ✅ only icon import
import { Link } from "react-router-dom"; // ✅ correct Link import
import { useSelector } from "react-redux";

export default function StudentVerificationSent() {
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  const accent = "#A27857";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-100 via-amber-50 to-yellow-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-stone-200 p-6 text-center">
        <CheckCircle
          className="w-16 h-16 mx-auto mb-4"
          style={{ color: accent }}
        />
        <h1 className="text-2xl font-semibold text-stone-800 mb-2">
          Verification Sent
        </h1>
        <p className="text-stone-600 mb-6">
          Student verification has been sent successfully.
        </p>

        <div className="mb-6">
          <div className="text-lg font-medium text-stone-800">
            {user?.data?.username || "Student"}
          </div>
          <div className="text-sm text-stone-500">
            {user?.data?.email || "No email provided"}
          </div>
        </div>

        <Link
          to="/student-profile"
          className="block w-full py-3 rounded-xl font-semibold"
          style={{ background: accent, color: "white" }}
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
