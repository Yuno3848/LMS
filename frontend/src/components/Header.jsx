import { Coffee, LogOut, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router";
import React from "react";
import { authApi } from "../ApiFetch/authApiFetch";
import { HashLink } from "react-router-hash-link";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { logout } from "../redux/slicers/authSlicer";
import { setClearStudentProfile } from "../redux/slicers/studentProfileSlicer";
import { setClearInstructorProfile } from "../redux/slicers/instructorProfileSlicer";
import { setCourses } from "../redux/slicers/courseSlicer";
const Header = () => {
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navLink = [
    { name: "Home", path: "/#hero" },
    { name: "Features", path: "/#features" },
    { name: "About", path: "/#about" },
  ];

  const handleLogOut = async () => {
    try {
      const result = await authApi.logout();
      if (result.success) {
        dispatch(logout());
        dispatch(setClearStudentProfile());
        dispatch(setClearInstructorProfile());
        dispatch(setCourses());

        toast.success(result?.data?.message || "Logout successful");
        navigate("/");
      } else {
        toast.error(result.error || "Logout failed");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <header className="sticky top-0 z-20 w-full py-4 px-6 md:px-8 flex justify-between items-center bg-[#fffaf2]/95 backdrop-blur-xl border-b border-[#e0c9a6]/30 shadow-lg shadow-[#e0c9a6]/20">
      <div className="flex items-center space-x-3 group">
        <div className="relative">
          <div className="w-11 h-11 bg-gradient-to-br from-[#b08968] via-[#8c5e3c] to-[#6b4226] rounded-xl flex items-center justify-center shadow-lg shadow-[#8c5e3c]/30 group-hover:shadow-xl group-hover:shadow-[#8c5e3c]/40 transition-all duration-300">
            <Coffee className="text-white w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
          </div>

          <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-[#d4b996] to-[#b08968] rounded-full opacity-80 group-hover:scale-110 transition-transform duration-300" />
        </div>
        <h1 className="text-2xl font-black text-[#6b4226] tracking-tight group-hover:text-[#8c5e3c] transition-colors duration-300">
          StudyBrew
          <span className="text-[#b08968] opacity-60">.</span>
        </h1>
      </div>

      <nav className="hidden md:flex space-x-8 font-semibold text-[#6b4226] mr-4  ">
        {navLink.map((link, index) => (
          <HashLink
            key={link.name}
            to={link.path}
            smooth
            className="relative group py-2 hover:text-[#8c5e3c] transition-colors duration-300"
          >
            {link.name}

            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#8c5e3c] to-[#b08968] group-hover:w-full transition-all duration-300 ease-out" />

            <span className="absolute inset-0 bg-[#e0c9a6]/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-200 -z-10" />
          </HashLink>
        ))}
      </nav>

      <div className="flex items-center space-x-3">
        {user ? (
          <div className="flex items-center space-x-3.5">
            <div className="relative group ">
              <div className="w-10 h-10 bg-gradient-to-br from-[#b08968] to-[#8c5e3c] rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-semibold text-sm">
                  {user.data.fullname.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="absolute right-0 mt-2 w-48 bg-[#fffaf2] border border-[#e0c9a6] rounded-lg shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-20">
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-[#6b4226] hover:bg-[#e0c9a6] rounded-t-lg"
                >
                  My Profile
                </Link>
                <Link
                  to="/course"
                  className="block px-4 py-2 text-[#6b4226] hover:bg-[#e0c9a6]"
                >
                  My Courses
                </Link>

                <Link
                  to="/help"
                  className="block px-4 py-2 text-[#6b4226] hover:bg-[#e0c9a6] rounded-b-lg"
                >
                  Help And Support
                </Link>
                <Link
                  to="/student-profile"
                  className="block px-4 py-2 text-[#6b4226] hover:bg-[#e0c9a6] rounded-b-lg"
                >
                  Student Profile
                </Link>
                <Link
                  to="/instructor-profile"
                  className="block px-4 py-2 text-[#6b4226] hover:bg-[#e0c9a6] rounded-b-lg"
                >
                  Instructor Profile
                </Link>

                <Link
                  to="/forgot-password"
                  className="block px-4 py-2 text-[#6b4226] hover:bg-[#e0c9a6] rounded-b-lg"
                >
                  Forgot Password?
                </Link>
                <Link
                  to="/instructor-details"
                  className="block px-4 py-2 text-[#6b4226] hover:bg-[#e0c9a6] rounded-b-lg"
                >
                  Apply for Instructor?
                </Link>
              </div>
            </div>

            <div className="relative">
              <ShoppingCart size={20} color="#896439" strokeWidth={3} />
              <span className="absolute rounded-2xl bg-[#EEE0CA] w-6 h-6 inline-block -top-3.5 left-4 text-center text-[#835827] font-extrabold">
                4
              </span>
            </div>

            <button
              onClick={handleLogOut}
              className="flex items-center space-x-2 px-4 py-2 text-[#6b4226] font-semibold hover:text-[#8c5e3c] hover:bg-[#e0c9a6]/20 rounded-lg transition-all duration-300 relative group"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:block">Logout</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#e0c9a6]/0 via-[#e0c9a6]/10 to-[#e0c9a6]/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Link
              to="/login"
              className="px-5 py-2.5 text-[#6b4226] font-semibold hover:text-[#8c5e3c] hover:bg-[#e0c9a6]/20 rounded-lg transition-all duration-300 relative group"
            >
              Login
              <span className="absolute inset-0 bg-gradient-to-r from-[#e0c9a6]/0 via-[#e0c9a6]/10 to-[#e0c9a6]/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
            <Link
              to="/signup"
              className="relative px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#b08968] via-[#8c5e3c] to-[#6b4226] text-white font-bold shadow-lg shadow-[#8c5e3c]/30 hover:shadow-xl hover:shadow-[#8c5e3c]/40 transform hover:scale-105 transition-all duration-300 overflow-hidden group"
            >
              <span className="relative z-10">Sign Up</span>

              <span className="absolute inset-0 bg-gradient-to-r from-[#8c5e3c] via-[#6b4226] to-[#5a3219] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <span className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-full transition-all duration-700" />
            </Link>
          </div>
        )}
      </div>

      <div className="md:hidden flex flex-col space-y-1 cursor-pointer group">
        <div className="w-5 h-0.5 bg-[#6b4226] group-hover:bg-[#8c5e3c] transition-colors duration-300" />
        <div className="w-4 h-0.5 bg-[#6b4226] group-hover:bg-[#8c5e3c] transition-colors duration-300" />
        <div className="w-3 h-0.5 bg-[#6b4226] group-hover:bg-[#8c5e3c] transition-colors duration-300" />
      </div>
    </header>
  );
};

export default Header;
