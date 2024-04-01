import mongoose, { Schema } from "mongoose";

const itemSchema = new Schema(
  {
    itemType: {
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
    weightUnit: {
      type: String,
      enum: ["gm", "kg"],
      required: true,
    },
    stone: {
      type: String,
    },
    labour: {
      type: Number,
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

export const Item = new mongoose.model("Item", itemSchema);
