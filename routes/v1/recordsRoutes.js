import { Router } from "express";
import {
  getAllRecords,
  deleteRecord,
} from "../../controllers/recordsController.js";
import { isAuthenticated } from "../../middleware/middlewares.js";

const router = Router();

router.get("/users/:user_id/records", isAuthenticated, getAllRecords);
router.delete("/records/:id", isAuthenticated, deleteRecord);

export default router;
