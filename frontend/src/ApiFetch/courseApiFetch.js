const BaseURL = `${import.meta.env.VITE_API_URL}/course`;

export const courseApiFetch = {
  createCourse: async (credential) => {
    try {
      const res = await fetch(`${BaseURL}/create-course`, {
        method: "POST",
        credentials: "include",

        body: credential,
      });
      const data = await res.json();
      if (!res.ok) {
        throw Error(data.message || "Failed to create course");
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  getAllCourse: async () => {
    try {
      const res = await fetch(`${BaseURL}/get-all-course`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        throw Error(data.message || "Failed to create course");
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
};
