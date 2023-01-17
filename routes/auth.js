import { Router } from 'express';
import { getMe, login, register } from '../Controllers/auth.js';
import { checkAuth } from '../utils/checkAuth.js';

const router = Router();

//REGISTER
router.post('/register', register);

//LOGIN
router.post('/login', login);

//Get me
router.get('/me', checkAuth, getMe);

export default router;
