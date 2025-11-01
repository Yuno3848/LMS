const baseURL = `${import.meta.env.VITE_API_URL}/transaction`;

const transactionApiFetch = {
  createOrder: async () => {
    try {
      const res = await fetch(`${baseURL}/${courseId}`, {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to create transaction");
      }

      return { success: true, data };
    } catch (error) {
      console.error("Create SubItem Error:", error.message);
      return { success: false, message: error.message };
    }
  },
};
