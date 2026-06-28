import express from 'express';
import { uploadImage, listImages, deleteImage } from '../controllers/uploadController.js';
import authMiddleware from '../middleware/auth.js';
import { createUploader } from '../middleware/upload.js';

const { uploader: upload } = createUploader({
  subdir: 'images',
  maxSizeMB: 10,
  allowedMimes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  invalidTypeMessage: 'Invalid file type. Only images are allowed.',
});

const router = express.Router();

router.get('/', authMiddleware, listImages);
router.post('/upload', authMiddleware, upload.single('image'), uploadImage);
router.delete('/:filename', authMiddleware, deleteImage);

export default router;
