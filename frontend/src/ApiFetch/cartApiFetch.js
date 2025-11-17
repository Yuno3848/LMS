const baseURL = `${import.meta.env.VITE_API_URL}/cart`;
export const cartApiFetch = {
  addToCart: async (courseId) => {
    try {
      const res = await fetch(`${baseURL}/add-to-cart/${courseId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log("res ok :", res);
        throw new Error(`failed to add in cart`);
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  removeFromCart: async (courseId) => {
    try {
      const res = await fetch(`${baseURL}/remove-from-cart`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ courseId }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(`failed to remove from cart`);
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  showCart: async () => {
    try {
      const res = await fetch(`${baseURL}/show-cart`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(`failed to show cart`);
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  removeUserCart: async () => {
    try {
      const res = await fetch(`${baseURL}/remove-user-cart`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(`failed to delete cart`);
      }
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
};
