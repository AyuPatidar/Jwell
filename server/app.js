import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

import userRoutes from "./src/routes/user.routes.js";

app.use("/api/v1/users", userRoutes);

export { app };
