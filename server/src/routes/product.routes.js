import { Router } from "express";
import {
  getAllProducts,
  createOrUpdateProduct,
} from "../controllers/product.controller.js";

const router = Router();

router.route("/").get(getAllProducts);
router.route("/new-product").post(createOrUpdateProduct);

export default router;
