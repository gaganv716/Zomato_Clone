import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  foodId: {
    type: String,
    required: true,
  },
  restaurantId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

const CartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: [CartItemSchema],
});

const Cart = mongoose.model("Cart", CartSchema);
export default Cart;
