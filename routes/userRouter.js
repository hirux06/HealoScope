import { Router } from "express";
import userController from "../controllers/userControllers.js";

const userRouter = Router();

userRouter.post("/registerUser", userController.registerUser);
userRouter.post("/login", userController.login);
userRouter.get("/profile/:id", userController.getUserProfile);
userRouter.put("/editProfile/:id", userController.editUserProfile);

userRouter.delete("/delete/:id", userController.deleteUser);




export default userRouter;