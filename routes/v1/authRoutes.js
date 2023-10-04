import { Router } from "express";
import { signinHandler } from "../../controllers/authController.js";

const router = Router();

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post("/login", signinHandler);

export default router;
