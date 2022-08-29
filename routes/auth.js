import { Router } from 'express';
import { register } from '../controllers/auth.js';

const router = Router();

//REGISTER
router.post('/register', register);

//LOGIN
router.post('/login', register);

//ME
router.get('/me', register);

export default router;
