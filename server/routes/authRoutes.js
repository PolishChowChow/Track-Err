import { Router } from "express";
import authControllers from "../controllers/authControllers.js"
const authRouter = Router();

authRouter.get("/otp", authControllers)

export default authRouter;