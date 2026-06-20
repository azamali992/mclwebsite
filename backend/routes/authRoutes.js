import express from 'express';
import { login, register, verifyToken } from '../controllers/authController.js';
import authMiddleware from '../middleware/auth.js';
import { loginLimiter } from '../middleware/rateLimiters.js';

const router = express.Router();

router.post('/login', loginLimiter, login);
router.post('/register', authMiddleware, register);
router.get('/verify', authMiddleware, verifyToken);

export default router;
