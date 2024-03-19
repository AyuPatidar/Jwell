import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import userRoutes from "./src/routes/user.routes.js";

app.use("/api/v1/users", userRoutes);

export { app };
