import { Router } from "express";
import PostController from "../controllers/post";
const router = Router();

router.post("/create", PostController.createPost);
router.put("/like", PostController.like);
router.put("/comment", PostController.comment);
router.get("/likes/:id", PostController.getLikes);
router.get("/comments/:id", PostController.getComments);
router.get("/comment/likes/:id", PostController.getCommentLikes);

export default router;
