import { Order } from "../models/order.model.js";
import { Item } from "../models/item.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getOrderItems = asyncHandler(async (req, res, next) => {
  try {
    const { orderId } = req.params;
    if (!orderId) throw new ApiError(400, "Order Id is required");

    const order = await Order.findById(orderId);

    const items = [];
    for (const itemId of order.items) {
      const item = await Item.findById(itemId);
      if (item) items.push(item);
    }

    res.status(200).json(new ApiResponse(200, "Found items", items));
  } catch (error) {
    throw new ApiError(error.status, error?.message);
  }
});

export { getOrderItems };
