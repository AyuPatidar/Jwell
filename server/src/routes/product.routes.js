import { Router } from "express";
import {
  getAllProducts,
  createProduct,
} from "../controllers/product.controller.js";

const router = Router();

router.route("/").get(getAllProducts);
router.route("/new-product").post(createProduct);

export default router;
