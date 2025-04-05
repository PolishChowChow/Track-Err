import { Router } from "express";
import { getOtp, checkOtp, verifyJwt } from "../controllers/authControllers.js"
const authRouter = Router();

authRouter.get("/getOtp", getOtp)
authRouter.post("/checkOtp", checkOtp)
authRouter.get("/verifyJwt", verifyJwt, (req, res, next) => res.json({message: "success"}))
export default authRouter;