import React from "react";

const Loading = ({ text = "Brewing your account..." }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50 z-50">
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-amber-200 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 2}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col items-center space-y-8 p-12 bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-amber-200/50">
        <div className="relative">
          <div className="w-24 h-32 bg-gradient-to-b from-amber-100 to-amber-200 rounded-b-3xl rounded-t-lg border-4 border-amber-800 relative overflow-hidden shadow-lg">
            <div
              className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-amber-700 via-amber-600 to-amber-500 rounded-b-3xl"
              style={{
                animation: "liquidFill 3s ease-in-out infinite",
              }}
            />

            <div
              className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-60"
              style={{
                animation: "ripple 2s linear infinite",
              }}
            />

            <div
              className="absolute top-4 left-2 right-2 h-3 bg-gradient-to-b from-orange-100 to-transparent rounded-full opacity-80"
              style={{ animation: "foam 2s ease-in-out infinite" }}
            />
          </div>

          <div
            className="absolute right-[-16px] top-8 w-8 h-12 border-4 border-amber-800 rounded-full bg-transparent"
            style={{
              animation: "handleGlow 2s ease-in-out infinite alternate",
            }}
          />

          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-12 bg-gradient-to-t from-gray-400 to-transparent rounded-full opacity-70"
                style={{
                  animation: `steam ${2 + i * 0.3}s ease-in-out infinite`,
                  animationDelay: `${i * 0.4}s`,
                }}
              />
            ))}
          </div>

          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
                animation: `sparkle ${1.5 + i * 0.2}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>

        <div className="text-center">
          <h2
            className="text-2xl font-bold text-amber-800 mb-4"
            style={{ animation: "textGlow 2s ease-in-out infinite alternate" }}
          >
            {text}
          </h2>

          <div className="flex justify-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-amber-600 rounded-full"
                style={{
                  animation: `bounce 1.4s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="w-64 h-2 bg-amber-200 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-sm"
            style={{ animation: "progress 3s ease-in-out infinite" }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes liquidFill {
          0%,
          10% {
            height: 0%;
          }
          50% {
            height: 80%;
          }
          90%,
          100% {
            height: 75%;
          }
        }

        @keyframes ripple {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes steam {
          0% {
            transform: translateY(0) scaleX(1) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-20px) scaleX(0.8) rotate(10deg);
            opacity: 0.5;
          }
          100% {
            transform: translateY(-40px) scaleX(0.4) rotate(-10deg);
            opacity: 0;
          }
        }

        @keyframes sparkle {
          0%,
          100% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.2) rotate(180deg);
          }
        }

        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-8px);
          }
          60% {
            transform: translateY(-4px);
          }
        }

        @keyframes textGlow {
          0% {
            text-shadow: 0 0 5px rgba(245, 158, 11, 0.5);
          }
          100% {
            text-shadow: 0 0 20px rgba(245, 158, 11, 0.8),
              0 0 30px rgba(251, 191, 36, 0.6);
          }
        }

        @keyframes progress {
          0% {
            width: 0%;
          }
          50% {
            width: 70%;
          }
          100% {
            width: 100%;
          }
        }

        @keyframes handleGlow {
          0% {
            box-shadow: 0 0 0 rgba(245, 158, 11, 0);
          }
          100% {
            box-shadow: 0 0 15px rgba(245, 158, 11, 0.6);
          }
        }

        @keyframes foam {
          0%,
          100% {
            transform: scaleX(1);
            opacity: 0.8;
          }
          50% {
            transform: scaleX(1.1);
            opacity: 0.6;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(120deg);
          }
          66% {
            transform: translateY(10px) rotate(240deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
