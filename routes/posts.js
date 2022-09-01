import { Router } from 'express';
import { createPost, getAll } from '../controllers/posts.js';
import { checkAuth } from '../utils/checkAuth.js';

const router = Router();

//Create Post
router.post('/', checkAuth, createPost);

//Get All Posts
router.get('/:id', getAll);

export default router;
