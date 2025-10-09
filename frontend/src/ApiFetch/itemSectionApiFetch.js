const baseURL = VITE_API_URL || "http://localhost:8080/api/v1/itemSection";

export const itemSectionApiFetch = {
  createItemSection: async (courseId, sectionData) => {
    try {
      if (!courseId) {
        throw new Error("Course ID is required");
      }
      const res = await fetch(`${baseURL}/create-item-section/${courseId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sectionData),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create item section");
      }
      return { success: true, data: data.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  updateItemSection: async (sectionId, updateData) => {
    try {
      const res = await fetch(`${baseURL}/update-item-section/${sectionId}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update item section");
      }
      return { success: true, data: data.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  deleteItemSection: async (sectionId) => {
    try {
      const res = await fetch(`${baseURL}/delete-item-section/${sectionId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to delete item section");
      }
      return { success: true, data: data.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getItemSectionById: async (sectionId) => {
    try {
      const res = await fetch(
        `${baseURL}/get-item-section-by-id/${sectionId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch item section");
      }
      return { success: true, data: data.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getAllItemSection: async (courseId) => {
    try {
      if (!courseId) {
        throw new Error("Course ID is required");
      }
      const res = await fetch(`${baseURL}/get-all-item-section/${courseId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch all item sections");
      }
      return { success: true, data: data.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
};
