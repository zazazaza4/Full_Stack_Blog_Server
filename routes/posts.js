import { Router } from 'express';
import { createPost, getAll, getById } from '../controllers/posts.js';
import { checkAuth } from '../utils/checkAuth.js';

const router = Router();

//Create Post
router.post('/', checkAuth, createPost);

//Get All Posts
router.get('/', getAll);

//Get By Id
router.get('/:id', getById);

export default router;
