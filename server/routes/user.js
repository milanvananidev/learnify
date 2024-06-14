import { Router } from 'express';
import { activateUser, registerUser } from '../controllers/user.js';

const router = Router();

router.post('/register', registerUser);
router.post('/activate', activateUser);

export default router;