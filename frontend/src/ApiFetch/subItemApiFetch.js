const baseURL = `${import.meta.env.VITE_API_URL}/subItem`;

export const subItemApiFetch = {
  createSubItem: async (itemSectionId, formData) => {
    try {
      const response = await fetch(
        `${baseURL}/create-subItemSection/${itemSectionId}`,
        {
          method: "POST",
         credentials:"include",
          body: formData,
        }
      );

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Create SubItem Error:", error);
      throw error;
    }
  },

  deleteSubItem: async (subItemId) => {
    try {
      if (!subItemId) {
        throw new Error("SubItem ID is required");
      }

      const res = await fetch(`${baseURL}/delete-subItemSection/${subItemId}`, {
        method: "DELETE",
        credentials: "include",
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
