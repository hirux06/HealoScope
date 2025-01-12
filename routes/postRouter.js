import { Router } from "express";
import postController from "../controllers/postControllers.js";

const postRouter = Router();

postRouter.get("/all", postController.getAllPost);

export default postRouter;