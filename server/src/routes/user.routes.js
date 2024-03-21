import { Router } from "express";
import {
  getAllAgents,
  getAllCustomers,
  getUsersOrders,
  registerUser,
  updateUser,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/update").patch(updateUser);
router.route("/agents").get(getAllAgents);
router.route("/customers").get(getAllCustomers);
router.route("/:userId/orders").get(getUsersOrders);

export default router;
