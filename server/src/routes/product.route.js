import { Router } from "express";
import {
  createProduct,
  getProduct,
} from "../controllers/product.controller.js";

const router = Router();

router.route("/new-product").post(createProduct);
router.route("/:productId").get(getProduct);

export default router;
