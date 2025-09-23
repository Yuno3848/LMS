const baseURL = "http://localhost:8080/api/v1/instructorProfile";

export const instructorProfileAPIFetch = {
  createInstructorProfile: async (credential) => {
    try {
      const res = await fetch(`${baseURL}/create-instructor-profile`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credential),
      });
      const data = res.json();
      if (!res.ok) {
        throw Error("Failed to create instructor profile");
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  updateInstructorProfile: async (credential) => {
    try {
      const res = await fetch(`${baseURL}/update-instructor-profile`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credential),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error("Failed to update instructor profile");
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
};
