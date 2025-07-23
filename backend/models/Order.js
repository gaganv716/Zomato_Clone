import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: String,
  restaurantId: String,
  items: [
    {
      dish: String,
      quantity: Number,
      price: Number,
    }
  ],
  address: Object,
  status: {
    type: String,
    default: "placed", // can be: placed, preparing, out_for_delivery, delivered
  },
  placedAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model("Order", orderSchema);
