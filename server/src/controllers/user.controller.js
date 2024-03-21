import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Order } from "../models/order.model.js";

const registerUser = asyncHandler(async (req, res, next) => {
  try {
    const { userType, name, address = "", phoneNo } = req.body;

    if (!userType || !name || !phoneNo)
      throw new ApiError(400, "User Type, name and phone No are required");

    const existingUser = await User.findOne({ phoneNo });
    if (existingUser)
      throw new ApiError(409, "User with this phone number already exists");

    const user = await User.create({
      userType,
      name,
      address: address || "",
      phoneNo,
      orders: [],
      paid: 0,
      remaining: 0,
    });

    res
      .status(201)
      .json(new ApiResponse(201, "User created successfully", user));
  } catch (error) {
    console.error("Register User: ", error);
    throw new ApiError(
      500,
      "Something went wrong while registering user",
      error
    );
  }
});

const updateUser = asyncHandler(async (req, res, next) => {
  const { id, name, address, phoneNo } = req.body;

  if (!id) throw new ApiError(400, "Id is required.");

  const user = await User.findByIdAndUpdate(
    id,
    { name: name, phoneNo: phoneNo, address: address },
    { new: true }
  );

  if (!user)
    throw new ApiError(500, "Something went wrong while updating user");

  res.status(200).json(new ApiResponse(200, "User updated successfully", user));
});

const getAllAgents = asyncHandler(async (req, res, next) => {
  const { page = 1, limit = 2 } = req.query;

  const agents = await User.aggregate(
    [
      {
        $match: {
          userType: "agent",
        },
      },
    ],
    { page, limit }
  );

  if (!agents) throw new ApiError(404, "No agent found");

  res.status(200).json(new ApiResponse(200, "Found agents", agents));
});

const getAllCustomers = asyncHandler(async (req, res, next) => {
  const { page = 1, limit = 2 } = req.query;

  const customers = await User.aggregate(
    [
      {
        $match: {
          userType: "customer",
        },
      },
    ],
    { page, limit }
  );

  if (!customers) throw new ApiError(404, "No customer found");

  res.status(200).json(new ApiResponse(200, "Found customers", customers));
});

const getUsersOrders = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  if (!userId) throw new ApiError(400, "User Id is required");

  const orders = Order.aggregate([
    {
      $match: {
        userId: userId,
      },
    },
  ]);

  if (!orders) throw new ApiError(404, "No Order found for the user");

  res
    .status(200)
    .json(new ApiResponse(200, "Orders related to this user found", orders));
});

export {
  registerUser,
  updateUser,
  getAllAgents,
  getAllCustomers,
  getUsersOrders,
};
