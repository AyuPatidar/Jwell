import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Order } from "../models/order.model.js";
import mongoose from "mongoose";

const registerUser = asyncHandler(async (req, res, next) => {
  try {
    const { userType, name, address = "", phoneNo } = req.body;

    if (!userType || !name || !phoneNo)
      throw new ApiError(400, "User Type, name and phone No are required");

    const existingUser = await User.findOne({ phoneNo });
    if (existingUser)
      throw new ApiError(409, "User with this phone number already exists");

    const user = await User.create({
      userType: userType,
      name: name,
      address: address || "",
      phoneNo: phoneNo,
      orders: [],
      paid: 0,
      remaining: 0,
    });

    res
      .status(201)
      .json(new ApiResponse(201, "User created successfully", user));
  } catch (error) {
    throw new ApiError(500, error?.message);
  }
});

const updateUser = asyncHandler(async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) throw new ApiError(400, "Id is required.");

    const { name, address, phoneNo } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { name: name, phoneNo: phoneNo, address: address },
      { new: true }
    );

    if (!user)
      throw new ApiError(500, "Something went wrong while updating user");

    res
      .status(200)
      .json(new ApiResponse(200, "User updated successfully", user));
  } catch (error) {
    throw new ApiError(500, "Something went wrong while updating user", error);
  }
});

const getAllAgents = asyncHandler(async (req, res, next) => {
  try {
    const agents = await User.aggregate([
      {
        $match: {
          userType: "agent",
        },
      },
    ]);

    if (!agents) throw new ApiError(404, "No agent found");

    res.status(200).json(new ApiResponse(200, "Found agents", agents));
  } catch (error) {
    throw new ApiError(500, "Something went wrong while finding agents");
  }
});

const getAllCustomers = asyncHandler(async (req, res, next) => {
  try {
    const customers = await User.aggregate([
      {
        $match: {
          userType: "customer",
        },
      },
    ]);

    if (!customers) throw new ApiError(404, "No customer found");

    res.status(200).json(new ApiResponse(200, "Found customers", customers));
  } catch (error) {
    throw new ApiError(500, "Something went wrong while finding customers");
  }
});

const createUserOrder = asyncHandler(async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) throw new ApiError(400, "User Id is required.");

    const {
      orderType,
      khareedOrBakaya,
      products,
      finalAmount,
      paid = 0,
      remaining = 0,
    } = req.body;

    if (!orderType || !khareedOrBakaya)
      throw new ApiError(400, "Order Type and khareedOrBakaya are required");

    if (khareedOrBakaya.toLowerCase().trim() === "khareed") {
      if (!products || !finalAmount)
        throw new ApiError(400, "Final Amount & products are required");
      if (parseInt(paid) + parseInt(remaining) !== parseInt(finalAmount))
        throw new ApiError(400, "Final amount !== paid + remaining");
    } else if (khareedOrBakaya.trim() === "bakaya" && (!paid || paid === 0)) {
      throw new ApiError(400, "Paid amount is required & must be > 0");
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { totalOrders: 1 } },
      { new: true, upsert: true }
    );

    let order;
    if (khareedOrBakaya.toLowerCase().trim() === "khareed")
      order = await Order.create({
        orderType: orderType,
        userId: userId,
        khareedOrBakaya: khareedOrBakaya,
        products: products,
        finalAmount: finalAmount,
        paid: paid,
        remaining: remaining,
        orderNo: user.totalOrders,
      });
    else
      order = await Order.create({
        orderType: orderType,
        userId: userId,
        khareedOrBakaya: khareedOrBakaya,
        paid: paid,
        orderNo: user.totalOrders,
      });

    res.status(201).json(new ApiResponse(201, "Order Created", order));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const getUserOrders = asyncHandler(async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) throw new ApiError(400, "User Id is required");

    const orders = await Order.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $project: {
          products: 0,
          userId: 0,
        },
      },
    ]);

    if (!orders) throw new ApiError(404, "No Order found for the user");

    res
      .status(200)
      .json(new ApiResponse(200, "Orders related to this user found", orders));
  } catch (error) {
    throw new ApiError(error.status, error.message);
  }
});

export {
  registerUser,
  updateUser,
  getAllAgents,
  getAllCustomers,
  getUserOrders,
  createUserOrder,
};
