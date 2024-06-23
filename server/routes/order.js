import { Router } from 'express';
import { createOrder, getOrders } from '../controllers/order.js';
import { authorizeRoles, isAuthenticated } from '../middlewares/auth.js';

const router = Router();

router.post('/create', isAuthenticated, createOrder);
router.get('/all', isAuthenticated, authorizeRoles("admin") ,getOrders);

export default router;