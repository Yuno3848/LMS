const baseURL = "http://localhost:8080/api/v1/instructorProfile";

const instructorProfileAPIFetch = {
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
};
