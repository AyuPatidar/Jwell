import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Item } from "../models/item.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createItem = asyncHandler(async (req, res, next) => {
  try {
    const { itemType, name, tunch, wastage, weight, labour, rate, amount } =
      req.body;
    if (
      !itemType ||
      !name ||
      !tunch ||
      !wastage ||
      !weight ||
      !labour ||
      !rate ||
      !amount
    )
      throw new ApiError(400, "All fields are required.");

    const item = await Item.create({
      itemType: itemType,
      name: name,
      tunch: tunch,
      wastage: wastage,
      weight: weight,
      labour: labour,
      rate: rate,
      amount: amount,
    });

    res.status(201).json(new ApiResponse(201, "Item created", item._id));
  } catch (error) {
    throw new ApiError(error.status, error?.message);
  }
});

const getItem = asyncHandler(async (req, res, next) => {
  try {
    const { itemId } = req.params;
    if (!itemId) throw new ApiError(400, "Item Id is required");

    const item = await Item.findById(itemId);
    if (!item) throw new ApiError(404, "No item exists with this item Id");

    res.status(200).json(new ApiResponse(200, "Item found", item));
  } catch (error) {
    throw new ApiError(error.status, error?.message);
  }
});

export { createItem, getItem };
