import mongoose, { Schema } from "mongoose";
import { Counter } from "./counter.model.js";

const orderSchema = new Schema({
  orderType: {
    type: String,
    enum: ["purchase", "sale"],
    required: true,
  },
  orderNo: {
    type: Number,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  khareedOrBakaya: {
    type: String,
    enum: ["khareed", "bakaya"],
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  finalAmount: {
    type: Number,
  },
  paid: {
    type: Number,
    required: true,
    default: 0,
  },
  remaining: {
    type: Number,
  },
});

orderSchema.pre("save", function (next) {
  const doc = this;
  if (doc.isNew) {
    Counter.findByIdAndUpdate(
      { _id: "orderId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    )
      .then((counter) => {
        doc.orderNo = counter.seq;
        next();
      })
      .catch((error) => {
        console.error("counter error-> : ", error);
        throw error;
      });
  } else {
    next();
  }
});

export const Order = new mongoose.model("Order", orderSchema);
