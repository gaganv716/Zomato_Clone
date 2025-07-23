import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

// Add to cart
router.post("/", async (req, res) => {
  const { userId, item } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create new cart
      cart = new Cart({ userId, items: [item] });
    } else {
      // Check if item already exists in cart
      const existingItem = cart.items.find(
        (i) =>
          i.foodId === item.foodId &&
          i.restaurantId === item.restaurantId
      );

      if (existingItem) {
        existingItem.quantity += item.quantity || 1;
      } else {
        cart.items.push(item);
      }
    }

    await cart.save();
    res.status(200).json({ message: "Item added to cart", cart });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
