import Router from "express";
import userRouter from "./userRouter.js";
import postRouter from "./postRouter.js";

const mainRouter = Router();

mainRouter.use("/users", userRouter);
mainRouter.use("/posts", postRouter);

export default mainRouter;