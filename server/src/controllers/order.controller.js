import { Order } from "../models/order.model.js";
import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getOrderProducts = asyncHandler(async (req, res, next) => {
  try {
    const { orderId } = req.params;
    if (!orderId) throw new ApiError(400, "Order Id is required");

    const order = await Order.findById(orderId);

    const products = [];
    for (const productId in order.products) {
      const product = await Product.findById(productId);
      if (product) products.push(product);
    }

    res.status(200).json(new ApiResponse(200, "Found Products", products));
  } catch (error) {
    throw new ApiError(500, error?.message);
  }
});

export { getOrderProducts };
