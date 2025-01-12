import { Router } from "express";
import userController from "../controllers/userControllers.js";

const userRouter = Router();

userRouter.post("/registerUser", userController.registerUser);
userRouter.post("/login", userController.login);


export default userRouter;
