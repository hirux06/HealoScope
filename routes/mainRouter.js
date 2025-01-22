import Router from "express";
import userRouter from "./userRouter.js";
import postRouter from "./postRouter.js";
import commentRouter from "./commentRouter.js";

const mainRouter = Router();

mainRouter.use("/users", userRouter);
mainRouter.use("/posts", postRouter);
mainRouter.use("/comments", commentRouter);

export default mainRouter;