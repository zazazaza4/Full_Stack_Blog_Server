import { Router } from "express";
import {
  createPost,
  getAll,
  getById,
  getPostComments,
  removePost,
  updatePost,
} from "../сontrollers/posts.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = Router();

//Create Post
router.post("/", checkAuth, createPost);

//Get All Posts
router.get("/", getAll);

//Get By Id
router.get("/:id", checkAuth, getById);

//Delete Post
router.get("/:id", checkAuth, removePost);

//Update Post
router.get("/:id", checkAuth, updatePost);

// Get Post Comments
router.get("/comments/:id", getPostComments);

export default router;
