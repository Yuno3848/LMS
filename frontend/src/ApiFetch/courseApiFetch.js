BaseURL = "http://localhost:8080/api/v1/course";

export const course = {
  createCourse: async () => {
    try {
      const res = await fetch(`${baseURL}/create-course`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credential),
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
