import express from 'express';
import {
  getAllCareers,
  getCareerById,
  createCareer,
  updateCareer,
  deleteCareer,
  applyToJob,
} from '../controllers/careerController.js';
import authMiddleware from '../middleware/auth.js';
import { formLimiter } from '../middleware/rateLimiters.js';
import { createUploader } from '../middleware/upload.js';

const { uploader: uploadResume } = createUploader({
  subdir: 'resumes',
  maxSizeMB: 5,
  allowedMimes: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ],
  invalidTypeMessage: 'Invalid file type. Only PDF and Word documents are allowed.',
});

const router = express.Router();

router.get('/', getAllCareers);
router.get('/:id', getCareerById);

router.post('/', authMiddleware, createCareer);
router.put('/:id', authMiddleware, updateCareer);
router.delete('/:id', authMiddleware, deleteCareer);

router.post('/apply', formLimiter, uploadResume.single('resume'), applyToJob);

export default router;
