import express from 'express';
import { submitContact, subscribeNewsletter } from '../controllers/contactController.js';
import { formLimiter } from '../middleware/rateLimiters.js';

const router = express.Router();

router.post('/contact', formLimiter, submitContact);
router.post('/newsletter', formLimiter, subscribeNewsletter);

export default router;
