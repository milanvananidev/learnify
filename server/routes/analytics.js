import {Router} from 'express';
import { authorizeRoles, isAuthenticated } from '../middlewares/auth.js'
import { getCoursesAnalytics, getOrdersAnalytics, getUserAnalytics } from '../controllers/analytics.js';

const router = Router();

router.get('/users', isAuthenticated, authorizeRoles("admin"), getUserAnalytics);
router.get('/courses', isAuthenticated, authorizeRoles("admin"), getCoursesAnalytics);
router.get('/orders', isAuthenticated, authorizeRoles("admin"), getOrdersAnalytics);

export default router;