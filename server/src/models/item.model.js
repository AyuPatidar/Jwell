import mongoose, { Schema } from "mongoose";

const itemSchema = new Schema(
  {
    itemType: {
      type: String,
      enum: ["gold", "silver", "stone"],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    tunch: {
      type: Number,
      default: 0,
    },
    wastage: {
      type: Number,
      default: 0,
    },
    grossWeight: {
      type: Number,
      default: 0,
    },
    weight: {
      type: Number,
      default: 0,
    },
    labour: {
      type: Number,
      default: 0,
    },
    rate: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    purana: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export const Item = new mongoose.model("Item", itemSchema);
