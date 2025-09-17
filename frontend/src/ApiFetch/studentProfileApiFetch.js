const baseUrl = "http://localhost:8080/api/v1/studentProfile";
export const studentProfileApiFetch = {
  createStudentProfile: async (credentials) => {
    try {
      const res = await fetch(`${baseUrl}/create-student-profile`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error("Failed to create student profile");
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  updateStudentProfile: async (credentials) => {
    try {
      const res = await fetch(`${baseUrl}/update-student-profile`, {
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error("Failed to update student profile");
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
  verifyStudent: async () => {
    try {
      const res = await fetch(`${baseUrl}/verify-student-profile`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error("Failed to verify-student-profile");
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
};
