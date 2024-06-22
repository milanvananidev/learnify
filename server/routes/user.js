import { Router } from 'express';
import { activateUser, loginUser, logoutUser, registerUser, getUserInfo, updateUserInfo, updateUserPassword, updateUserAvatar } from '../controllers/user.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = Router();

router.post('/register', registerUser);
router.post('/activate', activateUser);
router.post('/login', loginUser);
router.get('/logout', isAuthenticated,logoutUser);
router.get('/me', isAuthenticated, getUserInfo);
router.put('/update', isAuthenticated, updateUserInfo);
router.put('/update-password', isAuthenticated, updateUserPassword);
router.put('/update-avatar', isAuthenticated, updateUserAvatar);

export default router;