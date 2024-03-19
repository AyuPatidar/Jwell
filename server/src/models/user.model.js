import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    user_type: {
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
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
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

export default User = mongoose.model("User", userSchema);
