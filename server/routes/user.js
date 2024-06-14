import { Router } from 'express';
import { activateUser, loginUser, logoutUser, registerUser } from '../controllers/user.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = Router();

router.post('/register', registerUser);
router.post('/activate', activateUser);
router.post('/login', loginUser);
router.get('/logout', isAuthenticated, logoutUser);

export default router;