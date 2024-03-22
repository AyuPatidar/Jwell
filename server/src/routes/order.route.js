import { Router } from "express";
import { getOrderProducts } from "../controllers/order.controller.js";

const router = Router();

router.route("/:orderId/products").get(getOrderProducts);

export default router;
