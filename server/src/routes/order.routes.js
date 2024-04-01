import { Router } from "express";
import { getOrderItems } from "../controllers/order.controller.js";

const router = Router();

router.route("/:orderId/items").get(getOrderItems);

export default router;
