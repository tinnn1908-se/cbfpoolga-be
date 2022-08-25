import { Router } from "express";
import AuthController from "../controllers/auth.controller";
const authRouter = Router();
authRouter.post('/signup', AuthController.register);
authRouter.post('/confirm/:token', AuthController.verifyEmail);
export default authRouter;