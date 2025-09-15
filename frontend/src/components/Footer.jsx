import { Coffee, Facebook, Instagram, Twitter } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="py-8 px-6 text-center bg-[#fffaf2]/90 backdrop-blur-sm border-t border-[#e0c9a6]/40 relative z-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center space-x-2">
          <Coffee className="w-6 h-6 text-[#6b4226]" />
          <span className="text-[#6b4226] font-bold">StudyBrew</span>
        </div>
        <div className="flex gap-6 text-sm text-[#6b4226]/70">
          <a href="/privacy" className="hover:text-[#8c5e3c] transition">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-[#8c5e3c] transition">
            Terms of Service
          </a>
          <a href="/contact" className="hover:text-[#8c5e3c] transition">
            Contact
          </a>
        </div>
        <div className="flex gap-4 text-[#6b4226]/70">
          <Facebook className="w-5 h-5 hover:text-[#8c5e3c] cursor-pointer transition" />
          <Twitter className="w-5 h-5 hover:text-[#8c5e3c] cursor-pointer transition" />
          <Instagram className="w-5 h-5 hover:text-[#8c5e3c] cursor-pointer transition" />
        </div>
      </div>
      <p className="mt-4 text-xs text-[#6b4226]/60">
        © {new Date().getFullYear()} StudyBrew. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
