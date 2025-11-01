import toast from "react-hot-toast";

const baseURL = `${import.meta.env.VITE_API_URL}/subItem`;

export const subItemApiFetch = {
  createSubItem: async (itemSectionId, formData) => {
    try {
      const res = await fetch(
        `${baseURL}/create-subItemSection/${itemSectionId}`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

  
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to create item");
      }

      return { success: true, data };
    } catch (error) {
      console.error("Create SubItem Error:", error.message);
      return { success: false, message: error.message };
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
        headers:{
          "Content-Type":"application/json"
        }
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
