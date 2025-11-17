const baseURL = `${import.meta.env.VITE_API_URL}/enrollment`;

const enrolledApiFetch = {
  getUserEnrollment: async () => {
    try {
      const res = await fetch(`${baseURL}/get-user-enrollment`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to fetch user enrollment");
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  getDetailedUserEnrollments: async () => {
    try {
      const res = await fetch(`${baseURL}/get-detailed-user-enrollment`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.message || "Failed to fetch user detailed enrollment");
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
};

export default enrolledApiFetch;
