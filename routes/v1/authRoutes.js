import { Router } from "express";
import {
  signinHandler,
  refreshTokenHandler,
} from "../../controllers/authController.js";

const router = Router();

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post("/login", signinHandler);
router.post("/refresh_token", refreshTokenHandler);

export default router;
