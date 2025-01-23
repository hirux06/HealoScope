import { Router } from "express";
import userController from "../controllers/userControllers.js";
import upload from "../utils/multer.js";

const userRouter = Router();

userRouter.post("/registerUser", upload.single('profilePic'), userController.registerUser);
userRouter.post("/login", userController.login);
userRouter.get("/profile/:id", userController.getUserProfile);
userRouter.put("/editProfile/:id", userController.editUserProfile);

userRouter.delete("/delete/:id", userController.deleteUser);




export default userRouter;