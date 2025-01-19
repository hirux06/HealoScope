import Router from "express";
import userRouter from "./userRouter.js";
import postRouter from "./postRouter.js";

const mainRouter = Router();

mainRouter.use("/users", userRouter); // Router for users related endpoints
mainRouter.use("/posts", postRouter); // Router for posts related endpoints

export default mainRouter;
