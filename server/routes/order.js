import { Router } from 'express';
import { createOrder } from '../controllers/order.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = Router();

router.post('/create', isAuthenticated, createOrder);

export default router;