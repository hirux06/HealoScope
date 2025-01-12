import { Router } from "express";
import postController from "../controllers/postControllers.js";

const postRouter = Router();

postRouter.post("/createPost", postController.createPost);
postRouter.get("/allPosts", postController.getAllPost);
postRouter.get("/viewPost/:id", postController.getPostById);
postRouter.put("/editPost/:id", postController.editPost );
postRouter.delete("/deletePost/:id", postController.deletePost );


export default postRouter;