import { Router } from "express";
import commentController from "../controllers/commentControllers.js";

const commentRouter = Router();

commentRouter.post("/addComment", commentController.addComment);
commentRouter.get("/getCommentsByPost/:postId", commentController.getCommentsByPost);
commentRouter.delete("/deleteComment/:id", commentController.deleteComment);


export default commentRouter;