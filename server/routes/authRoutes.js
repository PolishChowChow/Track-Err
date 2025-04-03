import { Router } from "express";
import { getOtp, checkOtp } from "../controllers/authControllers.js"
const authRouter = Router();

authRouter.get("/getOtp", getOtp)
authRouter.get("/checkOtp", checkOtp)

export default authRouter;