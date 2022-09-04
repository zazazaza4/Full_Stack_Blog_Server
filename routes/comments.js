import { Router } from 'express';
import { createComment } from '../controllers/comments.js';
import { checkAuth } from '../utils/checkAuth.js';

const router = Router();

//Create Comment
router.post('/:id', checkAuth, createComment);

export default router;
