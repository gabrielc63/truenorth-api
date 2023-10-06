import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { corsOptions } from "./utils/corsOptions.js";
import authRoutes from "./routes/v1/authRoutes.js";
import operationsRoutes from "./routes/v1/operationsRoutes.js";
import recordsRoutes from "./routes/v1/recordsRoutes.js";
import { errorHandler } from "./middleware/middlewares.js";
import "dotenv/config.js";

const app = express();

app.use(morgan("dev"));
app.use(cors(corsOptions));

//middleware for cookies
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1/", authRoutes);
app.use("/api/v1/", operationsRoutes);
app.use("/api/v1/", recordsRoutes);

app.use(errorHandler);

export default app;
