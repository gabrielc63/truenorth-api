import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/v1/authRoutes.js";
import { errorHandler } from "./middleware/middlewares.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/", authRoutes);

app.get("/", (req, res) => {
  res.json("Welcome");
});

app.use(errorHandler);

export default app;
