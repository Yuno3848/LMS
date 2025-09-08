import { Coffee, Banana } from "lucide-react";
import { Link } from "react-router";
import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const Header = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <header className="sticky top-0 z-20 w-full py-5 px-8 flex justify-between items-center bg-[#fffaf2]/80 backdrop-blur-md border-b border-[#e0c9a6]/50 shadow-sm">
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 bg-gradient-to-br from-[#b08968] to-[#8c5e3c] rounded-lg flex items-center justify-center shadow-md">
          <Coffee className="text-white w-6 h-6" />
        </div>
        <h1 className="text-2xl font-extrabold text-[#6b4226] tracking-tight">
          StudyBrew
        </h1>
      </div>
      <nav className="hidden md:flex space-x-8 font-semibold text-[#6b4226]">
        {["Home", "Features", "About"].map((link) => (
          <a
            key={link}
            href={`/${link.toLowerCase()}`}
            className="relative hover:text-[#8c5e3c] after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#8c5e3c] after:transition-all after:duration-300"
          >
            {link}
          </a>
        ))}
      </nav>
      <div className="flex space-x-3">
        {user ? (
          user.data.fullname
        ) : (
          <div>
            {" "}
            <Link
              to="/login"
              className="px-4 py-2 text-[#6b4226] font-semibold hover:text-[#8c5e3c] transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-6 py-2 rounded-full bg-gradient-to-r from-[#b08968] to-[#8c5e3c] text-white font-semibold shadow-md hover:shadow-xl hover:from-[#8c5e3c] hover:to-[#6b4226] transform hover:scale-105 transition-all"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
