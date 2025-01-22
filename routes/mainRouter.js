import Router from "express";
import userRouter from "./userRouter.js";
import postRouter from "./postRouter.js";
import commentRouter from "./commentRouter.js";

const mainRouter = Router();

<<<<<<< HEAD
mainRouter.use("/users", userRouter);
mainRouter.use("/posts", postRouter);
mainRouter.use("/comments", commentRouter);
=======
mainRouter.use("/users", userRouter); // Router for users related endpoints
mainRouter.use("/posts", postRouter); // Router for posts related endpoints
>>>>>>> 3f3c9f93fcef035e6e0a8c12d77d306d895a6ccd

export default mainRouter;
