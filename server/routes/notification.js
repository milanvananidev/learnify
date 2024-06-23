import { Router } from 'express';
import { getNotifications, updateNotificationStatus } from '../controllers/notification.js';
import { authorizeRoles, isAuthenticated } from '../middlewares/auth.js';

const router = Router();

router.get('/all', isAuthenticated, authorizeRoles("admin"), getNotifications);
router.put('/update/:id', isAuthenticated, authorizeRoles("admin"), updateNotificationStatus);

export default router;