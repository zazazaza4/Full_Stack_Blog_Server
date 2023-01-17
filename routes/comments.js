import { Router } from "express";
import { createComment } from "../Controllers/comments.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = Router();

//Create Comment
router.post("/:id", checkAuth, createComment);

export default router;
