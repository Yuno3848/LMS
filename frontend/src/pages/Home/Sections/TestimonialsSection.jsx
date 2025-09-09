import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote:
        "StudyBrew transformed my study habits. I've never been more organized and motivated!",
      name: "Sarah Chen",
      role: "Computer Science Student",
      rating: 5,
    },
    {
      quote:
        "The AI recommendations are spot-on. It's like having a personal tutor available 24/7.",
      name: "Marcus Johnson",
      role: "Medical Student",
      rating: 5,
    },
    {
      quote:
        "Study groups feature helped me connect with amazing peers. We support each other daily!",
      name: "Emma Rodriguez",
      role: "Business Student",
      rating: 5,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="w-full max-w-6xl mx-auto mb-20 px-6"
    >
      <div className="text-center mb-12">
        <div className="mb-4 inline-flex items-center px-5 py-2 rounded-full bg-[#fffaf2]/90 backdrop-blur-sm border border-[#e0c9a6]/50 shadow-md">
          <span className="text-xl mr-2">🌟</span>
          <span className="text-[#6b4226] font-medium">Success Stories</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-[#6b4226] mb-4">
          What Our Students Say
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02, y: -3 }}
            className="p-6 bg-[#fffaf2]/80 backdrop-blur-sm rounded-2xl border border-[#e0c9a6]/40 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex mb-4">
              {[...Array(testimonial.rating)].map((_, j) => (
                <Star key={j} className="w-4 h-4 text-[#b08968] fill-current" />
              ))}
            </div>
            <blockquote className="text-[#6b4226]/80 text-sm mb-4 italic">
              "{testimonial.quote}"
            </blockquote>
            <div className="text-left">
              <div className="text-[#6b4226] font-semibold text-sm">
                {testimonial.name}
              </div>
              <div className="text-[#6b4226]/60 text-xs">
                {testimonial.role}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default TestimonialsSection;
