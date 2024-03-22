import { Router } from "express";
import { getProduct } from "../controllers/product.controller.js";

const router = Router();

router.route("/:productId").get(getProduct);

export default router;
