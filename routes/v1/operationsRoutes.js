import { Router } from "express";
import { operationHandler } from "../../controllers/operationsController.js";
import { isAuthenticated } from "../../middleware/middlewares.js";

const router = Router();

router.post("/operations", isAuthenticated, operationHandler);

export default router;
