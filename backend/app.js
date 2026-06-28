import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import errorHandler from './middleware/errorHandler.js';
import sanitizeBody from './middleware/sanitize.js';

import authRoutes from './routes/authRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import statRoutes from './routes/statRoutes.js';
import productRoutes from './routes/productRoutes.js';
import careerRoutes from './routes/careerRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Express app construction, separated from server.js's "connect to Mongo and
// start listening" concerns so tests can import this directly (via
// supertest) without booting a real network listener, hitting the real
// MongoDB Atlas cluster, or tripping server.js's required-env-var check.
const app = express();

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ limit: '20mb', extended: true }));
app.use(sanitizeBody);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/stats', statRoutes);
app.use('/api/products', productRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api', contactRoutes);

app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend is running' });
});

// Unknown API routes get a clean 404 instead of falling through to the SPA.
app.use('/api', (req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use(errorHandler);

export default app;
