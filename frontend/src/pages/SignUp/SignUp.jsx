import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log("something went wrong!!!" || data.message);
      } else {
        console.log("Registration successful:", data);
        toast.success("Signed up successfully");
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5e6ca] via-[#fefaf5] to-[#e7d3b5]">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl bg-[#fffaf2] border border-[#e0c9a6]">
        <h2 className="text-3xl font-extrabold text-center text-[#6b4226] mb-2">
          ☕ Create Your Study Account
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-[#5c4636] mb-1">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-700
               border border-[#d4b996] rounded-lg bg-[#fdf8f3] cursor-pointer
               focus:outline-none focus:ring-2 focus:ring-[#b08968] focus:border-[#b08968]
               file:mr-4 file:py-2.5 file:px-4
               file:rounded-lg file:border-0
               file:text-sm file:font-semibold
               file:bg-[#b08968] file:text-white
               hover:file:bg-[#8c5e3c]"
            />
          </div>

          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => {
              setFormData({ ...formData, username: e.target.value });
            }}
            className="w-full px-4 py-3 border rounded-lg border-[#d4b996] bg-[#fdfaf7] focus:ring-2 focus:ring-[#c19a6b] focus:outline-none transition"
          />
          <input
            type="text"
            placeholder="Full Name"
            value={formData.fullname}
            onChange={(e) => {
              setFormData({ ...formData, fullname: e.target.value });
            }}
            className="w-full px-4 py-3 border rounded-lg border-[#d4b996] bg-[#fdfaf7] focus:ring-2 focus:ring-[#c19a6b] focus:outline-none transition"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
            className="w-full px-4 py-3 border rounded-lg border-[#d4b996] bg-[#fdfaf7] focus:ring-2 focus:ring-[#c19a6b] focus:outline-none transition"
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
            className="w-full px-4 py-3 border rounded-lg border-[#d4b996] bg-[#fdfaf7] focus:ring-2 focus:ring-[#c19a6b] focus:outline-none transition"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmpassword}
            onChange={(e) => {
              setFormData({ ...formData, confirmpassword: e.target.value });
            }}
            className="w-full px-4 py-3 border rounded-lg border-[#d4b996] bg-[#fdfaf7] focus:ring-2 focus:ring-[#c19a6b] focus:outline-none transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#b08968] to-[#8c5e3c] text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:from-[#8c5e3c] hover:to-[#6b4226] transition transform hover:-translate-y-0.5"
          >
            {loading ? "Brewing your account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[#6b4226]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#8c5e3c] font-medium hover:underline hover:text-[#6b4226]"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
