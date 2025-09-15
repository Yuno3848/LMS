import React from "react";

const floatAnimation = {
  animation: "float 6s ease-in-out infinite",
};

const floatKeyframes = `
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}
`;

const HelpAndSupport = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-orange-100 via-amber-50 to-orange-200 flex flex-col items-center p-6 overflow-hidden">
      <style>{floatKeyframes}</style>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="absolute text-4xl opacity-20 hover:opacity-50 transform hover:-translate-y-2 transition-all duration-700"
            style={{
              ...floatAnimation,
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
            }}
          >
            ☕
          </div>
        ))}
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold text-amber-900 mb-10 relative z-10 text-center">
        Help & Support
      </h1>

      <div className="max-w-2xl w-full mb-12 relative z-10 space-y-6">
        {[
          {
            question: "How can I reset my password?",
            answer:
              "Go to your account settings and click on 'Reset Password'. You’ll receive an email with further instructions.",
          },
          {
            question: "How do I contact support?",
            answer:
              "You can reach us via email at support@chaiapp.com or call us at +91 98765 43210.",
          },
        ].map((faq, idx) => (
          <div
            key={idx}
            className="shadow-lg rounded-3xl bg-white/70 backdrop-blur-md p-6 hover:scale-105 transition-transform duration-300"
          >
            <h2 className="font-semibold text-xl text-amber-900 mb-2">
              {faq.question}
            </h2>
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full relative z-10">
        {[
          { title: "Email Us", content: "support@chaiapp.com" },
          { title: "Call Us", content: "+91 98765 43210" },
        ].map((card, idx) => (
          <div
            key={idx}
            className="shadow-xl rounded-3xl bg-white/70 backdrop-blur-md p-8 text-center hover:scale-105 transition-transform duration-300"
          >
            <h2 className="text-2xl font-bold text-amber-900 mb-3">
              {card.title}
            </h2>
            <p className="text-gray-700">{card.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpAndSupport;
