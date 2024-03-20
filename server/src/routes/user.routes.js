import { Router } from "express";
import {
  getAllAgents,
  getAllCustomers,
  registerUser,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/agents").get(getAllAgents);
router.route("/customers").get(getAllCustomers);

export default router;
