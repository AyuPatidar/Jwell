import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    productType: {
      type: String,
      required: true,
      enum: ["gold", "silver", "stone"],
    },
    name: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Product = new mongoose.model("Product", productSchema);
