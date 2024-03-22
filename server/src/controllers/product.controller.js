import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getProduct = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  if (!productId) throw new ApiError(400, "Product Id is required");

  try {
    const product = await Product.findById(productId);
    if (!product)
      throw new ApiError(404, "No product exists with this product Id");

    res.status(200).json(new ApiResponse(200, "Product found", product));
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while finding product",
      error
    );
  }
});

export { getProduct };
