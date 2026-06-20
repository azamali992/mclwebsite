import express from 'express';
import {
  getAllContent,
  getContentBySection,
  getContentByKey,
  createContent,
  updateContent,
  deleteContent,
} from '../controllers/contentController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllContent);
router.get('/section/:section', getContentBySection);
router.get('/:section/:key', getContentByKey);

router.post('/', authMiddleware, createContent);
router.put('/:id', authMiddleware, updateContent);
router.delete('/:id', authMiddleware, deleteContent);

export default router;
