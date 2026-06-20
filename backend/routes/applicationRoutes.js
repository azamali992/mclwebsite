import express from 'express';
import {
  getAllApplications,
  updateApplicationStatus,
  deleteApplication,
} from '../controllers/applicationController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/', authMiddleware, getAllApplications);
router.put('/:id', authMiddleware, updateApplicationStatus);
router.delete('/:id', authMiddleware, deleteApplication);

export default router;
