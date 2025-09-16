import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import { authApi } from "../../ApiFetch";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, setLoading } from "../../redux/authSlicer";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(setLoading(true));

    try {
      const result = await authApi.login(formData);
      if (result.success) {
       
        toast.success("login successfully");

        dispatch(loginSuccess(result.data));
        
        navigate("/");
      } else {
       
        toast.error("Invalid password" || result?.error);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5e6ca] via-[#fefaf5] to-[#e7d3b5]">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-[#fffaf2] border border-[#e0c9a6]">
        <h2 className="text-3xl font-extrabold text-center text-[#6b4226] mb-2">
          ☕ Welcome Back
        </h2>
        <p className="text-center text-sm text-[#6b4226] mb-6">
          Log in to continue your study journey
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-lg border-[#d4b996] bg-[#fdfaf7] focus:ring-2 focus:ring-[#c19a6b] focus:outline-none transition"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-lg border-[#d4b996] bg-[#fdfaf7] focus:ring-2 focus:ring-[#c19a6b] focus:outline-none transition"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#b08968] to-[#8c5e3c] text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:from-[#8c5e3c] hover:to-[#6b4226] transition transform hover:-translate-y-0.5"
          >
            {loading ? "Brewing your account..." : "log In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#6b4226]">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-[#8c5e3c] font-medium hover:underline hover:text-[#6b4226]"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
