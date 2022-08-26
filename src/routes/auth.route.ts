import { Router } from "express";
import AuthController from "../controllers/auth.controller";
const authRouter = Router();
authRouter.post('/signup', AuthController.register);
authRouter.post('/confirm/:token', AuthController.verifyEmail);
authRouter.post("/authentication", AuthController.authenticate);
authRouter.post("/authorization", AuthController.authorize);
export default authRouter;