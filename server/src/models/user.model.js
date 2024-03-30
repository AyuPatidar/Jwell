import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const userSchema = new Schema(
  {
    userType: {
      type: String,
      enum: ["agent", "customer"],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    phoneNo: {
      type: String,
      required: true,
      unique: true,
    },
    totalOrders: {
      type: Number,
      default: 0,
    },
    paid: {
      type: Number,
      required: true,
      default: 0,
    },
    remaining: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

userSchema.plugin(mongooseAggregatePaginate);

export const User = new mongoose.model("User", userSchema);
