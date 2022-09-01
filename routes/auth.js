import { Router } from 'express';
import { getMe, login, register } from '../controllers/auth.js';
import { checkAuth } from '../utils/checkAuth.js';

const router = Router();

//REGISTER
router.post('/register', register);

//LOGIN
router.post('/login', login);

//Get me
router.get('/me', checkAuth, getMe);

export default router;
