import { Router } from "express";
import {
  getAllAgents,
  getAllCustomers,
  registerUser,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/register", registerUser);
router.route("/agents", getAllAgents);
router.route("/customers", getAllCustomers);

export default router;
