import { Router } from "express";
import {
  createRecord,
  getAllRecords,
  getRecordById,
  updateRecord,
  deleteRecord,
} from "../../controllers/recordsController.js";
import { isAuthenticated } from "../../middleware/middlewares.js";

const router = Router();

router.post("/records", isAuthenticated, createRecord);
router.get("/users/:user_id/records", isAuthenticated, getAllRecords);
router.get("/records/:id", isAuthenticated, getRecordById);
router.put("/records/:id", isAuthenticated, updateRecord);
router.delete("/records/:id", isAuthenticated, deleteRecord);

export default router;
