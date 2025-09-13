import React from "react";

const Loading = ({ text = "Brewing your account..." }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#fefaf5]/80 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center space-y-4 p-8 rounded-2xl shadow-xl bg-[#fffaf2] border border-[#e0c9a6]">
        {/* Cup with filling animation */}
        <div className="relative w-16 h-20 flex items-end justify-center">
          {/* Cup outline */}
          <div className="w-14 h-16 rounded-b-2xl rounded-t-md border-4 border-[#6b4226] overflow-hidden relative bg-[#fffaf2]">
            {/* Filling chai */}
            <div className="absolute bottom-0 left-0 w-full bg-[#b08968] animate-fill h-0"></div>
          </div>

          {/* Handle */}
          <div className="absolute right-[-10px] top-6 w-6 h-6 border-4 border-[#6b4226] rounded-full"></div>

          {/* Steam */}
          <div className="absolute -top-6 flex flex-col space-y-2">
            <span className="w-2 h-6 bg-gradient-to-t from-[#b08968] to-transparent rounded-full animate-steam"></span>
            <span className="w-2 h-6 bg-gradient-to-t from-[#b08968] to-transparent rounded-full animate-steam delay-150"></span>
            <span className="w-2 h-6 bg-gradient-to-t from-[#b08968] to-transparent rounded-full animate-steam delay-300"></span>
          </div>
        </div>

        <p className="text-[#6b4226] font-semibold animate-pulse">{text}</p>
      </div>

      {/* Inline CSS for animations */}
      <style>
        {`
          @keyframes steam {
            0% { transform: translateY(0) scaleY(1); opacity: 1; }
            100% { transform: translateY(-20px) scaleY(0.5); opacity: 0; }
          }
          .animate-steam {
            animation: steam 2s infinite ease-in-out;
          }

          @keyframes fill {
            0% { height: 0; }
            50% { height: 80%; }
            100% { height: 0; }
          }
          .animate-fill {
            animation: fill 3s infinite ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default Loading;
