import { Router } from "express";
import UserController from "../controllers/user.controller";
const userRouter = Router();
userRouter.post('/submitsheets', UserController.submitsheets)
userRouter.get('/getPickings', UserController.getPickings);
export default userRouter;