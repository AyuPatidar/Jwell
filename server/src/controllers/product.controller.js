import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createOrUpdateProduct = asyncHandler(async (req, res, next) => {
  try {
    const { productType, name, stock = 0 } = req.body;

    if (!productType || !name)
      throw new ApiError(400, "All fields are required");

    if (
      !(
        productType === "gold" ||
        productType === "silver" ||
        productType === "stone"
      )
    )
      throw new ApiError(400, "Product Type must be gold or silver or stone");

    const product = await Product.findOneAndUpdate(
      { productType: productType, name: name },
      { $inc: { stock: stock } },
      { new: true, upsert: true }
    );

    res.status(201).json(new ApiResponse(201, "Product created", product));
  } catch (error) {
    throw new ApiError(
      error.status || 500,
      error.message || "Something went wrong while creating product"
    );
  }
});

const getAllProducts = asyncHandler(async (req, res, next) => {
  try {
    const products = await Product.find();

    return res
      .status(200)
      .json(new ApiResponse(200, "Found Products", products));
  } catch (error) {
    throw new ApiError(
      error.status || 500,
      error.message || "Something went wrong while finding products"
    );
  }
});

export { createOrUpdateProduct, getAllProducts };
