import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    orderType: {
      type: String,
      enum: ["purchase", "sale"],
      required: true,
    },
    orderNo: {
      type: Number,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      index: true,
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
  },
  { timestamps: true }
);

export const Order = new mongoose.model("Order", orderSchema);
