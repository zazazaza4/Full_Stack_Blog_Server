import { Router } from 'express';
import { createCategory, getAll } from '../controllers/categories.js';
import { checkAuth } from '../utils/checkAuth.js';

const router = Router();

//Create Post
router.post('/', checkAuth, createCategory);

//Get All Posts
router.get('/', getAll);

export default router;
