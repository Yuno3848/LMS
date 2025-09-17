const baseUrl = "http://localhost:8080/api/v1/studentProfile";
export const studentProfileApiFetch = {
  verifyStudent: async () => {
    try {
      const res = await fetch(`${baseUrl}/create-student-profile`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error("Failed to create student profile");
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  
};
