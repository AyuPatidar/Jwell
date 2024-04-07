import { Router } from "express";
import {
  createUserOrder,
  getUser,
  getAllAgents,
  getAllCustomers,
  getUserOrders,
  registerUser,
  updateUser,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/new-user").post(registerUser);
router.route("/agents").get(getAllAgents);
router.route("/customers").get(getAllCustomers);
router.route("/:userId/update").patch(updateUser);
router.route("/:userId").get(getUser);
router.route("/:userId/new-order").post(createUserOrder);
router.route("/:userId/orders").get(getUserOrders);

export default router;
