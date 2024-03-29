import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createProduct = asyncHandler(async (req, res, next) => {
  try {
    const {
      productType,
      name,
      tunch,
      wastage,
      weight,
      weight_unit,
      stone = "",
      labour,
      rate,
      amount,
    } = req.body;
    if (
      !productType ||
      !name ||
      !tunch ||
      !wastage ||
      !weight ||
      !weight_unit ||
      !labour ||
      !rate ||
      !amount
    )
      throw new ApiError(400, "All fields are required.");

    const product = await Product.create({
      productType: productType,
      name: name,
      tunch: tunch,
      wastage: wastage,
      weight: weight,
      weight_unit: weight_unit,
      stone: stone,
      labour: labour,
      rate: rate,
      amount: amount,
    });

    res.status(201).json(new ApiResponse(201, "Product created", product._id));
  } catch (error) {
    throw new ApiError(500, error?.message);
  }
});

const getProduct = asyncHandler(async (req, res, next) => {
  try {
    const { productId } = req.params;
    if (!productId) throw new ApiError(400, "Product Id is required");

    const product = await Product.findById(productId);
    if (!product)
      throw new ApiError(404, "No product exists with this product Id");

    res.status(200).json(new ApiResponse(200, "Product found", product));
  } catch (error) {
    throw new ApiError(500, error?.message);
  }
});

export { createProduct, getProduct };
