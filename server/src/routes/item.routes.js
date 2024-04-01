import { Router } from "express";
import { createItem, getItem } from "../controllers/item.controller.js";

const router = Router();

router.route("/new-item").post(createItem);
router.route("/:itemId").get(getItem);

export default router;
