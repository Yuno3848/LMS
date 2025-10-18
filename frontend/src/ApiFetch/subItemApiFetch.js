const baseURL = `${import.meta.env.VITE_API_URL}/subItem`;

export const subItemApiFetch = {
  createSubItem: async (credentials) => {
    try {
      // Extract sectionId from credentials
      const { sectionId, ...bodyData } = credentials;

      if (!sectionId) {
        throw new Error("Section ID is required");
      }

      const res = await fetch(
        `${baseURL}/create-subItemSection/${sectionId}`, // Fixed: removed colon, use sectionId from credentials
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData), // Send remaining data without sectionId
        }
      );
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create item");
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  deleteSubItem: async (subItemId) => {
    // Added parameter
    try {
      if (!subItemId) {
        throw new Error("SubItem ID is required");
      }

      const res = await fetch(`${baseURL}/delete-subItemSection/${subItemId}`, {
        // Fixed: added subItemId to URL
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete item");
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
};
