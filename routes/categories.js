import { Router } from 'express';
import { checkAuth } from '../utils/checkAuth.js';

const router = Router();

//Create Post
router.post('/', checkAuth, createPost);

//Get All Posts
router.get('/', getAll);
