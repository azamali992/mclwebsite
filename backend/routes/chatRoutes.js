import express from 'express';
import { handleChat } from '../controllers/chatController.js';
import { chatLimiter } from '../middleware/rateLimiters.js';

const router = express.Router();

router.post('/', chatLimiter, handleChat);

export default router;
