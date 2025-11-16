export const createOrder = async ({ productId, quantity, amount, userId }) => {
  try {
    const res = await fetch("https://e-commerce-shopify-backend.onrender.com/api/order/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity, amount, userId }),
    });

    if (!res.ok) {
      const text = await res.text(); // get raw response for debugging
      throw new Error(`Order API failed: ${res.status} ${text}`);
    }

    return res.json();
  } catch (err) {
    console.error("Order creation failed:", err);
    throw err;
  }
};
