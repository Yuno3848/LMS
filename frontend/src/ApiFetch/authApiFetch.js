import { createNextState } from "@reduxjs/toolkit";

const baseAuthURL = VITE_API_URL || "/api/v1/auth";
export const authApi = {
  signup: async (credential) => {
    try {
      const res = await fetch(`${baseAuthURL}/register`, {
        method: "POST",

        credentials: "include",
        body: credential,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(`Signed Up failed`);
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  login: async (credential) => {
    try {
      const res = await fetch(`${baseAuthURL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credential),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(`login Up failed`);
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  logout: async () => {
    try {
      const res = await fetch(`${baseAuthURL}/logout`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      console.log("clicked");
      if (!res.ok) {
        throw new Error(`Logout failed`);
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  profile: async () => {
    try {
      const res = await fetch(`${baseAuthURL}/profile`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(`Profile failed`);
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  updateProfile: async (credential) => {
    try {
      const res = await fetch(`${baseAuthURL}/update-profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credential),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(`Update Profile failed`);
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  updateAvatar: async (credential) => {
    try {
      const res = await fetch(`${baseAuthURL}/update-avatar`, {
        method: "PATCH",
        credentials: "include",
        body: credential,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(`update avatar failed`);
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  verifyMail: async (token) => {
    try {
      const res = await fetch(`${baseAuthURL}/verify-email/${token}`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(`Email verification failed`);
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  me: async () => {
    try {
      const res = await fetch(`${baseAuthURL}/me`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(`Email verification failed`);
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  forgotPassword: async (email) => {
    try {
      const res = await fetch(`${baseAuthURL}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(`Forgot Password failed`);
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  resetPassword: async ({ newPassword, confirmPassword, token }) => {
    try {
      const res = await fetch(`${baseAuthURL}/reset-password/${token}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ newPassword, confirmPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(`Reset password failed`);
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
};
