import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    product_type: {
      type: String,
      enum: ["gold", "silver"],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    tunch: {
      type: Number,
      required: true,
    },
    wastage: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
      default: 0,
    },
    weight_unit: {
      type: String,
      enum: ["gm", "kg"],
      required: true,
    },
    stone: {
      type: String,
    },
    labour: {
      type: String,
      required: true,
      default: 0,
    },
    rate: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

export default ProductSchema = new mongoose.model("Product", productSchema);
