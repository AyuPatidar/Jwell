import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createProduct = asyncHandler(async (req, res, next) => {
  const {
    productType,
    name,
    tunch,
    wastage,
    weight,
    weight_unit,
    stone,
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
    !stone ||
    !labour ||
    !rate ||
    !amount
  )
    throw new ApiError(400, "All fields are required.");

  try {
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

    if (!product)
      throw new ApiError(500, "Something went wrong while creating product");

    res.status(201).json(new ApiResponse(201, "Product created", product._id));
  } catch (error) {
    throw new ApiError(500, "Something went wrong while creating product");
  }
});

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

export { createProduct, getProduct };
