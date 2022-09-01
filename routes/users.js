import { Router } from 'express';
import { deleteUser, getUser, updateUser } from '../controllers/users.js';
import { checkAuth } from '../utils/checkAuth.js';

const router = Router();

//UPDATE
router.put('/:id', checkAuth, updateUser);

//DELETE
router.delete('/:id', checkAuth, deleteUser);

//Get User
router.get('/:id', getUser);

export default router;
