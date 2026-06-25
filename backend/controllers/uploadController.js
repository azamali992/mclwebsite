import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '../uploads/images');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const filename = req.file.filename;
    const fileUrl = `/uploads/images/${filename}`;

    res.json({
      message: 'Image uploaded successfully',
      filename,
      url: fileUrl,
      path: req.file.path,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload image', error: error.message });
  }
};

export const listImages = async (req, res) => {
  try {
    const files = fs.readdirSync(uploadsDir).filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    });
    const images = files.map(filename => ({
      filename,
      url: `/uploads/images/${filename}`,
    }));
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: 'Failed to list images', error: error.message });
  }
};

export const deleteImage = async (req, res) => {
  try {
    // Strip any path components so a crafted name (e.g. "../../server.js")
    // can never escape the uploads directory.
    const safeName = path.basename(req.params.filename || '');
    const filePath = path.join(uploadsDir, safeName);

    if (!safeName || path.dirname(filePath) !== uploadsDir) {
      return res.status(400).json({ message: 'Invalid filename' });
    }

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.json({ message: 'Image deleted successfully' });
    } else {
      res.status(404).json({ message: 'Image not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete image', error: error.message });
  }
};
