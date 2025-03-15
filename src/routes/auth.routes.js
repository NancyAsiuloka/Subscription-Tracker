import { Router } from "express";
import {
  signUp,
  signIn,
  updatePassword,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/sign-up", signUp);
authRouter.post("/sign-in", signIn);
authRouter.post("/sign-out", signUp);
authRouter.post("/update-password", updatePassword);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password", signUp);

export default authRouter;
