import { Router } from "express";
import postController from "../controllers/postControllers.js";

const postRouter = Router();

postRouter.post("/create", postController.createPost);

export default postRouter;