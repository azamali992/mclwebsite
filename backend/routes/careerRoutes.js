import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import {
  getAllCareers,
  getCareerById,
  createCareer,
  updateCareer,
  deleteCareer,
} from '../controllers/careerController.js';
import authMiddleware from '../middleware/auth.js';
import { formLimiter } from '../middleware/rateLimiters.js';
import Career from '../models/Career.js';
import Application from '../models/Application.js';
import { sendApplicationNotification, sendConfirmationToApplicant } from '../utils/mailer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resumesDir = path.join(__dirname, '../uploads/resumes');
if (!fs.existsSync(resumesDir)) {
  fs.mkdirSync(resumesDir, { recursive: true });
}

const resumeStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, resumesDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const uploadResume = multer({
  storage: resumeStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and Word documents are allowed.'));
    }
  },
});

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const router = express.Router();

router.get('/', getAllCareers);
router.get('/:id', getCareerById);

router.post('/', authMiddleware, createCareer);
router.put('/:id', authMiddleware, updateCareer);
router.delete('/:id', authMiddleware, deleteCareer);

router.post('/apply', formLimiter, uploadResume.single('resume'), async (req, res) => {
  const { jobId, fullname, email, phone, experience, message } = req.body;

  if (!jobId || !fullname || !email) {
    return res.status(400).json({ message: 'Job ID, name, and email are required' });
  }
  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({ message: 'Invalid job ID' });
  }
  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  try {
    const career = await Career.findById(jobId);
    if (!career) {
      return res.status(404).json({ message: 'Job posting not found' });
    }

    const resume = req.file
      ? { url: `/uploads/resumes/${req.file.filename}`, filename: req.file.filename }
      : undefined;

    const application = await new Application({
      jobId, fullname, email, phone, experience, message, resume,
    }).save();

    console.log('Job application saved:', { position: career.position, fullname, email });

    sendApplicationNotification(career.position, { fullname, email, phone, experience, message });
    sendConfirmationToApplicant(email, fullname, career.position);

    res.json({ message: 'Application submitted successfully', application });
  } catch (error) {
    console.error('Failed to save application:', error.message);
    res.status(500).json({ message: 'Failed to submit application', error: error.message });
  }
});

export default router;
