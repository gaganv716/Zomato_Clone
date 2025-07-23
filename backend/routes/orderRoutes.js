import express from "express";
import Order from "../models/Order.js";
import restaurantData from "../data/restaurantData.js"; // ✅ import the backend version
const router = express.Router();

// ✅ Place order with price mapping
router.post("/", async (req, res) => {
  try {
    const { userId, restaurantId, items, address, paymentMethod } = req.body;

    const restaurant = restaurantData.find(r => r.id === restaurantId);
    if (!restaurant) {
      return res.status(404).json({ error: "Restaurant not found" });
    }

    const updatedItems = items.map((item) => {
      const menuItem = restaurant.menu.find(m => m.dish === item.dish || m.dish === item.foodId);
      const price = typeof menuItem?.price === "string"
        ? parseInt(menuItem.price.replace("₹", ""))
        : menuItem?.price || 0;

      return {
        ...item,
        price
      };
    });

    const newOrder = new Order({
      userId,
      restaurantId,
      items: updatedItems,
      address,
      paymentMethod,
      status: "Order Placed"
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    console.error("❌ Error placing order:", err);
    res.status(500).json({ error: "Failed to place order", details: err.message });
  }
});

// ✅ Get full order details
router.get("/:orderId", async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    console.error("❌ Error fetching order:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// ✅ Update order status
router.put("/:orderId/status", async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  try {
    const updated = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    res.json(updated);
  } catch (err) {
    console.error("❌ Error updating status:", err);
    res.status(500).json({ error: "Update failed", details: err.message });
  }
});

export default router;
