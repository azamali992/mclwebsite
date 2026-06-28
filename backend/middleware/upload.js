import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Shared disk-storage factory for every multer upload in the app. Both the
// admin image-upload route (uploadRoutes.js) and the public career resume
// upload (careerRoutes.js -> careerController.js) used to hand-roll an almost
// identical multer.diskStorage + fs.existsSync/mkdirSync bootstrap. This is
// the single place that pattern now lives.
//
// NOTE: validation logic (allowedMimes / size limits) is intentionally kept
// as a parameter, not hardened further here — MIME-spoofing-resistant
// content-sniffing is out of scope for this pass (reserved for the Phase 6
// security pass) and the existing whitelist/size-limit behavior for both
// callers is preserved exactly as it was.
export function createUploader({ subdir, maxSizeMB, allowedMimes, invalidTypeMessage }) {
  const destinationDir = path.join(__dirname, '..', 'uploads', subdir);

  if (!fs.existsSync(destinationDir)) {
    fs.mkdirSync(destinationDir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destinationDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });

  const uploader = multer({
    storage,
    limits: { fileSize: maxSizeMB * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error(invalidTypeMessage || 'Invalid file type.'));
      }
    },
  });

  return { uploader, destinationDir };
}

// Resolve (and ensure) an uploads subdirectory without creating a multer
// instance — used by controllers that only need to read/delete files
// (e.g. uploadController.js's listImages/deleteImage).
export function resolveUploadDir(subdir) {
  const dir = path.join(__dirname, '..', 'uploads', subdir);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return dir;
}

export default createUploader;
