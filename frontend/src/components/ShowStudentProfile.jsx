import React from "react";
//show header and footer

const ShowStudentProfile = ({ type = "student" }) => {
  const message =
    type === "student"
      ? "You haven't created your student profile yet. Go to your profile and start student verification."
      : "You already have an instructor profile and cannot create a student profile.";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50 z-50">
      <div className="relative flex flex-col items-center space-y-6 p-10 bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-amber-200/50 max-w-lg text-center">
        <h2
          className="text-xl font-bold text-amber-800"
          style={{ animation: "textGlow 2s ease-in-out infinite alternate" }}
        >
          {message}
        </h2>

        <style>{`
          @keyframes textGlow {
            0% {
              text-shadow: 0 0 5px rgba(245, 158, 11, 0.5);
            }
            100% {
              text-shadow: 0 0 20px rgba(245, 158, 11, 0.8),
                           0 0 30px rgba(251, 191, 36, 0.6);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default ShowStudentProfile;
