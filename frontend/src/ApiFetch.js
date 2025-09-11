const baseAuthURL = "/api/v1/auth";
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
        throw new Error(`Signed Up failed ${res.status}`);
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
        throw new Error(`login Up failed ${res.status}`);
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
        throw new Error(`Logout failed ${res.status}`);
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
        throw new Error(`Profile failed ${res.status}`);
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  updateProfile: async (credential) => {
    try {
      const res = await fetch(`${baseAuthURL}/update-profile`, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credential),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(`Update Profile failed ${res.status}`);
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
};
