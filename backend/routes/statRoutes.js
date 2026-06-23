import express from 'express';
import {
  getAllStats,
  getStatByKey,
  createStat,
  updateStat,
  deleteStat,
} from '../controllers/statController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllStats);
router.get('/:key', getStatByKey);

router.post('/', authMiddleware, createStat);
router.put('/:id', authMiddleware, updateStat);
router.delete('/:id', authMiddleware, deleteStat);

export default router;
