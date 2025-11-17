const baseURL = `${import.meta.env.VITE_API_URL}/transaction`;
//https://api.razorpay.com/v1/orders
const transactionApiFetch = {
  createOrder: async (subTotal, courseIds) => {
    try {
      const res = await fetch(`${baseURL}/create-order`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subTotal, courseIds }),
      });

      const data = await res.json();
      console.log("transaction data :", data);
      if (!res.ok) {
        console.log("create res :", res);
        throw new Error(data.message || "Failed to create transaction");
      }

      return { success: true, data };
    } catch (error) {
      console.error("Create transaction Error:", error);
      return { success: false, message: error.message };
    }
  },

  verifyPayment: async (paymentData) => {
    try {
      const res = await fetch(`${baseURL}/verify-payment`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      });

      const data = await res.json();
      console.log("transaction data :", data);
      if (!res.ok) {
        console.log("create res :", res);
        throw new Error(data.message || "Failed to verify transaction");
      }

      return { success: true, data };
    } catch (error) {
      console.error("Verify transaction Error:", error);
      return { success: false, message: error.message };
    }
  },
};

export default transactionApiFetch;
