import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Item } from "../models/item.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.model.js";

const createItem = asyncHandler(async (req, res, next) => {
  try {
    const {
      itemType,
      name,
      tunch,
      wastage,
      grossWeight,
      weight,
      labour,
      rate,
      amount,
      purana = false,
      userType,
    } = req.body;
    if (
      !itemType ||
      !name ||
      !tunch ||
      !wastage ||
      !grossWeight ||
      !weight ||
      !labour ||
      !rate ||
      !amount ||
      !userType
    )
      throw new ApiError(400, "All fields are required.");

    if (!(userType === "agent" || userType === "customer"))
      throw new ApiError(400, "User Type must be agent or customer");

    if (!(itemType === "gold" || itemType === "silver" || itemType === "stone"))
      throw new ApiError(400, "Item Type must be gold or silver or stone");

    const item = await Item.create({
      itemType: itemType,
      name: name,
      tunch: tunch,
      wastage: wastage,
      grossWeight: grossWeight,
      weight: weight,
      labour: labour,
      rate: rate,
      amount: amount,
    });

    const product = await Product.find({ productType: itemType, name: name });
    if (product.length === 0) {
      const stockChange =
        userType === "agent" ? (purana ? 0 : weight) : purana ? weight : 0;
      await Product.create({
        productType: itemType,
        name: name,
        stock: stockChange,
      });
    } else {
      const stockChange =
        userType === "agent"
          ? purana
            ? -weight
            : weight
          : purana
          ? weight
          : -weight;
      await Product.findByIdAndUpdate(product[0]._id, {
        $inc: { stock: stockChange },
      });
    }

    res.status(201).json(new ApiResponse(201, "Item created", item._id));
  } catch (error) {
    throw new ApiError(
      error.status || 500,
      error.message || "Something went wrong while creating item"
    );
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
