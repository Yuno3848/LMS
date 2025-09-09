import React from "react";
import { motion } from "framer-motion";

const BackgroundEffects = () => {
  return (
    <>
      {/* Gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#d4b996]/30 to-[#b08968]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-[#8c5e3c]/20 to-[#6b4226]/10 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute bottom-28 left-1/3 w-28 h-28 bg-gradient-to-br from-[#b08968]/20 to-[#d4b996]/10 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Floating coffee cups */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 text-2xl opacity-30"
        >
          ☕
        </motion.div>
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          className="absolute top-1/3 right-1/4 text-xl opacity-20"
        >
          ☕
        </motion.div>
      </div>
    </>
  );
};

export default BackgroundEffects;
